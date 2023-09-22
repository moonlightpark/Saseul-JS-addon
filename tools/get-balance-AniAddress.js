const SASEUL = require('saseul');
const prompt = require('prompt-sync')();
const path = require("path");
const fs = require("fs");
const ConfigIniParser = require('config-ini-parser').ConfigIniParser;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function () {
	console.log('Please enter Saseul wallet address.');
    let Myaddress = prompt();
    
    let root = path.dirname(__dirname);
    let _input = await fs.promises.readFile(root + "/saseul.ini", { encoding: "utf-8" });
    let parser = new ConfigIniParser();

    parser.parse(_input);

    let peer = parser.get("Network", "peers[]").replace(/^"(.*)"$/, '$1');

    SASEUL.Rpc.endpoint(peer);

    result = await SASEUL.Rpc.request(
        SASEUL.Rpc.signedRequest({
            "type": "GetBalance",
            "address": Myaddress
        })
    );

    balance = result.data.balance;

    console.dir('Current Balance: ' + balance);
    console.dir('Current Balance: ' + JSON.stringify(result, null, 5));

})();