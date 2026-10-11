import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3, BUCKET_NAME } from "@/lib/aws";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Convert file to buffer for S3 upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique clean filename
    const fileExtension = file.name.split(".").pop() || "jpg";
    const uniqueFileName = `scrap-${Date.now()}-${uuidv4().slice(0, 8)}.${fileExtension}`;

    // Upload directly to AWS S3 bucket
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: uniqueFileName,
        Body: buffer,
        ContentType: file.type || "image/jpeg",
      })
    );

    // Image URL for serving securely
    const imageUrl = `/api/image?key=${encodeURIComponent(uniqueFileName)}`;

    return NextResponse.json({
      success: true,
      key: uniqueFileName,
      url: imageUrl,
    });
  } catch (error: any) {
    console.error("S3 Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to upload image to S3", details: error.message },
      { status: 500 }
    );
  }
}
