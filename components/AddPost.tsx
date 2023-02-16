"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
type Props = {};

function AddPost({}: Props) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID: string;
  //create a new post
  const { mutate } = useMutation(
    async (title: string) => {
      await axios.post("/api/posts/addPost", { title });
    },
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        toast.success("Đăng bài thành công!", { id: toastPostID });
        queryClient.invalidateQueries(["posts"]);
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toastPostID = toast.loading("Đang tạo bài đăng", { id: toastPostID });
    setIsDisabled(true);
    mutate(title);
  };
  return (
    <form onSubmit={submitPost} className="my-8 rounded-lg bg-white p-8">
      <div className="my-4 flex flex-col">
        <textarea
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Bạn đang nghĩ gì?..."
          className="my-2 rounded-lg bg-gray-200 p-4 text-lg"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2 ">
        <p
          className={`text-md font-bold ${
            title.length > 500 ? "text-red-700" : "text-gray-700"
          } `}
        >{`${title.length}/500`}</p>
        <button
          disabled={!title || isDisabled}
          className={`text-md rounded-xl bg-teal-600 py-2 px-6 text-white ${
            !title ? "disabled:grayscale" : "disabled:opacity-25"
          }`}
          type="submit"
        >
          Đăng
        </button>
      </div>
    </form>
  );
}

export default AddPost;
