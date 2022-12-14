//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract DeployContract {

    struct _contract {
        uint id;
        address owner;
        address contractAddress;
    }
    _contract[] Contracts;
    mapping(address => address[]) addressContractMap;
        
    event LaunchNFTContract(address indexed, address indexed);

    constructor() {
         
    }

    function deploy(string memory name, string memory symbol) external returns (address) {
        NFTBulkMint nftContract = new NFTBulkMint(name, symbol, msg.sender);
        Contracts.push();

        uint index = Contracts.length - 1;
        Contracts[index].owner = msg.sender;
        Contracts[index].id = index;
        Contracts[index].contractAddress = address(nftContract);


        addressContractMap[msg.sender].push(address(nftContract));

        emit LaunchNFTContract(address(nftContract), msg.sender);

        return address(nftContract);
    }

    //Returns the NFT contract addresses for a particular owner
    function getContract() external view returns(address[] memory) {
        return(addressContractMap[msg.sender]);
    }

    //Get all the contract addresses of the various NFT Contracts
    function getAllContracts() external view returns(_contract[] memory) {
        return Contracts;
    }

}

contract NFTBulkMint is ERC721URIStorage { 

    using Counters for Counters.Counter;
    Counters.Counter private tokenCount;

    address owner;
    address newOwner;
    uint contractBalance;

    uint public constant MAX_CAP = 200;

    event OwnershipTransferred(address);
    event OwnershipClaimed(address);
    event Minted(uint, address);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can invoke this function");
        _;
    }

    constructor(string memory name, string memory symbol, address _owner) ERC721(name, symbol) {
        owner = _owner;
    }

    function grantOwnership(address _newOwner) public onlyOwner {
        require(_newOwner != address(0), "New owner cannot be a zero address");
        newOwner = _newOwner;
        emit OwnershipTransferred(newOwner);
    }

    function claimOwnerShip() external {
        require(msg.sender == newOwner, "Only new owner can call this function");
        owner = msg.sender;

        emit OwnershipClaimed(msg.sender);

    } 
    
    function mintNFTs(address[] memory to, string[] memory _tokenURI) external payable onlyOwner{
        
        require(bytes(_tokenURI[0]).length != 0, "Token URI cannot be null");

        for(uint i =0; i < to.length; i++) {
            require(MAX_CAP >= tokenCount.current(), "Cannot mint more than 200 tokens");
          
            tokenCount.increment();
            uint tokenId = tokenCount.current();

            _safeMint(to[i], tokenId);
            _setTokenURI(tokenId, _tokenURI[i]);

            emit Minted(tokenId, to[i]);

        }      

        contractBalance += msg.value; 
    }

    function withdrawFunds() external onlyOwner {

        (bool sent, ) = address(msg.sender).call{value: contractBalance}("");

        require(sent, "Ether not sent");
    }
    
}
