"use client"

import { BskyAgent } from '@atproto/api';
import React, { useRef } from 'react'

const PostForm = () => {
    const bskyServer = "https://api.bsky.app";
    const agent = new BskyAgent({ service: bskyServer });
    const textRef = useRef<HTMLTextAreaElement | null>(null);

    const postBsky = async (text: string | undefined) => {  
  
        await agent.login({
          identifier: process.env.NEXT_PUBLIC_BSKY_ID ?? "",
          password: process.env.NEXT_PUBLIC_BSKY_PASSWORD ?? "",
        });
      
        
        await agent.post({
          text: text,
          langs: ["ja"]
        });
        
      };
 
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

export default PostForm