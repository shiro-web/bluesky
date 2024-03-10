"use client"

import React, { useRef } from "react";
import { BskyAgent } from "@atproto/api";
import styles from "./page.module.css";
const bskyServer = "https://bsky.social";
const postBsky = async (text: string | undefined) => {  
  const agent = new BskyAgent({ service: bskyServer });

  await agent.login({
    identifier: process.env.NEXT_PUBLIC_BSKY_ID ?? "",
    password: process.env.NEXT_PUBLIC_BSKY_PASSWORD ?? "",
  });

  await agent.post({
    text: text,
    langs: ["ja"]
  });
  
};
export default function Home() {
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postBsky(textRef.current?.value);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          ref={textRef}
        ></textarea>
        <button>送信</button>
      </form>
    </div>
  );
}