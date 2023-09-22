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

GetBlock
Get main chain block information by block hash or height.

Request Parameters

Parameter	Requirements	Type	  Maxlength	      Description
type	    mandatory	    String	 	              “GetBlock”
target	    optional	    String	    78	           block hash or height
full	    optional	    Boolean	    5	           true or false default value : false

*/

(async function () {
	console.log('Please enter Saseul block hash or height.');
    let target = prompt();
    
    let root = path.dirname(__dirname);
    let _input = await fs.promises.readFile(root + "/saseul.ini", { encoding: "utf-8" });
    let parser = new ConfigIniParser();

    parser.parse(_input);

    let peer = parser.get("Network", "peers[]").replace(/^"(.*)"$/, '$1');

    SASEUL.Rpc.endpoint(peer);
    
    //let target = "05fa8ae93be2407064b0f853f0b3304f3567e20d918f29cea4ff63ad00df84018f5b5964e00bd5";  // block hash or height
    let full = false;  // true or false default value : false
    
    
    result = await SASEUL.Rpc.request(
        SASEUL.Rpc.signedRequest({
            "type": "GetBlock",
            "target": target,
            "full": full,
        })
    );
	console.dir('GetBlock : ' + result.data);
    console.dir('Return value: ' + JSON.stringify(result, null, 5));
    
})();


