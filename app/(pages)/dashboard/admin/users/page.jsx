import dynamic from "next/dynamic";
import React from "react";

function Users() {
  return <div>admin users</div>;
}

export default dynamic(() => Promise.resolve(Users), { ssr: false });
