# coinpunk-tools

Tools for importing and exporting bitcoin private keys with [coinpunk](https://coinpunk.com)

Coinpunk doesn't currently easily support getting your private key out of your
wallet for importing with other bitcoin wallets such as Multibit or Electrum.

This tool provides some command line utilities so that you can get your private
keys out of Coinpunk, as well as get your keys into Coinpunk.

## Installation

Install the tools via:

``` bash
$ npm install -g coinpunk-tools
```

This will create two command line tools called `coinbase-import` and
`coinbase-export`.

__NB: The email and password below are those that you use to login to
coinpunk.com__


## Example Usage

### Convert your keys into a coinpunk wallet

If you have a file called `mykeys.key` which contains a newline separated file
of your private keys, then you can convert it into a Coinpunk compatible
wallet file by running `coinbase-import`:

``` bash
$ coinpunk-import test@test.com mypassword mykeys.key coinpunk-wallet.txt
```

### Extract your private keys from a coinpunk wallet

Once you've backed up your coinpunk wallet, you can extract the private keys
from it, so that you can import it into a third party Bitcoin wallet:

``` bash
$ coinpunk-export test@test.com mypassword coinpunk-wallet.txt my-keys.key
```
