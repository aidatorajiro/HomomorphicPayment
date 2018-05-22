import Web3 from 'web3';
import truffleContract from 'truffle-contract'
import artifact from '../build/contracts/HomomorphicTransaction.json'

let web3

// Checking if Web3 has been injected by the browser (Mist/MetaMask)
if (typeof web3 !== 'undefined') {
  // Use Mist/MetaMask's provider
  web3 = new Web3(window.web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://rinkeby.infura.io/"))
}

let accounts = [] // list of available accounts

let account = null // main account

let hom // the HomomorphicTransaction contract instance

truffleContract(artifact).then((result) => {
  hom = result
})

window.hom = hom

web3.version.getNetwork((error, result) => {
  if (error === null && result in artifact.networks) {
    hom = web3.eth.contract(artifact.abi).at(artifact.networks[web3.version.network].address)
  } else {
    alert('You are connecting to wrong network! Please check your client configuration and reload the page.')
  }
})

// Get the initial account balance so it can be displayed.
web3.eth.getAccounts(function(err, accs) {
  if (err != null) {
    alert("There was an error fetching your accounts.");
    return;
  }

  if (accs.length == 0) {
    alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
    return;
  }

  accounts = accs;
  account = accounts[0];
});

let setStatus = function (message) {
  let status = document.getElementById("status");
  status.innerHTML = message;
}

let depositCoin = function () {
  let amount = parseInt(document.getElementById("amount").value);
  let receivers = document.getElementById("receiver").value.split(",");

  hom.mint();
}