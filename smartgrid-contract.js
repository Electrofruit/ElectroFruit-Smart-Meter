const Web3Service = require('./web3service');
/**
 * The smart grid abi and address
 */
const contractDetails = {
    abi: [{ "constant": false, "inputs": [], "name": "payDebt", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "globalPrice", "outputs": [{ "name": "", "type": "uint256", "value": "1" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "providerAddres", "outputs": [{ "name": "", "type": "address", "value": "0x56bbd1835172095dadf7f2d2ce5a85f0e99a7615" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_produced", "type": "uint256" }], "name": "produce", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_consumed", "type": "uint256" }], "name": "setDebt", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address", "value": "0x2f5cf0d9b0f65ef08f3b9e2a4ec1e35be35b863d" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "users", "outputs": [{ "name": "debt", "type": "uint256", "value": "0" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "payOut", "outputs": [{ "name": "", "type": "address", "value": "0x56bbd1835172095dadf7f2d2ce5a85f0e99a7615" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_providerAddress", "type": "address", "index": 0, "typeShort": "address", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;provider Address", "template": "elements_input_address", "value": "" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }],
    address: '0x8578f6deB65eB80551417c977A54E1E5789151A0'
}

const smartGridContract = Web3Service.setContractAbi(contractDetails.abi);
const smartGrid = smartGridContract.at(contractDetails.address);

/**
 * Pay the dept owed to the grid
 */
exports.payDebt = (from) => {
    smartGrid.payDebt({ from: from });
}

/**
 * Set a debt to the meter according to the amount that was consumed
 */
exports.setDebt = (consumed, from) => {
    smartGrid.setDebt(consumed, { from: from })
}

/**
 * Reward tokens according to the amount that was produced
 */
exports.produce = (produced, from) => {
    smartGrid.produce(produced, { from: from });
}