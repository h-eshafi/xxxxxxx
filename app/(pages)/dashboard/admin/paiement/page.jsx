import dynamic from "next/dynamic";
import React from "react";

function Paiement() {
  return <div>admin paiement</div>;
}

export default dynamic(() => Promise.resolve(Paiement), { ssr: false });
