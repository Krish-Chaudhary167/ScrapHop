import { S3Client } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { RekognitionClient } from "@aws-sdk/client-rekognition";

const region = process.env.AWS_REGION || "ap-south-1";

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
};

// ── AWS S3 Client for Image Storage ──
export const s3 = new S3Client({
  region,
  credentials,
});

export const BUCKET_NAME = process.env.S3_BUCKET_NAME || "scraphop-upload-krzz";

// ── AWS DynamoDB Client for Scrap Orders ──
const rawDynamoClient = new DynamoDBClient({
  region,
  credentials,
});

export const dynamo = DynamoDBDocumentClient.from(rawDynamoClient, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

export const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || "ScrapHop-Orders";
export const USERS_TABLE_NAME = process.env.DYNAMODB_USERS_TABLE_NAME || "ScrapHop-Users";

// ── AWS Rekognition Client for AI Scrap Classification ──
export const rekognition = new RekognitionClient({
  region,
  credentials,
});
