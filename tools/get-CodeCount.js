const SASEUL = require('saseul');
const path = require("path");
const fs = require("fs");
const ConfigIniParser = require('config-ini-parser').ConfigIniParser;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* 

README : https://docs.saseul.com/posts/09-system-method/

CodeCount
Get total count of registered contracts and requests.

Request Parameters

Parameter	Requirements	Type	  Maxlength	      Description
type	    mandatory	    String	 	              “CodeCount”

*/

(async function () {
    
    let root = path.dirname(__dirname);
    let _input = await fs.promises.readFile(root + "/saseul.ini", { encoding: "utf-8" });
    let parser = new ConfigIniParser();

    parser.parse(_input);

    let peer = parser.get("Network", "peers[]").replace(/^"(.*)"$/, '$1');

    SASEUL.Rpc.endpoint(peer);    
    
    result = await SASEUL.Rpc.request(
        SASEUL.Rpc.signedRequest({
            "type": "CodeCount",
        })
    );
	console.dir('CodeCount : ' + result.data.contracts);
    console.dir('Return value: ' + JSON.stringify(result, null, 5));
    
})();


