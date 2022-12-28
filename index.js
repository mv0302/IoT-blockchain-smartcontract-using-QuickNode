// Import the web3 library
import Web3 from "web3";
require("dotenv").config({ path: "iot.env" });

// Set the provider to use the local development network
const web3 = new Web3(new Web3.providers.HttpProvider("https://green-serene-seed.ethereum-goerli.discover.quiknode.pro/19b2ceafc983a06ff91b81470bb1fb7c5e0a625f/"));

// Get the contract ABI and address
const contractABI = [[
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "plantid",
				"type": "int256"
			},
			{
				"internalType": "uint256",
				"name": "tempreature",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "soilMoisture",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "height",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "color",
				"type": "string"
			}
		],
		"name": "addValues",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "plantid",
				"type": "int256"
			}
		],
		"name": "getValues",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "temperature",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "soilMoisture",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "height",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "color",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]]; // Replace with the ABI of your contract
const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"; // Replace with the address of your contract

// Create an instance of the contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Get the current account
const currentAccount = web3.eth.accounts[0];

// Add plant information when the "Add Plant Information" form is submitted
document.getElementById("add-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const plantId = document.getElementById("plant-id").value;
  const temperature = document.getElementById("temperature").value;
  const soilMoisture = document.getElementById("soil-moisture").value;
  const height = document.getElementById("height").value;
  const color = document.getElementById("color").value;
  contract.methods.addValues(plantId, temperature, soilMoisture, height, color).send({ from: currentAccount })
    .then(function(result) {
      console.log(result);
    })
    .catch(function(error) {
      console.error(error);
    });
});

// Get plant information when the "Get Plant Information" form is submitted
document.getElementById("get-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const plantId = document.getElementById("get-plant-id").value;
  contract.methods.getValues(plantId).call()
    .then(function(result) {
      const temperature = result[0];
      const soilMoisture = result[1];
      const height = result[2];
      const color = result[3];
      document.getElementById("output").innerHTML = `Temperature: ${temperature}<br>Soil Moisture: ${soilMoisture}<br>Height: ${height}<br>Color: ${color}`;
    })
    .catch(function(error) {
      console.error(error);
    });
});