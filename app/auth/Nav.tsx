import Login from "@/components/Login";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Logged from "@/components/Logged";
type Props = {};

async function Nav({}: Props) {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex items-center justify-between py-8">
      <Link
        href={"/"}
        className="rounded-xl bg-black/70 px-4 py-3 text-lg font-bold text-white"
      >
        Trang chủ
      </Link>
      <ul className="flex items-center gap-6">
        {!session?.user && <Login />}
        {session?.user && (
          <Logged
            image={session.user?.image || ""}
            title={session.user?.email || ""}
          />
        )}
      </ul>
    </nav>
  );
}

export default Nav;
