# KibokoGetPriceHook

[![npm version](https://img.shields.io/npm/v/kibokogetpricehook.svg)](https://www.npmjs.com/package/kibokogetpricehook)
[![npm downloads](https://img.shields.io/npm/dt/kibokogetpricehook)](https://www.npmjs.com/package/kibokogetpricehook)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](./LICENSE)
[![Build Status](https://travis-ci.com/kibokogetpricehook/kibokogetpricehook.svg?branch=main)](https://travis-ci.com/kibokogetpricehook/kibokogetpricehook)
[![Coverage Status](https://coveralls.io/repos/github/kibokogetpricehook/kibokogetpricehook/badge.svg?branch=main)](https://coveralls.io/github/kibokogetpricehook/kibokogetpricehook?branch=main)

KibokoGetPriceHook is a simple, efficient, and powerful tool for retrieving real-time prices of cryptocurrency pairs. This package allows users to easily access price information for various cryptocurrency pairs through a straightforward API.

## Installation

```bash
# via npm
npm i kibokogetpricehook
# via yarn
yarn add kibokogetpricehook
```

## Usage
```ts
import { getPairPrice } from 'kibokogetpricehook'

const getTokenPairPrice = () => {
  getPairPrice('ETH/USD').then((res: any) => {
    console.log("Pair price: ", res)
  }).catch((err: any) => {
    console.error(err)
  })
}
```
## Functionality
getPairPrice

The getPairPrice function provides real-time price information for a specified cryptocurrency pair.
```ts
// user can call this
export const getPairPrice = async (pair: string) => {
  if (pragma_contract) {
    try {
      const SPOTENTRY_ENUM = new CairoCustomEnum({
        SpotEntry: pair,
      });
      the res = await pragma_contract.get_data_median(SPOTENTRY_ENUM);
      const price = getRealPrice(res);
      return price;
    } catch (err) {
      console.log("pair not found");
    }
  }
};
```
## NPM Package Snapshot

![Alt text](<IMG-20240127-WA0128 (1).jpg>)

## License

This library is licensed under the [MIT License](./LICENSE).