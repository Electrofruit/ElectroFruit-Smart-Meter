const Web3Service = require('./web3service');
const request = require('request');
const SmartGridContract = require('./smartgrid-contract');

//Set account 0 as used account
const meterAccount = Web3Service.useAccount(0);

//Execute production and consumption contracts
producedPastHour();
consumedPastHour();

/**
 * Measures the produced KWH from the past hour and executes the produce function on the smart contract
 */
function producedPastHour() {
    let currentTime = new Date();
    let hourago = new Date(currentTime.getTime() - (60 * 60 * 1000));
    let producedKWH = 0;
    //Get the production readings from the past hour on phase 1
    request('http://raspberrypi.local:1080/api/chart/1/energy_pos/from/' + hourago.toISOString() + '/to/' + currentTime.toISOString(), (error, response, body) => {
        let resultJson = JSON.parse(body);
        let values = resultJson[0].values;
        //Accumulate the total amount fed during the past hour
        values.forEach((measurment) => {
            producedKWH += measurment.value;
        });

        //Unlock the account for 15000 milliseconds
        Web3Service.unlockAccount(meterAccount, "1234", 15000);
        //Execute the produce smart contract
        SmartGridContract.produce(producedKWH, meterAccount);
    });
}

/**
 * Measures the consumed KWH from the past hour and executes the consume function on the smart contract
 */
function consumedPastHour() {
    let currentTime = new Date();
    let hourago = new Date(currentTime.getTime() - (60 * 60 * 1000));
    let consumedKWH = 0;
    //Get the consumption readings from the past hour on phase 1
    request('http://raspberrypi.local:1080/api/chart/1/energy_neg/from/' + hourago.toISOString() + '/to/' + currentTime.toISOString(), (error, response, body) => {
        let resultJson = JSON.parse(body);
        let values = resultJson[0].values;
        //Accumulate the total amount fed during the past hour
        values.forEach((measurment) => {
            consumedKWH += measurment.value;
        });

        //Unlock the account for 15000 milliseconds
        Web3Service.unlockAccount(meterAccount, "1234", 15000);
        //Execute the consume smart contract
        SmartGridContract.consume(consumedKWH, meterAccount);
    });
}