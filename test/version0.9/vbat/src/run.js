const vBat = require("./vbat-0.1");
const map = [
            "htmls/Asset/AssLoanAccount/Deposit/"
        ];
const source = __dirname + "/../source/"+ map[0];
const VB = vBat();

VB.setIgnore(['.DS_Store','folders',]);
VB.tempSetOn(true);


const targers = __dirname + "/../targets";
VB.run(source,targers);

/**
 * test case
 
const debug = __dirname + "/../debug";
const test = [
    "htmls/Accounting/ComprehensiveInquiry/AcctParaCompreQry",//6350
];

test.forEach(function(modFile){
    VB.run(source + "/" + modFile, debug);
});*/
