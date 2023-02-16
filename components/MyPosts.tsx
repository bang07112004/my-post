"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { AuthPosts } from "@/app/types/AuthPosts";
import EditPosts from "./EditPosts";
type Props = {};
const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

function MyPost({}: Props) {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-posts"],
  });
  // if (isLoading) {
  //   return "Loading...";
  // }
  console.log(data);
  return (
    <div>
      {data?.posts?.map((post) => (
        <EditPosts
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  );
}

export default MyPost;
