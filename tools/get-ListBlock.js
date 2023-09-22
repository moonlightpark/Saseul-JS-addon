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

ListBlock
Get array list of main chain block information.

Request Parameters
Parameter	Requirements	Type	  Maxlength	      Description
type		mandatory		String				 	  “ListBlock”
height		optional		Int			16			  block number
count		optional		Int			4			  max value : 9999 default value : 20
sort		optional		Int			2			  -1 : ascending order 1 : descending order default value : -1

*/

(async function () {
	console.log('Please enter Saseul block number.');
    let height = prompt();
    
    let root = path.dirname(__dirname);
    let _input = await fs.promises.readFile(root + "/saseul.ini", { encoding: "utf-8" });
    let parser = new ConfigIniParser();

    parser.parse(_input);

    let peer = parser.get("Network", "peers[]").replace(/^"(.*)"$/, '$1');

    SASEUL.Rpc.endpoint(peer);
    
    let count = 1;    // max value : 9999 , default value : 20
    let sort = -1;    // -1 : ascending order 1 : descending order default value : -1
    
    result = await SASEUL.Rpc.request(
        SASEUL.Rpc.signedRequest({
            "type": "ListBlock",
            "height": height,
            "count": count,
            "sort": sort,
        })
    );
    console.dir('Return value: ' + JSON.stringify(result, null, 5));
    
})();


