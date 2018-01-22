# Ethereum Smart Meter

This project is done as part of TU Darmstadt TK Seminar 2017/2018. This is a implementation of a smart meter with Ethereum blockchain. The smart meter can measure production and consumption and announces them to the smart meter contract on the Ethereum blockchain. The contract rewards a EToken (Energy Token created for this project) on production with the rate of 1 EToken = 1kwh. On consumption the meter pays the consumed amount as EToken. 

## Hardware
* Smart Pi (Raspberry Pi 3)
* 32GB SD Card
* Inductive current sensors

For more information and to order the hardware go to SmartPi website: http://www.emanager.eu/en/products/smartpi

## Prerequisites
* [Raspbian](https://www.raspberrypi.org/downloads/raspbian/)
* [Nodejs](https://nodejs.org/en/download/)
* [SmartPi server](http://files.enerserve.eu/smartpi/smartpi.7z)
* [Geth](https://geth.ethereum.org/downloads/)

## Usage

 - Install the prerequisites.
 - If you don't already have a Ethereum wallet create one as shown [here](https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts).
 - Start Geth with: `geth --rinkeby --fast --rpc --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*" --rpcapi "eth,web3,personal"` this will start geth in Rinkeby test network.
 - Make sure you have ether on your wallet, if not get it from [here](https://www.rinkeby.io/#faucet).
 - Clone this repo and run `npm install`
 - Run with `node index.js`