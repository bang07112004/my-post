import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Hãy đăng nhập." });
  }
  //Get User
  const prismaUser = await prisma.user.findUnique({
    where: { email: session?.user?.email },
  });
  if (req.method === "POST") {
    const { title, postId } = req.body.data;
    console.log(title, postId);
    if (!title.length) {
      return res.status(401).json({ message: "Hãy nhập gì đó" });
    }
    try {
      const result = await prisma.comment.create({
        data: {
          title,
          userId: prismaUser.id,
          postId,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: "Đã xãy ra lỗi khi đăng bình luận" });
    }
  }
}
