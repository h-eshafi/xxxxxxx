import dynamic from "next/dynamic";
import React from "react";

function Simulations() {
  return <div>simulations</div>;
}

export default dynamic(() => Promise.resolve(Simulations), { ssr: false });
