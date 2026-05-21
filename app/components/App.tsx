"use client";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomePage    from "./HomePage";
import ProfileStep from "./ProfileStep";
import IdentityStep from "./IdentityStep";
import QuestionStep from "./QuestionStep";
import DoneStep    from "./DoneStep";
import { QUESTIONS_PRO, QUESTIONS_CLIENT, Question } from "@/app/data/transporteurs";
import AvisStep from "./AvisStep";

type Avis = Record<string, "good" | "neutral" | "bad">;
export type Profile = "pro" | "client";
type Votes = Record<string, string>;

type StepName = "home" | "profile" | "identity" | `q${number}` | "avis" | "done";

export default function App() {
  const [step,     setStep]     = useState<StepName>("home");
  const [prev,     setPrev]     = useState<StepName>("home");
  const [dir,      setDir]      = useState(1);
  const [profile,  setProfile]  = useState<Profile>("pro");
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [company,  setCompany]  = useState("");
  const [votes,    setVotes]    = useState<Votes>({});
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [avis, setAvis] = useState<Avis>({});

  const questions: Question[] = profile === "pro" ? QUESTIONS_PRO : QUESTIONS_CLIENT;

  const go = useCallback((next: StepName, d = 1) => {
    setDir(d);
    setPrev(step);
    setStep(next);
  }, [step]);

  // Handle browser back button
  useEffect(() => {
    const onPop = () => {
      // Map current step to previous
      if (step === "profile")  { setDir(-1); setPrev(step); setStep("home"); }
      else if (step === "q0")       { setDir(-1); setPrev(step); setStep("profile"); }
      else if (step === "avis")     { setDir(-1); setPrev(step); setStep("q0"); }
      else if (step === "identity") { setDir(-1); setPrev(step); setStep("avis"); }
      else if (step.startsWith("q")) {
        const idx = parseInt(step.slice(1));
        if (idx > 0) { setDir(-1); setPrev(step); setStep(`q${idx - 1}` as StepName); }
      }
      else if (step === "done") { /* stay */ }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [step]);

  // Push state when step changes so browser back works
  useEffect(() => {
    window.history.pushState({ step }, "", window.location.pathname);
  }, [step]);

  const restartAsClient = () => {
    setProfile("client");
    setVotes({});
    setAvis({});
    setName("");
    setEmail("");
    setCompany("");
    setAlreadyVoted(false);
    go("q0", 1);
  };


  const handleVote = (qId: string, tId: string | null) => {
    const newVotes = { ...votes };
    if (tId) newVotes[qId] = tId; else delete newVotes[qId];
    setVotes(newVotes);
    go("avis", 1);
  };

  const goBack = () => {
    if (step === "profile")       go("home", -1);
    else if (step === "q0")       go("profile", -1);
    else if (step === "identity") go("avis", -1);
    else if (step === "avis")     go("q0", -1);
    else if (step.startsWith("q")) {
      const idx = parseInt(step.slice(1));
      if (idx > 0) go(`q${idx - 1}` as StepName, -1);
    }
  };

  const canGoBack = step !== "home" && step !== "done";
  const qIndex    = step.startsWith("q") ? parseInt(step.slice(1)) : -1;

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? "100%" : "-30%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? "-20%" : "100%", opacity: 0 }),
  };

  const transition = { type: "spring" as const, stiffness: 320, damping: 32 };

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", background: "var(--bg)" }}>
      <AnimatePresence mode="wait" custom={dir}>

        {step === "home" && (
          <motion.div key="home" custom={dir} variants={variants}
            initial="enter" animate="center" exit="exit" transition={transition}
            style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
            <HomePage onStart={() => go("profile", 1)} />
          </motion.div>
        )}

        {step === "profile" && (
          <motion.div key="profile" custom={dir} variants={variants}
            initial="enter" animate="center" exit="exit" transition={transition}
            style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
            <ProfileStep
              onSelect={p => { setProfile(p); go("q0", 1); }}
              onBack={() => go("home", -1)}
            />
          </motion.div>
        )}

        {step === "identity" && (
          <motion.div key="identity" custom={dir} variants={variants}
            initial="enter" animate="center" exit="exit" transition={transition}
            style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
            <IdentityStep
              profile={profile}
              onNext={async (n, em, co) => {
                setName(n); setEmail(em); setCompany(co);
                const result = await submitVotes(votes, em, n, co, profile, avis);
                if (result === "already_voted") {
                  // Passer l'info à DoneStep
                  setAlreadyVoted(true);
                }
                go("done", 1);
              }}
              onBack={() => go("profile", -1)}
            />
          </motion.div>
        )}

        {step === "avis" && (
          <motion.div key="avis" custom={dir} variants={variants}
            initial="enter" animate="center" exit="exit" transition={transition}
            style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
            <AvisStep
              question={questions[0]}
              votedId={votes[questions[0].id] ?? null}
              onNext={a => { setAvis(a); go("identity", 1); }}
              onSkip={() => go("identity", 1)}
              onBack={() => go("q0", -1)}
            />
          </motion.div>
        )}

        {step.startsWith("q") && qIndex >= 0 && (
          <motion.div key={step} custom={dir} variants={variants}
            initial="enter" animate="center" exit="exit" transition={transition}
            style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
            <QuestionStep
              question={questions[qIndex]}
              qIndex={qIndex}
              total={questions.length}
              savedVote={votes[questions[qIndex].id] ?? null}
              onVote={handleVote}
              onBack={goBack}
            />
          </motion.div>
        )}

        {step === "done" && (
          <motion.div key="done" custom={dir} variants={variants}
            initial="enter" animate="center" exit="exit" transition={transition}
            style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
            <DoneStep
              votes={votes}
              questions={questions}
              name={name}
              profile={profile}
              alreadyVoted={alreadyVoted}
              onRestartAsClient={restartAsClient}
              avis={avis}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

async function submitVotes(votes: Votes, email: string, name: string, company: string, profile: Profile, avis?: Avis) {
  try {
    const res = await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, company, profile, votes, avis }),
    });
    if (res.status === 409) {
      // Email déjà utilisé — on va quand même sur done mais on peut afficher un message
      return "already_voted";
    }
  } catch {}
}
