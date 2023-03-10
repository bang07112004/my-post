"use client";

import React from "react";
import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostsType } from "../app/types/Posts";
type Props = {};

//Fetch All posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

function AllPosts({}: Props): JSX.Element {
  const { data, error, isLoading } = useQuery<PostsType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  // if (error) return error;
  // if (isLoading) return "Loading.....";
  return (
    <div>
      {data?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  );
}

export default AllPosts;
