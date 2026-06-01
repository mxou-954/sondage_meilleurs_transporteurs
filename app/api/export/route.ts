import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pwd = searchParams.get("pwd");

  if (pwd !== process.env.EXPORT_PASSWORD) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const keys = await redis.keys("voter:*");
  const voters = [];

  for (const key of keys) {
    const data = await redis.get(key);
    if (data) voters.push(data);
  }

  const total = await redis.get<number>("total_voters") ?? 0;

  return NextResponse.json({ voters, total });
}