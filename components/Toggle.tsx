"use client";

import React from "react";

type Props = {
  deletePost: () => void;
  setToggle: (toggle: boolean) => void;
};

function Toggle({ deletePost, setToggle }: Props) {
  return (
    <div className="fixed left-0 top-0 z-20 h-full w-full bg-black/20">
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-6 rounded-lg bg-white p-10">
        <h2 className="text-xl">Bạn chắc chắn muốn xóa bài đăng này chứ?</h2>
        <h3 className="text-md text-red-600">
          Bấm nút xóa sẽ xóa vĩnh viễn bài đăng của bạn!
        </h3>
        <div className="grid w-full grid-cols-2 items-center justify-center gap-10">
          <button
            onClick={deletePost}
            className="text-md rounded-lg bg-green-600 py-2 px-3 font-bold text-white"
          >
            Xác định
          </button>
          <button
            onClick={(e) => {
              setToggle(false);
            }}
            className="text-md rounded-lg bg-red-600 py-2 px-3 font-bold text-white"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toggle;
