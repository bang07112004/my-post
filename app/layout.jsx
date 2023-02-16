import QueryWrapper from "@/components/QueryWrapper";
import Nav from "./auth/Nav";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="mx-4 bg-gray-200 md:mx-48 xl:mx-96">
        <QueryWrapper>
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
