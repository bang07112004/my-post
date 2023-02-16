"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Toggle from "./Toggle";
import toast from "react-hot-toast";
type Props = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

function EditPosts({ avatar, title, name, comments, id }: Props) {
  // Toggle
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  let deleteToastID: string;
  //   Delete post
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletePost", { data: id }),
    {
      onError: (error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi xóa bài đăng", { id: deleteToastID });
      },
      onSuccess: (data) => {
        toast.success("Bài đăng đã được gỡ bỏ!", { id: deleteToastID });
        queryClient.invalidateQueries(["auth-posts"]);
      },
    }
  );
  const deletePost = () => {
    deleteToastID = toast.loading("Đang xóa bài đăng của bạn", {
      id: deleteToastID,
    });
    mutate(id);
    setToggle(false);
  };
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
        <p className="break-all">{title}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm font-bold text-gray-700 ">
          {comments?.length} Bình luận
        </p>
        <button
          onClick={(e) => {
            setToggle(true);
          }}
          className="text-md font-bold text-red-600"
        >
          Xóa bài
        </button>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </div>
  );
}

export default EditPosts;
