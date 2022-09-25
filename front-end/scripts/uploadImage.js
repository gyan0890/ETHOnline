const axios = require("axios");

const _pinataApiKey = "52d3601ca0a558634d77";
const _pinataSecretApiKey =
  "333b49cf4f4cf7447aabf0fa89334bdec93d0633350e8074de91daa807581598";
const retrevieUrl = "https://gateway.pinata.cloud/ipfs/";
export function pinFileToIPFS(img, formdata) {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  debugger;

  //we gather a local file for this example, but any valid readStream source will work here.
  let data = new FormData();
  data.append("file", img);

  return axios
    .post(url, data, {
      maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: _pinataApiKey,
        pinata_secret_api_key: _pinataSecretApiKey,
      },
    })
    .then(function (response) {
      const imageUrl = retrevieUrl + response.data.IpfsHash;
      debugger;
      formdata.imageUrl = imageUrl;
      return pinJSONToIPFS(formdata);
    })
    .catch(function (error) {
      console.log(error);
      return { success: false };
    });
}
export const pinJSONToIPFS = async (JSONBody) => {
  console.log(JSONBody);
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const metadata = {};
  metadata.title = JSONBody.title;
  metadata.description = JSONBody.description;
  metadata.imageUrl = JSONBody.imageUrl;
  metadata.owner = localStorage.getItem("address");
  const data = {
    pinataMetadata: {
      name: metadata.owner,
      keyvalues: {
        title: metadata.title,
        description: metadata.description,
        imageUrl: metadata.imageUrl,
        original_owner: metadata.owner,
      },
    },
    pinataContent: {
      title: metadata.title,
      description: metadata.description,
      imageUrl: metadata.imageUrl,
      original_owner: metadata.owner,
    },
  };

  return axios
    .post(url, data, {
      headers: {
        pinata_api_key: _pinataApiKey,
        pinata_secret_api_key: _pinataSecretApiKey,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const getPinData = async () => {
  const getUrl = "https://api.pinata.cloud/data/pinList?status=pinned";
  const data = await axios.get(getUrl, {
    headers: {
      pinata_api_key: _pinataApiKey,
      pinata_secret_api_key: _pinataSecretApiKey,
    },
  });
  return data.data;
};
