// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract CryplantNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // Ref: https://github.com/aavegotchi/aavegotchi-contracts/blob/ff456818465623d9d718869da9047ddce54d9a6e/contracts/Aavegotchi/libraries/LibAavegotchi.sol#L17
    struct Info {
        uint256 tokenId;
        string name;
        address owner;
        uint256 level;
        uint256 toNextlevel;
    }

    mapping(uint256 => Info) internal _infos;

    struct Params {
        address owner;
        string name;
        string uri;
        uint256 level;
        uint256 toNextlevel;
    }

    constructor() ERC721("Cryplant NFT", "CRYPLANT") {
        _tokenIdCounter.increment(); // 1
    }

    function safeMint(Params[] calldata _params) public onlyOwner {
        for(uint256 i = 0; i < _params.length; i++) {
            uint256 tokenId_ = _tokenIdCounter.current();
            _infos[tokenId_] = Info({
                tokenId: tokenId_,
                name: _params[i].name,
                owner: _params[i].owner,
                level: _params[i].level,
                toNextlevel: _params[i].toNextlevel
            });
            _tokenIdCounter.increment();
            _safeMint(_params[i].owner, tokenId_);
            _setTokenURI(tokenId_, _params[i].uri);
        }
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }


    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function getInfo(uint256 _tokenId) public view returns (Info memory) {
        return _infos[_tokenId];
    }
}