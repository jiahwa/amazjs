const vBat = require('./vbat-0.1');
const VB = vBat();

const targets = __dirname + '/../targets';
// const targets = __dirname + '/../debug';
const newPages = targets + '/pages';
const newTemp = targets + '/temp';

VB.rmdirSync(targets);

VB.mkdirSync(targets);
VB.mkdirSync(newPages);
VB.mkdirSync(newTemp);
VB.log(`targets已清空!`);
