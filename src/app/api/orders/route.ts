import { NextRequest, NextResponse } from "next/server";
import { GetCommand, PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo, TABLE_NAME } from "@/lib/aws";
import { v4 as uuidv4 } from "uuid";

// ── Privacy Helper: Mask customer phone number ──
function maskPhone(phone?: string | null): string {
  if (!phone) return "Not provided";
  const cleaned = phone.trim();
  if (cleaned.length <= 4) return "****";
  return cleaned.slice(0, 3) + "*** ***" + cleaned.slice(-2);
}

// ── Privacy Helper: Mask exact house/flat number for unaccepted requests ──
function maskAddress(address?: string | null): string {
  if (!address) return "Area details unavailable";
  const parts = address.split(",").map((p) => p.trim());
  if (parts.length > 1) {
    // Hide flat/house number (first segment), only show street/area
    return `Near ${parts.slice(1).join(", ")}`;
  }
  return address.replace(/^(flat|house|door|plot|room|#)?\s*\d+[a-z]?\s*,?\s*/i, "Near ");
}

// ── GET: Fetch active orders or a specific order by orderID ──
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderID = searchParams.get("orderID");

    // 1. Single order lookup (e.g., customer tracking their own order)
    if (orderID) {
      const singleResult = await dynamo.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: { orderID },
        })
      );

      if (!singleResult.Item) {
        return NextResponse.json(
          { success: false, error: "Order not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        order: singleResult.Item,
      });
    }

    // 2. Public Radar feed: Fetch all orders from DynamoDB
    const result = await dynamo.send(
      new ScanCommand({
        TableName: TABLE_NAME,
      })
    );

    // Filter out COMPLETED orders — completed pickups are archived
    const uncompletedOrders = (result.Items || []).filter(
      (o) => o.status !== "COMPLETED"
    );

    // Apply privacy masking for unaccepted orders
    const sanitizedOrders = uncompletedOrders.map((order: Record<string, any>) => {
      const isAccepted = order.status === "ACCEPTED";

      if (isAccepted) {
        // Return order with collector identification info
        return {
          ...order,
          isPrivacyLocked: false,
        };
      }

      // 🛡️ Privacy Shield: Mask sensitive details until a collector accepts
      return {
        ...order,
        customerAddress: maskAddress(order.customerAddress),
        sellerPhone: maskPhone(order.sellerPhone),
        sellerName: order.sellerName ? `${order.sellerName.split(" ")[0]} (Customer)` : "Verified Customer",
        isPrivacyLocked: true,
      };
    });

    const sortedOrders = sanitizedOrders.sort((a: Record<string, any>, b: Record<string, any>) => {
      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    });

    return NextResponse.json({
      success: true,
      orders: sortedOrders,
    });
  } catch (error: any) {
    console.error("DynamoDB GET Orders Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders from DynamoDB", details: error.message },
      { status: 500 }
    );
  }
}

// ── POST: Customer submits a new scrap pickup request ──
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerAddress,
      scrapTypes,
      estimatedPrice,
      estimatedWeight,
      imageKeys,
      imageUrls,
      sellerName,
      sellerEmail,
      sellerPhone,
    } = body;

    if (!customerAddress || !customerAddress.trim()) {
      return NextResponse.json(
        { error: "Customer address is required" },
        { status: 400 }
      );
    }

    const orderID = `ORD-${Date.now().toString().slice(-6)}-${uuidv4().slice(0, 4).toUpperCase()}`;

    const newOrder = {
      orderID, // matches partition key in DynamoDB
      customerAddress: customerAddress.trim(),
      scrapTypes: Array.isArray(scrapTypes) ? scrapTypes : [],
      estimatedPrice: Number(estimatedPrice) || 0,
      estimatedWeight: Number(estimatedWeight) || 1,
      imageKeys: imageKeys || [],
      imageUrls: imageUrls || [],
      status: "SEARCHING_NEARBY",
      createdAt: new Date().toISOString(),
      collectorName: null,
      collectorPhone: null,
      collectorEmail: null,
      sellerName: sellerName || null,
      sellerEmail: sellerEmail || null,
      sellerPhone: sellerPhone || null,
    };

    await dynamo.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: newOrder,
      })
    );

    return NextResponse.json({
      success: true,
      message: "Order placed successfully in DynamoDB!",
      order: newOrder,
    });
  } catch (error: any) {
    console.error("DynamoDB POST Order Error:", error);
    return NextResponse.json(
      { error: "Failed to save order to DynamoDB", details: error.message },
      { status: 500 }
    );
  }
}

// ── PATCH: Collector accepts or marks order as COMPLETED ──
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderID,
      status = "ACCEPTED",
      collectorName = "Nearby Recycler",
      collectorPhone = "",
      collectorEmail = "",
    } = body;

    if (!orderID) {
      return NextResponse.json(
        { error: "orderID is required" },
        { status: 400 }
      );
    }

    await dynamo.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { orderID },
        UpdateExpression:
          "SET #st = :status, collectorName = :collector, collectorPhone = :phone, collectorEmail = :email, updatedAt = :time",
        ExpressionAttributeNames: {
          "#st": "status",
        },
        ExpressionAttributeValues: {
          ":status": status,
          ":collector": collectorName,
          ":phone": collectorPhone || null,
          ":email": collectorEmail || null,
          ":time": new Date().toISOString(),
        },
      })
    );

    return NextResponse.json({
      success: true,
      message: `Order ${orderID} updated to ${status}!`,
    });
  } catch (error: any) {
    console.error("DynamoDB PATCH Order Error:", error);
    return NextResponse.json(
      { error: "Failed to update order in DynamoDB", details: error.message },
      { status: 500 }
    );
  }
}
