const SASEUL = require('saseul');
const path = require("path");
const fs = require("fs");
const ConfigIniParser = require('config-ini-parser').ConfigIniParser;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* 

README : https://docs.saseul.com/posts/09-system-method/

ListCode
Get array list of registered contracts and requests.

Request Parameters

Parameter	Requirements	Type	  Maxlength	      Description
type	    mandatory	    String	 	              “ListCode”
page		optional		Int			16			  Page Number of the list. default value : 1
count		mandatory		Int			4			  Number of lists to be displayed on a page. 0 < count ≤ 100

*/

(async function () {
    
    let root = path.dirname(__dirname);
    let _input = await fs.promises.readFile(root + "/saseul.ini", { encoding: "utf-8" });
    let parser = new ConfigIniParser();

    parser.parse(_input);

    let peer = parser.get("Network", "peers[]").replace(/^"(.*)"$/, '$1');

    SASEUL.Rpc.endpoint(peer);
    
    let page = 2;  //  Page Number of the list. default value : 1
    let count = 20;  //  Number of lists to be displayed on a page. 0 < count ≤ 100
    
    
    result = await SASEUL.Rpc.request(
        SASEUL.Rpc.signedRequest({
            "type": "ListCode",
            "page": page,
            "count": count,
        })
    );

    console.dir('Return value: ' + JSON.stringify(result, null, 5));
    
})();


