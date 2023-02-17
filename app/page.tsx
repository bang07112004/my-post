"use client";

import AllPosts from "../components/AllPosts";
import AddPost from "../components/AddPost";

export default function Home() {
  return (
    <div>
      <AddPost />
      <AllPosts />
    </div>
  );
}
