"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PostsType } from "../app/types/Posts";
type Props = {
  avatar: string;
  name: string;
  postTitle: string;
  id: string;
  comments: any;
};

function Post({ avatar, name, postTitle, id, comments }: Props) {
  return (
    <div className="my-8 rounded-lg bg-white p-8">
      <div className="flex items-center gap-2">
        <Image
          alt=""
          src={avatar}
          width={32}
          height={32}
          className="rounded-full"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex max-w-fit cursor-pointer items-center gap-4">
        <Link
          href={{
            pathname: `/post/${id}`,
          }}
        >
          <p className=" text-sm font-bold text-gray-700">
            {comments?.length} Bình luận
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Post;
