import { NextResponse } from "next/server";
import { getResults, getTotalVoters } from "@/app/data/voteStore";

export async function GET() {
  const [results, total] = await Promise.all([getResults(), getTotalVoters()]);
  return NextResponse.json({ results, total });
}
