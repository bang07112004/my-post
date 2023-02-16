"use client";

import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
type Props = {
  image: string;
  title: string;
};

function Logged({ image, title }: Props) {
  return (
    <li className="flex items-center gap-8">
      <button
        className="rounded-lg bg-gray-700 px-6 py-2 text-sm text-white"
        onClick={() => signOut()}
      >
        Đăng xuất
      </button>
      <Link href={"/dashboard"}>
        <Image
          width={64}
          height={64}
          src={image}
          alt="profilePic"
          priority
          className="rounded-full"
          title={title}
        />
      </Link>
    </li>
  );
}

export default Logged;
