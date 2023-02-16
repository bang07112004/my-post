import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import MyPost from "@/components/MyPosts";
type Props = {};

async function page({}: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <main>
      <h1 className="text-2xl ">
        Chào mừng <span className="font-bold">{session?.user?.name}</span>{" "}
      </h1>
      <MyPost />
    </main>
  );
}

export default page;
