const SASEUL = require('saseul');
const path = require("path");
const fs = require("fs");
const ConfigIniParser = require('config-ini-parser').ConfigIniParser;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* 

README : https://docs.saseul.com/posts/09-system-method/

BlockCount
Get total count of the main chain blocks.

Request Parameters

Parameter	Requirements	Type	  Maxlength	      Description
type	    mandatory	    String	 	              “BlockCount”
target	    optional	    String	    78	           block hash or height
full	    optional	    Boolean	    5	           true or false default value : false

*/

(async function () {
	
    let root = path.dirname(__dirname);
    let _input = await fs.promises.readFile(root + "/saseul.ini", { encoding: "utf-8" });
    let parser = new ConfigIniParser();

    parser.parse(_input);

    let peer = parser.get("Network", "peers[]").replace(/^"(.*)"$/, '$1');

    SASEUL.Rpc.endpoint(peer);
    
    let target = "";  // block hash or height
    let full = true;  // true or false default value : false
    
    
    result = await SASEUL.Rpc.request(
        SASEUL.Rpc.signedRequest({
            "type": "BlockCount",
            "target": target,
            "full": full,
        })
    );
	console.dir('BlockCount : ' + result.data);
    console.dir('Return value: ' + JSON.stringify(result, null, 5));
    
})();


