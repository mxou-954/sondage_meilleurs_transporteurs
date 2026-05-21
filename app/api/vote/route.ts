import { NextRequest, NextResponse } from "next/server";
import { hasVoted, saveVote } from "@/app/data/voteStore";

const FREE = ["gmail","yahoo","hotmail","outlook","live","orange","wanadoo","free","sfr","laposte","icloud","protonmail","tutanota","yopmail","msn","aol","gmx","bbox","numericable","bouygues"];

function isProEmail(email: string) {
  const domain = email.split("@")[1]?.split(".")[0]?.toLowerCase();
  return domain && !FREE.includes(domain);
}

export async function POST(req: NextRequest) {
  try {
    const { email, name, company, profile, votes, avis } = await req.json();

    if (!email || !votes) return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    if (profile === "pro" && !isProEmail(email))
      return NextResponse.json({ error: "Email professionnel requis." }, { status: 403 });
    if (await hasVoted(email))
      return NextResponse.json({ error: "Vous avez déjà voté." }, { status: 409 });
    if (Object.keys(votes).length === 0)
      return NextResponse.json({ error: "Aucun vote." }, { status: 400 });

    await saveVote({ email, name, company, profile, votes, avis, timestamp: Date.now() });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}