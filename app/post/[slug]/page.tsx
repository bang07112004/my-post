"use client";

import React from "react";
import Post from "@/components/Post";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "@/app/types/Post";
import AddComment from "@/components/AddComment";
import Image from "next/image";
import Link from "next/link";
type Props = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

function PostDetail(url: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return "Đang tải";
  console.log(data);
  return (
    <div>
      <Post
        avatar={data.user.image}
        name={data.user.name}
        postTitle={data.title}
        id={data.id}
        comments={data.comments}
      />
      <AddComment id={data?.id} />
      {data?.comments.map((comment: any) => (
        <div key={comment.id} className="my-6 rounded-lg bg-white p-8">
          <div className="flex items-center gap-2">
            <Image
              alt="avatar"
              width={24}
              height={24}
              src={comment.user?.image}
              className="rounded-full"
            />
            <h3 className="text-lg font-bold">{comment?.user?.name}</h3>
            <h2 className="text-md">{comment.createdAt}</h2>
          </div>
          <div className="py-4">{comment.title}</div>
        </div>
      ))}
    </div>
  );
}

export default PostDetail;
