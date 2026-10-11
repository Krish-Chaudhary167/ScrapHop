import { NextResponse } from "next/server";
import { dynamo, USERS_TABLE_NAME } from "@/lib/aws";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

// Simple salt + sha256 hashing for password storage
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, password, name, phone, role } = body;

    const normalizedEmail = (email || "").trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    if (action === "signup") {
      if (!phone || !phone.trim()) {
        return NextResponse.json(
          { success: false, message: "Phone number is compulsory for signup" },
          { status: 400 }
        );
      }

      // 1. Check if user already exists in AWS DynamoDB
      const existing = await dynamo.send(
        new GetCommand({
          TableName: USERS_TABLE_NAME,
          Key: { email: normalizedEmail },
        })
      );

      if (existing.Item) {
        return NextResponse.json(
          { success: false, message: "User with this email already exists" },
          { status: 400 }
        );
      }

      // 2. Hash password & create user
      const salt = crypto.randomBytes(16).toString("hex");
      const passwordHash = hashPassword(password, salt);

      const newUser = {
        email: normalizedEmail,
        name: (name || "").trim() || normalizedEmail.split("@")[0],
        phone: (phone || "").trim(),
        role: role || "SELLER", // 'SELLER' or 'COLLECTOR'
        salt,
        passwordHash,
        createdAt: new Date().toISOString(),
      };

      await dynamo.send(
        new PutCommand({
          TableName: USERS_TABLE_NAME,
          Item: newUser,
        })
      );

      return NextResponse.json({
        success: true,
        message: "Account created successfully in AWS DynamoDB",
        user: {
          email: newUser.email,
          name: newUser.name,
          phone: newUser.phone,
          role: newUser.role,
        },
      });
    } else if (action === "login") {
      // 1. Fetch user from AWS DynamoDB
      const result = await dynamo.send(
        new GetCommand({
          TableName: USERS_TABLE_NAME,
          Key: { email: normalizedEmail },
        })
      );

      if (!result.Item) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password" },
          { status: 401 }
        );
      }

      const user = result.Item;
      const computedHash = hashPassword(password, user.salt);

      if (computedHash !== user.passwordHash) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password" },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Logged in successfully",
        user: {
          email: user.email,
          name: user.name,
          phone: user.phone,
          role: user.role,
        },
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid action. Use 'login' or 'signup'" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Auth API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Authentication error" },
      { status: 500 }
    );
  }
}
