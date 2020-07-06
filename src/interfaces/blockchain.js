const {Base64} = require('js-base64');
const Web3 = require('web3');

const provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/e7e3e851444f423dae848b10780b869a');
const web3 = new Web3(provider);
web3.eth.net.isListening()
  .then(() => console.log('web3 is connected'))
  .catch(e => console.log(`Wow. Something went wrong ${e}`));
const abi = [
  {
    inputs: [],
    name: 'getAllLocations',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLastLocation',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_location',
        type: 'string',
      },
    ],
    name: 'writeLocationDataString',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const contractAddress = '0x9637bB29699BdE0a989056CCd33658a7B4795B62';
const contract = new web3.eth.Contract(abi, contractAddress);

// contract.methods.writeLocationDataString('eyJpZCI6MywibGF0Ijo0OC4yODE5LCJsbmciOjE1LjcxMTgsInRpbWVzdGFtcCI6MTU5MzcxMjc5NDEwOX0=');


function writeToBlockchain(encodedData) {
  // console.log(encodedData);
  // TODO write to actual smart contract
}

function encodeData(id, lat, lng, timestamp) {
  const location = JSON.stringify({
    id, lat, lng, timestamp,
  });
  // console.log(location);
  writeToBlockchain(Base64.encode(location));
}


async function retrieveFromBlockchain() {
  // console.log('test');
  // TODO contract.getAll
  // return response.toString();
}


async function parseBlockchainHistory(locationHistory) {
  // console.log(locationHistory);
  const locations = locationHistory.split(';');
  // console.log(locations);
  const parsedLocations = [];
  locations.forEach((element) => {
    // console.log(element);
    const parsedLocation = JSON.parse(Base64.decode(element));
    parsedLocations.push(parsedLocation);
  });
  console.log(parsedLocations);
  return parsedLocations;
}

async function retrieveHistory() {
  contract.methods.getAllLocations().call().then((res) => {
    console.log(res);
    return parseBlockchainHistory(res);
  });
  // return parseBlockchainHistory('eyJpZCI6MywibGF0IjogNDguMjgxOSwibG5nIjogMTUuNzExOCwidGltZXN0YW1wIjogMTU5MzcxMjc5NDEwOX0=;eyJpZCI6MiwibGF0IjogNDguMjgxOSwibG5nIjogMTUuNzExOCwidGltZXN0YW1wIjogMTU5MzcxMjc5NDEwOX0=');
}


// TODO remove for actual use
encodeData(3, 48.2819, 15.7118, 1593712794109);

module.exports = {
  encodeData,
  retrieveHistory,
};
