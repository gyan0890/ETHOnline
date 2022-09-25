import React, { useEffect, useState } from "react";
import { useSigner, useContract, useWaitForTransaction, } from "wagmi";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import { Buffer } from "buffer";
import config from "../../config";
import xNFTSourceABI from "../../config/xNFTSourceABI";
import { Web3Storage, File } from 'web3.storage'
const Form = (props) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [uri, setUri] = useState("");
  const [chain, setChain] = useState([]);
  const [price, setPrice] = useState("");
  const { data: signer, isError, isLoading } = useSigner();
  const contract = useContract({
    addressOrName: config.xNFTSourceAddress,
    contractInterface: xNFTSourceABI,
    signerOrProvider: signer,
  });

  const handleFileUpload = async (e) => {
    console.log(e);
    let buffer;
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(e);
    reader.onloadend = async () => {
      buffer = Buffer(reader.result);
      try {
        // const client = create('https://ipfs.infura.io:5001/api/v0');
        //   const created = await client.add(buffer);
        //   const url = `https://ipfs.infura.io/ipfs/${created.path}`;
        //   console.log(url)
        //   setUri(url)
        // // setUri(
        // //   "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/800px-Google_Images_2015_logo.svg.png"
        // // );
        const web3Storage = new Web3Storage({ token: config.web3storageToken })
        const file = [new File([buffer],"xNFT")]
        const cid = await web3Storage.put(file)
        console.log(`https://${cid}.ipfs.w3s.link/xNFT`)
        setUri(`https://${cid}.ipfs.w3s.link/xNFT`)
      } catch (error) {
        console.log(error)
      }
    };
  };

  const handleSubmission = async () => {
    console.log(name);
    console.log(symbol);
    console.log(price);
    console.log(uri);
    const supportedChains = chain.split(",")
    console.log(supportedChains);
    const tx = await contract.launchNFT(name, symbol, uri, (parseInt(price)*Math.pow(10,18)).toString(), supportedChains);
    console.log(tx)
   
  };
  return (
    <div>
      <ConnectWallet />
      <div
        style={{
          display: "flex",
          width: "100%",
          marginLeft: "32%",
        }}
      >
        <div
          style={{
            marginTop: "1.5%",
            display: "flex",
            borderRadius: "15px",
            alignSelf: "center",
            //   flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: "center",
            width: "40%",
            backgroundImage:
              "radial-gradient(circle, #91ff00, #86ea01, #7bd602, #70c202, #65af03)",
            paddingTop: "1.5%",
            paddingBottom: "1.5%",
            fontSize: "1.5rem",
          }}
        >
          {/* <div style={{
            width: "50vw",
        }}>  */}
          <div
            style={{
              alignSelf: "center",
            }}
          >
            <p style={{}}>Enter a 🔥 name</p>
            <input
              style={{
                padding: "0.5rem 0.5rem",
                width: "15vw",
              }}
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </div>
          <div
            style={{
              alignSelf: "center",
            }}
          >
            <p style={{}}>Enter an 💪 symbol</p>
            <input
              style={{
                padding: "0.5rem 0.5rem",
                width: "15vw",
              }}
              type="text"
              onChange={(e) => {
                setSymbol(e.target.value);
              }}
              value={symbol}
            />
          </div>
          <div
            style={{
              alignSelf: "center",
            }}
          >
            <p style={{}}>Time to upload the 🖼️</p>
            <input
              type="file"
              style={{
                marginLeft: "3.5rem",
              }}
              onChange={(e) => {
                handleFileUpload(e.target.files[0]);
              }}
            />
          </div>
          <div
            style={{
              alignSelf: "center",
            }}
          >
            <p style={{}}>Finally let's talk 💵💵</p>
            <input
              type="number"
              style={{
                padding: "0.5rem 0.5rem",
                width: "15vw",
                marginLeft: "2.5rem",
              }}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={price}
            />
          </div>
          <div
            style={{
              alignSelf: "center",
            }}
          >
            <p style={{}}>Enter the chain ids!</p>
            <input
              style={{
                padding: "0.5rem 0.5rem",
                width: "15vw",
                marginLeft: "1.5rem",
              }}
              onChange={(e) => {
                setChain(e.target.value);
              }}
              value={chain}
              type="text"
            />
          </div>
          <button
            style={{
              marginTop: "2.5%",
              position: "relative",
              alignSelf: "center",
              width: "55%",
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "5px",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              fontSize: "1.25rem",
              color: "white",
              fontWeight: "700",
              backgroundImage:
                "linear-gradient(to right top, #ff6e11, #fc8300, #f79700, #f2a900, #ebba12)",
              cursor: "pointer",
            }}
            onMouseEnter={(event) => {
              event.target.style.borderWidth = "2px";
              event.target.style.borderColor = "white";
              event.target.style.backgroundImage =
                "linear-gradient(to right top, #ffb311, #fc9f06, #f78a05, #f2760b, #eb6012)";
            }}
            onMouseLeave={(event) => {
              event.target.style.borderWidth = "1px";
              event.target.style.borderColor = "black";
              event.target.style.backgroundImage =
                "linear-gradient(to right top, #ff6e11, #fc8300, #f79700, #f2a900, #ebba12)";
            }}
            onClick={(e) => {
              e.preventDefault();
              handleSubmission(e);
            }}
          >
            {" "}
            Submit
          </button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Form;
