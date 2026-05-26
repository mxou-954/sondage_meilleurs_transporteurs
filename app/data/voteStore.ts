import { Redis } from "@upstash/redis";

const redis = new Redis({
  url:   process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function hasVoted(email: string): Promise<boolean> {
  return (await redis.exists(`voter:${email.toLowerCase()}`)) === 1;
}

export async function saveVote(entry: {
  email: string;
  name?: string;
  company?: string;
  profile?: string;
  votes: Record<string, string>;
  avis?: Record<string, string>;
  pointNegatif?: string; // ← ajout
  timestamp: number;
}) {
  await redis.set(`voter:${entry.email.toLowerCase()}`, entry);
  await redis.incr("total_voters");

  for (const [qId, tId] of Object.entries(entry.votes)) {
    await redis.incr(`result:${qId}:${tId}`);
  }

  if (entry.avis) {
    for (const [tId, sentiment] of Object.entries(entry.avis)) {
      await redis.incr(`avis:${tId}:${sentiment}`);
    }
  }

  // ← ajout
  if (entry.pointNegatif) {
    await redis.incr(`point-negatif:${entry.pointNegatif}`);
  }
}

export async function getTotalVoters(): Promise<number> {
  return (await redis.get<number>("total_voters")) ?? 0;
}

export async function getResults(): Promise<Record<string, Record<string, number>>> {
  const keys = await redis.keys("result:*");
  const results: Record<string, Record<string, number>> = {};
  for (const key of keys) {
    const parts = key.split(":");
    const qId = parts[1];
    const tId = parts.slice(2).join(":");
    const count = await redis.get<number>(key) ?? 0;
    if (!results[qId]) results[qId] = {};
    results[qId][tId] = count;
  }
  return results;
}