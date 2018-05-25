import Web3 from 'web3';
import TruffleContract from 'truffle-contract'
import artifact from '../build/contracts/HomomorphicTransaction.json'
import elliptic from 'elliptic'
import BN from 'bn.js'

let ec = elliptic.ec('secp256k1')

let web3

let accounts = [] // list of available accounts

let account = null // main account

let hom // the HomomorphicTransaction contract instance

// Checking if Web3 has been injected by the browser (Mist/MetaMask)
if (window.web3 !== undefined) {
  // Use Mist/MetaMask's provider
  web3 = new Web3(window.web3.currentProvider)
} else {
  // web3 = new Web3(new Web3.providers.HttpProvider("http://rinkeby.infura.io/"))
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545/"))
}

{
  let c = TruffleContract(artifact)
  c.setProvider(web3.currentProvider)
  c.deployed().then(r => {
    hom = r
  })
}

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

let randomBN = function () {
  let array = new Uint16Array(8)
  window.crypto.getRandomValues(array)
  let n = new BN(array[0])
  n
  .ishln(16)
  .iaddn(array[1])
  .ishln(16)
  .iaddn(array[2])
  .ishln(16)
  .iaddn(array[3])
  .ishln(16)
  .iaddn(array[4])
  .ishln(16)
  .iaddn(array[5])
  .ishln(16)
  .iaddn(array[6])
  .ishln(16)
  .iaddn(array[7])
  return n
}

let depositCoin = function () {
  let values = [document.getElementById("amount1").value, document.getElementById("amount2").value, document.getElementById("amount3").value]
  let receivers = [document.getElementById("receiver1").value, document.getElementById("receiver2").value, document.getElementById("receiver3").value]

  // each input amount
  let amounts  = values.map(x => new BN(web3.toWei(x)).shln(128).add(randomBN()))
  // sum of inputs
  let total    = amounts.reduce((x, y) => x.add(y))
  // encrypted input
  let points   = amounts.map(x => ec.g.mul(x))
  // argument to the contract
  let argument = points.map((p, i) => [p.x.toString(), p.y.toString(), receivers[i]])

  console.log(amounts.map(x => x.toString()))
  console.log(total.toString())
  console.log(argument)

  hom.mint.sendTransaction(total.toString(), argument, {value: total.shrn(128).addn(1).toString(), from: account, gas: 700000}, console.log)
}

document.getElementById("deposit").addEventListener('click', depositCoin)