"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./chat-widget.module.scss";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi, I can answer questions about Deepanshu’s projects, skills, and education." },
  ]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), [messages, open]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = draft.trim();
    if (!content || busy) return;
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setDraft("");
    setBusy(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-8) }),
      });
      const body = await response.json() as { reply?: string };
      setMessages((current) => [...current, { role: "assistant", content: body.reply || "I couldn’t get a response just now. Please try again." }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "I couldn’t connect just now. You can reach Deepanshu at deepanshusharma040@gmail.com." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.widget}>
      {open && (
        <section className={styles.panel} aria-label="Ask about Deepanshu" aria-live="polite">
          <header className={styles.panelHead}>
            <div><span className={styles.statusDot} /> Portfolio assistant <small>PROJECTS · SKILLS · EDUCATION</small></div>
            <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close assistant">×</button>
          </header>
          <div className={styles.transcript}>
            {messages.map((message, index) => <p key={`${message.role}-${index}`} className={message.role === "user" ? styles.userMessage : styles.assistantMessage}>{message.content}</p>)}
            {busy && <p className={styles.assistantMessage}>Thinking<span className={styles.ellipsis}>…</span></p>}
            <div ref={endRef} />
          </div>
          <form className={styles.form} onSubmit={sendMessage}>
            <label className="srOnly" htmlFor="assistant-question">Ask a question</label>
            <input id="assistant-question" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask about a project…" maxLength={500} />
            <button type="submit" disabled={!draft.trim() || busy} aria-label="Send message">↗</button>
          </form>
        </section>
      )}
      <button type="button" className={styles.launcher} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close portfolio assistant" : "Ask the portfolio assistant"}>
        <span className={styles.launcherIcon}>{open ? "×" : "✳"}</span><span>{open ? "Close" : "Ask about my work"}</span>
      </button>
    </div>
  );
}
