import { useAccount, useNetwork, useSigner, useContract } from "wagmi";
import React, { useEffect, useState } from "react";
import NFTContractABI from "../../config/NFTContractABI";
import config from "../../config";
const NFTCard = (props) => {
    const [name, setName] = useState("")
    const [uri, setUri] = useState("")
    const [price, setPrice] = useState("")
    const { address, isConnecting, isDisconnected } = useAccount();
    console.log(address)
  const NFTContract = useContract({
    addressOrName: props.data,
    contractInterface: NFTContractABI,
    signerOrProvider: props.signer,
  });
  console.log(NFTContract);
  useEffect(() => {
    getNFTDetails();
  });

  const getNFTDetails = async () => {
    console.log(NFTContract);
    const nftName = await NFTContract.name();
    const nftURI = await NFTContract._tokenURI();
    const nftPrice = ((parseInt((await NFTContract.price()).toString()))*Math.pow(10,18)).toString()
    setName(name)
    setUri(nftURI)
    setPrice(nftPrice)
    console.log(nftName);
    console.log(nftPrice);
  };

  //   getNFTDetails()
  return (
    <div
      style={{
        display: "flex",
        marginTop: "2.5%",
        borderRadius: "15px",
        alignSelf: "center",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "50%",
        backgroundImage:
          "radial-gradient(circle, #91ff00, #86ea01, #7bd602, #70c202, #65af03)",
        paddingTop: "1.5%",
        paddingBottom: "1.5%",
        fontSize: "1.5rem",
      }}
    >
      <img
        src={uri}
        style={{
          width: "10%",
          height: "8%",
          alignSelf: "center",
          marginLeft: "25%",
          borderStyle: "none",
        }}
      ></img>
      <p
        style={{
          margin: "0 5%",
          alignSelf: "center",
        }}
      >
        {name}
      </p>
      <button
        style={{
          // marginTop: "2.5%",
          padding: "0.5rem 1rem",
          position: "relative",
          alignSelf: "center",
          width: "15%",
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "5px",
          fontSize: "1.25rem",
          color: "white",
          fontWeight: "100",
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

        onClick={async()=>{
            await NFTContract.mintSingleNFT(address, {value:"100000000000"})
        }}
      >
        Mint
      </button>
    </div>
  );
};

export default NFTCard;
