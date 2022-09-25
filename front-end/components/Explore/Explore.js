import { useAccount, useNetwork, useSigner, useContract } from "wagmi";
import React, { useEffect, useState } from "react";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import xNFTDestinationABI from "../../config/xNFTDestination";
import NFTCard from "./NFTCard";
import config from "../../config";
const Explore = (props) => {
  const [nftContractMetaData, setNFTContractMetaData] = useState([]);
  const { chain, chains } = useNetwork();
  const contractAddress = config.chainIdToContractMap[chain.id];
  const { data: signer, isError, isLoading } = useSigner();
  const xNFTDestinationContract = useContract({
    addressOrName: contractAddress,
    contractInterface: xNFTDestinationABI,
    signerOrProvider: signer,
  });

  let allNftContracts = [];
  const getAllContracts = () => {
    try {
      console.log(xNFTDestinationContract);
      return xNFTDestinationContract.getAllContracts().then((data) => {
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].contractAddress);
          allNftContracts.push(data[i].contractAddress);
        }
        return allNftContracts;
      });
    } catch (error) {
      console.log(error);
    }
  };
  getAllContracts().then((res) => {
    console.log(res);
    setNFTContractMetaData(res);
  });
  useEffect(() => {
   
  }, []);
  // getAllContracts();
  const data = [
    {
      name: "abcd",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/800px-Google_Images_2015_logo.svg.png",
    },
    {
      name: "efgh",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/800px-Google_Images_2015_logo.svg.png",
    },
    {
      name: "ijkl",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/800px-Google_Images_2015_logo.svg.png",
    },
  ];
  return (
    <div>
      <ConnectWallet />
      <div
        style={{
          //   display: "flex",
          marginTop: "1.5%",
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "32%",
        }}
      >
        <div
          style={
            {
              // marginTop: "1.5%",
              // display: "flex",
              // width:"100%",
              // flexDirection: "column",
              // justifyContent: "center",
            }
          }
        >
          {/* {data.map((data, index) => {
            return (
             <NFTCard data={data} />
            );
          })} */}
          {nftContractMetaData.map((data, index) => {
            return <NFTCard data={data} signer={signer} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Explore;
