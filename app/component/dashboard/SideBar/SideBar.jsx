import React from "react";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import Bar from "./Bar";

async function SideBar() {
  const session = await getServerSession(authOption);
  console.log("session ", session);
  console.log("side bar ==", session?.user?.role);

  return <Bar session={session} />;
}
export default dynamic(() => Promise.resolve(SideBar), { ssr: false });
