/**
 * Wrapper for required web3 methods
 */
const Web3 = require('web3');
const util = require('ethereumjs-util');
const tx = require('ethereumjs-tx');

//Ethereum node address
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


/**
 * Sets the ABI of the contract
 */
exports.setContractAbi = (abi) => {
    return web3.eth.contract(abi);
};
/**
 * Unlock account using pass for defined amount of time
 */
exports.unlockAccount = (account, pass, time) => {
    web3.personal.unlockAccount(account, pass, time);
};

/**
 * Set the account that you want to use
 */
exports.useAccount = (index) => {
    return web3.eth.accounts[index];
};

/**
 * Check all balances of accounts
 */
exports.checkAllBalances = () => {
    var totalBal = 0;
    for (var acctNum in web3.eth.accounts) {
        var acct = web3.eth.accounts[acctNum];
        var acctBal = web3.fromWei(web3.eth.getBalance(acct), "ether");
        totalBal += parseFloat(acctBal);
        console.log("  eth.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + " ether");
    }
    console.log("  Total balance: " + totalBal + " ether");
};