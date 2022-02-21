import Web3 from 'web3';

import NFTContractBuild from 'contracts/NFT.json';

let selectedAccount;

export const init = async () => {
    let provider = window.ethereum;

    if (typeof provider !== 'undefined') {
      // MetaMask is installed

      provider
      .request({method: 'eth_requestAccounts'})
      .then(accounts => {
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch(err => {
        console.log(err);
      })

      window.ethereum.on('accountsChanged', function (accounts) {
        selectedAccount = accounts[0];
        console.log(`Selected account changed to ${selectedAccount}`);
      });
    }

    const web3 = new Web3(provider);

    const networkId = await web3.eth.net.getId();

    const nftContract = new web3.eth.Contract(
        NFTContractBuild.abi,
        NFTContractBuild.networks[networkId].address
    );
};