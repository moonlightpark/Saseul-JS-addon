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

ListTransaction
Get array list of transaction information.

Request Parameters

Parameter	Requirements	Type	  Maxlength	      Description
type	    mandatory	    String	 	             “ListTransaction”
address	    optional	    String	  44	 
page	    optional	    Int	      16	          Page Number of the list. default value : 1
count	    mandatory	    Int	      4	              Number of lists to be displayed on a page.0 < count ≤ 1000	

*/

(async function () {
	
	console.log('Please enter Saseul wallet address.');
    let Myaddress = prompt();
	
    let root = path.dirname(__dirname);
    let _input = await fs.promises.readFile(root + "/saseul.ini", { encoding: "utf-8" });
    let parser = new ConfigIniParser();

    parser.parse(_input);

    let peer = parser.get("Network", "peers[]").replace(/^"(.*)"$/, '$1');

    SASEUL.Rpc.endpoint(peer);
    
    
    let page  = 1;
    let count = 3;
    
    result = await SASEUL.Rpc.request(
        SASEUL.Rpc.signedRequest({
            "type": "ListTransaction",
            "address": Myaddress,
            "page": page,
            "count": count,
        })
    );

    console.dir('Return value: ' + JSON.stringify(result.data, null, 5));
    
})();

