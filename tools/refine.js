const SASEUL = require('saseul');
const prompt = require('prompt-sync')();
const path = require("path");
const fs = require("fs");
const ConfigIniParser = require('config-ini-parser').ConfigIniParser;

const token = require("../example/token/all");
const space = 'AuctionSL';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function () {

    let root = path.dirname(__dirname);
    let _input = await fs.promises.readFile(root + "/saseul.ini", { encoding: "utf-8" });
    let parser = new ConfigIniParser();

    parser.parse(_input);

    let peer = parser.get("Network", "peers[]").replace(/^"(.*)"$/, '$1');

    SASEUL.Rpc.endpoint(peer);

    let json = await fs.promises.readFile(root + "/keypair.json", { encoding: "utf-8" });
    let keypair = JSON.parse(json);
    
    let result, resource, refine;
    
	let my_address = keypair.address;
	
    console.dir('My Address: ' + my_address);
    
    result = await SASEUL.Rpc.request(
        SASEUL.Rpc.signedRequest({
            "type": "GetBalance",
            "address": keypair.address
        }, keypair.private_key)
    );

    balance = result.data.balance;

    console.dir('Current Balance: ' + balance);

    resource = await SASEUL.Rpc.request(
	        SASEUL.Rpc.signedRequest({
	            "type": "GetResource",
	            "address": keypair.address
	        }, keypair.private_key)
	    );

    console.dir('GetResource : ' + resource.data);

    
    refine = await SASEUL.Rpc.broadcastTransaction(
        SASEUL.Rpc.signedTransaction({
            "type": "Refine",
            "amount": resource.data
        }, keypair.private_key)
    );
    
    console.dir('Refine : ' + JSON.stringify(refine, null, 5));

})();
