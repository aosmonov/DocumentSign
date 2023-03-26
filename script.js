const contractAddress = "0xb6CF076Da3375E745945c70bB757410334Df2703"
const abi =
[
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_info",
        "type": "string"
      }
    ],
    "name": "createDocument",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_whitelist",
        "type": "address[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      }
    ],
    "name": "DocumenCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "signer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      }
    ],
    "name": "DocumentSigned",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_documentId",
        "type": "uint256"
      }
    ],
    "name": "signDocument",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "documentId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
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
    "name": "documents",
    "outputs": [
      {
        "internalType": "string",
        "name": "info",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "signatureCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_documentId",
        "type": "uint256"
      }
    ],
    "name": "getSignatureCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_documentId",
        "type": "uint256"
      }
    ],
    "name": "getSigners",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getWhitelist",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_documentId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "hasAddressSigned",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "hasSigned",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isWhitelisted",
    "outputs": [
      {
"internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "signers",
    "outputs": [
      {
        "internalType": "address",
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "whitelist",
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


const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

let signer;
let contract;

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        contract = new ethers.Contract(contractAddress, abi, signer);
        getDocuments()
    });
});

async function createDocument() {
    const documentText = document.getElementById("docText").value;
    await contract.createDocument(documentText);
    setTimeout(
        window.location = window.location.href,
        7000
    )
}

async function getDocuments() {
    const maxID = Number(await contract.documentId());
    let resStr = `<div><div class='documentRow documentId'><b>Info</b></div>
    <div class='documentRow documentSignCount'><b>Sign Count</b></div>
    <div class='documentRow documentButton'><b>Action</b></div>
    <div class='documentRow documentSigners'><b>Signers</b></div>
    </div>`

    for (let id = maxID; id >= 1; id--) {
        let result = await contract.documents(id)

        console.log(result);

        let signers = '';
        let signersResult = await contract.getSigners(id);
        for(let i = 0; i < signersResult.length; i++) {
          signers += `<p style='font-size: 0.8em;'>${signersResult[i]}</p>`;
        }

        resStr += `<div><div class='documentRow documentId'>${result.info}</div>
          <div class='documentRow documentSignCount'>${result.signatureCount}</div>
          <div class='documentRow documentButton'><a href="#" onclick='sign(${id})'>Sign</a></div>
          <div class='documentRow documentSigners'>${signers}</div>
          </div>`
    }
    document.getElementById('results').innerHTML = resStr
}

async function sign(docId) {
    await contract.signDocument(docId);
    setTimeout(
        window.location = window.location.href,
        7000
    )
}