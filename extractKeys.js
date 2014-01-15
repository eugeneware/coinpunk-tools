#!/usr/bin/env node
var path = require('path'),
    fs = require('fs'),
    sjcl = require('sjcl');

if (process.argv.length != 6) {
  console.log('Usage: coinpunk-export [email] [password] [walletfile] [outputFile]');
  process.exit();
}
var walletId = process.argv[2];
var walletPassword = process.argv[3];
var walletPath = path.resolve(process.argv[4]);
var outFile = path.resolve(process.argv[5]);

var wallet = fs.readFileSync(walletPath, { encoding: 'utf8' });
var walletKey = sjcl.codec.base64.fromBits(sjcl.misc.pbkdf2(walletPassword, walletId, 1000));
var keys = JSON.parse(sjcl.decrypt(walletKey, wallet));
var privateKeys = keys.keyPairs.map(function (keyPair) {
  return keyPair.key;
});

fs.writeFileSync(outFile, privateKeys.join('\n'), { encoding: 'utf8' });
console.log('Private keys written out to ' + outFile);
