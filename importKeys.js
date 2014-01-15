#!/usr/bin/env node
// importKeys.js
var path = require('path'),
    fs = require('fs'),
    sjcl = require('sjcl'),
    Address = require('coinpunk/lib/bitcoinjs/address'),
    ECKey = require('coinpunk/lib/bitcoinjs/eckey');

if (process.argv.length != 6) {
  console.log('Usage: coinpunk-import [email] [password] [privateKeyFile] [coinpunkWallet]');
  process.exit();
}

var walletId = process.argv[2];
var walletPassword = process.argv[3];
var privateKeyPath = path.resolve(process.argv[4]);
var outFile = path.resolve(process.argv[5]);

var walletKey = sjcl.codec.base64.fromBits(sjcl.misc.pbkdf2(walletPassword, walletId, 1000));

var payload = {
  keyPairs: [],
  transactions: [],
  unspent: []
};
var privateKeys = fs.readFileSync(privateKeyPath, { encoding: 'utf8' }).split('\n');
privateKeys.forEach(function (privateKey, i) {
  var k = new ECKey(privateKey);
  var publicKey = new Address(k.getBitcoinAddress().hash).toString();
  var keyPair = {
    key: privateKey,
    publicKey: new Buffer(k.getPubKeyHash()).toString('hex'),
    address: new Address(k.getBitcoinAddress().hash).toString(),
    isChange: false,
    name: "Imported Key " + (i + 1)
  };
  payload.keyPairs.push(keyPair);
});
var wallet = sjcl.encrypt(walletKey, JSON.stringify(payload));

fs.writeFileSync(outFile, wallet, { encoding: 'utf8' });
console.log('Coinpunk wallet written out to ' + outFile);
