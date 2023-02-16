"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  id?: string;
};
type Comment = {
  postId?: string;
  title: string;
};
function AddComment({ id }: Props) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commentToastID: string;
  const { mutate } = useMutation(
    async (data: Comment) => {
      return axios.post("/api/posts/addComment", { data });
    },
    {
      onSuccess: (data) => {
        setTitle(""), setIsDisabled(false);
        queryClient.invalidateQueries(["detail-post"]);
        toast.success("Đã đăng bình luận", { id: commentToastID });
      },
      onError: (error) => {
        setIsDisabled(false);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastID });
        }
      },
    }
  );
  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true),
      (commentToastID = toast.loading("Đang đăng bình luận của bạn...", {
        id: commentToastID,
      }));
    mutate({ title, postId: id });
  };
  return (
    <form onSubmit={submitComment} className="my-8">
      <h3 className="text-xl font-semibold">Thêm bình luận</h3>
      <div className="my-2 flex flex-col">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          className="my-2 rounded-lg p-4 text-lg"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          className={`text-md rounded-xl bg-teal-600 py-2 px-6 text-white ${
            !title ? "disabled:grayscale" : "disabled:opacity-25"
          }`}
          type="submit"
          disabled={!title || isDisabled}
        >
          Đăng
        </button>
        <p
          className={`text-md font-bold ${
            title.length > 500 ? "text-red-500" : "text-gray-500"
          }`}
        >
          {`${title.length}/500`}
        </p>
      </div>
    </form>
  );
}

export default AddComment;
