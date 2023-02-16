import { PrismaClient } from "@prisma/client";
const client = globalThis.Prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.Prisma = client;
export default client;
