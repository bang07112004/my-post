"use client";
import React from "react";
import { signIn } from "next-auth/react";
type Props = {};

function Login({}: Props) {
  return (
    <div>
      <li className="list-none">
        <button
          onClick={() => signIn()}
          className="rounded-xl bg-gray-700 py-2 px-6 text-sm text-white disabled:opacity-25"
        >
          Đăng nhập
        </button>
      </li>
    </div>
  );
}

export default Login;
