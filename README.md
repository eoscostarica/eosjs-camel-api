<p align="center">
	<a href="https://travis-ci.org/eoscostarica/eosjs-camel-api">
		<img src="https://travis-ci.org/eoscostarica/eosjs-camel-api.svg?branch=master" alt="TravisCI">
	</a>
	<a href="http://standardjs.com">
		<img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" alt="StandardJS">
	</a>
	<a href="https://git.io/col">
		<img src="https://img.shields.io/badge/%E2%9C%93-collaborative_etiquette-brightgreen.svg" alt="Collaborative Etiquette">
	</a>
	<a href="https://discord.gg/bBpQHym">
		<img src="https://img.shields.io/discord/447118387118735380.svg?logo=discord" alt="chat on Discord">
	</a>
	<a href="https://twitter.com/intent/follow?screen_name=eoscostarica">
		<img src="https://img.shields.io/twitter/follow/eoscostarica.svg?style=social&logo=twitter" alt="follow on Twitter">
	</a>
	<a href="#">
		<img src="https://img.shields.io/dub/l/vibe-d.svg" alt="MIT">
	</a>
</p>

<p align="center">
	<a href="https://eoscostarica.io">
		<img src="https://cdn.rawgit.com/eoscostarica/assets/574d20a6/logos/eoscolors-transparent.png" width="300">
	</a>
</p>

# EOS API module ( in CamelCase :camel:)  

Application programming interface for using the EOS blockchain via the RPC API provided by Block Producer Nodes. This is for read-only API calls.

This project wraps the official [eosio/eosjs-api](https://github.com/eosio/eosjs-api) to provide 
camelcase output.  It only works with await/async and promise code style, there's no support for the callback style.

*It is a work in progress.*

## Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Bug Reporting](#bug-reporting)
- [Maintainers](#maintainers)
- [About EOS Costa Rica](#about-eos-costa-rica)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting Started

```
yarn add @eoscostarica/eosjs-camel-api  # or npm install -S @eoscostarica/eosjs-camel-api
```

```javascript
const eosCamelApi = require('eosjs-camel-api')
const api = eosCamelApi.getInstance(options)  // same options object that eosio/eosjs-api supports

const logInfo = async () => {
 const info = await api.getInfo({})
 console.log(info)
}

logInfo()

// { serverVersion: 'ad4ba283',
//   chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
//   headBlockNum: 8448809,
//   lastIrreversibleBlockNum: 8448494,
//   lastIrreversibleBlockId: '0080e9eefdcfb032231d2c8cc5c850a004034fb85831febc22d55e63723da590',
//   headBlockId: '0080eb294f506de95c636e690cf523c7895987114d32bb87378ff13b322d2904',
//   headBlockTime: '2018-08-06T02:32:26.000',
//   headBlockProducer: 'acryptolions',
//   virtualBlockCpuLimit: 200000000,
//   virtualBlockNetLimit: 1048576000,
//   blockCpuLimit: 199900,
//   blockNetLimit: 1048576 }

```

eosjs-camel-api functions receive both snakecase and camelcase arguments and always return camelcase objects.

It defaults to the [Jungle Testnet](http://jungle.cryptolions.io/) via the https://jungle.eosio.cr endpoint.

### Camel Namespace Functions

eosjs-camel-api exposes functions that not part of `eosjs-api` in the `camel` namespace.  Eg

```javascript
const eosCamelApi = require('eosjs-camel-api')
const jungleApi = eosCamelApi.getInstance() 
const mainNetApi = eosCamelApi.getInstance({httpEndpoint: 'https://api.eosio.cr'}) 

console.log(jungleApi.camel.getConfig())
// { httpEndpoint: 'https://jungle.eosio.cr' }

console.log(mainNetApi.camel.getConfig())
// { httpEndpoint: 'https://api.eosio.cr' }

```


## Contributing

We follow the [open source collaborative ettiquete](https://github.com/rstacruz/collaborative-etiquette/blob/master/README.md#top), the [standardjs code style](https://standardjs.com).

Read EOS Costa Rica's Open Source Contributing Guidelines for more detail

https://learn.eoscostarica.io/open-source/

## Bug Reporting

Please report bugs big and small by [opening an issue](https://github.com/eoscostarica/eosjs-camel-api/issues). 
No possible bug report is too small.

## Maintainers 

- [@gaboesquivel](https://github.com/gaboesquivel).

## About EOS Costa Rica

EOS Blockchain is aiming to become a decentralized operating system which can support large-scale decentralized applications.

EOS Costa Rica supports the EOS.io community by maintaining and contributing to open source initiatives, meetups and workshops.

We challenge ourselves to provide the EOS platform with a strong geographical and political diversity by running the most robust EOS Block Producer possible from Costa Rica; We pledge to leverage our talent, experience, and sustainable Internet resources to meet such an important challenge.

[eoscostarica.io](https://eoscostarica.io)

## License

MIT © [EOS Costa Rica](https://eoscostarica.io)  