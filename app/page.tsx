"use client"

import React, { useState } from "react";
import { BskyAgent } from "@atproto/api";
import styles from "./page.module.css";
import PostForm from "./components/PostForm";
export default async function Home() {
  const bskyServer = "https://api.bsky.app";
  const agent = new BskyAgent({ service: bskyServer });
  
const [newOrder,setNewOrder] = useState(true);
  
  const authorFeed = await agent.app.bsky.feed.getAuthorFeed({
    actor: 'nuneno46.bsky.social',
  })

  const handleChangeArrangement = () => {
    setNewOrder(!newOrder)
  }

  console.log(newOrder)
  return (
    <div>
      <PostForm/>
      <ol>
        <p>ポスト一覧</p>
        <button onClick={handleChangeArrangement}>古い順</button>
        {newOrder
        ? 
       (authorFeed.data.feed.map(({ post }) => (
        <li key={post.cid}>{post.record.text}</li>
      )))
      :
      (authorFeed.data.feed.reverse().map(({ post }) => (
        <li key={post.cid}>{post.record.text}</li>
      )))}
    </ol>
    </div>
  );
}