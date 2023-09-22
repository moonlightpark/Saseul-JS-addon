const SASEUL = require('saseul');
const prompt = require('prompt-sync')();
const path = require("path");
const fs = require("fs");
const ConfigIniParser = require('config-ini-parser').ConfigIniParser;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* 

README : https://docs.saseul.com/posts/09-system-method/

GetCode
Get registered code of a request or contract by contract index hash.

Request Parameters

Parameter	Requirements	Type	  Maxlength	      Description
type	    mandatory	    String	 	              “GetCode”
ctype		optional		String		10			  selected value : contract, request default value : contract 
target		optional		String		64			  hash

*/

(async function () {
	console.log('Please enter Saseul contract index hash.');
    let target = prompt();
    
    let root = path.dirname(__dirname);
    let _input = await fs.promises.readFile(root + "/saseul.ini", { encoding: "utf-8" });
    let parser = new ConfigIniParser();

    parser.parse(_input);

    let peer = parser.get("Network", "peers[]").replace(/^"(.*)"$/, '$1');

    SASEUL.Rpc.endpoint(peer);
    
    let ctype = "contract";  //  selected value : contract, request default value : contract
    
    
    result = await SASEUL.Rpc.request(
        SASEUL.Rpc.signedRequest({
            "type": "GetCode",
            "ctype": ctype,
            "target": target,
        })
    );
	console.dir('GetBlock : ' + result.data);
    console.dir('Return value: ' + JSON.stringify(result, null, 5));
    
})();


