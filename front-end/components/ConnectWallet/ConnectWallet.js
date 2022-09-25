import React, { useEffect, useState } from "react";
// import { useEffect, useState } from "react";
import { chain, useAccount, configureChains } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const ConnectWallet = () => {
  const { address, isConnected } = useAccount();
  console.log(address);
  const [result, setResult] = useState(" ");
  useEffect(() => {
    console.log("in here");
    setResult(/[^/]*$/.exec(window.location.href)[0]);
  }, [result]);
  return (
    <>
      <ConnectButton className="connect" style={{ zIndex: "-1" }} />
      <div
        style={{
          width: "18rem",
          height: "18rem",
          overflow: "hidden",
          position: "absolute",
          top: "-5%",
          left: "35%",
          zIndex: "0",
        }}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          // src={}
          alt="logo"
        />
      </div>
    </>
  );
};

export default ConnectWallet;
