const abi = [
	{
		"inputs": [
			{
				"internalType": "contract IConnextHandler",
				"name": "_connext",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_chainId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_contractAddress",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "_domain",
				"type": "uint32"
			},
			{
				"internalType": "address",
				"name": "_deployerAddress",
				"type": "address"
			}
		],
		"name": "addConextAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "connext",
		"outputs": [
			{
				"internalType": "contract IConnextHandler",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_symbol",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tokenURI",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_salePrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "_chainIds",
				"type": "uint256[]"
			}
		],
		"name": "launchNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "mapChainIdToContract",
		"outputs": [
			{
				"internalType": "address",
				"name": "connextContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "domain",
				"type": "uint32"
			},
			{
				"internalType": "address",
				"name": "deployerAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export default abi