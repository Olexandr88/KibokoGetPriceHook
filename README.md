# KibokoGetPriceHook

[![npm version](https://img.shields.io/npm/v/kibokogetpricehook.svg)](https://www.npmjs.com/package/kibokogetpricehook)
[![npm downloads](https://img.shields.io/npm/dt/kibokogetpricehook)](https://www.npmjs.com/package/kibokogetpricehook)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://opensource.org/license/mit)
[![Build Status](https://flat.badgen.net/travis/KibokoDao-Africa/KibokoGetPriceHook)](https://travis-ci.com/kibokogetpricehook/kibokogetpricehook)
[![Coverage Status](https://coveralls.io/repos/github/kibokogetpricehook/kibokogetpricehook/badge.svg?branch=main)](https://coveralls.io/github/kibokogetpricehook/kibokogetpricehook?branch=main)

The kibokogetpricehook package provides utility functions to fetch real-time financial data, including pair prices, exchange rates, and currency-specific exchange rates. It's designed for seamless integration with financial applications.

## Installation

```bash
# via npm
npm i kibokogetpricehook
# via yarn
yarn add kibokogetpricehook
```

# 1. Getting Token Pair Price
## Description
getPairPrice: Fetches the current price of a specified cryptocurrency pair.

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
# 2. Getting Exchange Rate
## Description
getExchangeRate: Retrieves the exchange rate for a specified token against a base currency, dynamically responding to user input changes.


## Usage
```ts
import { getExchangeRate } from "kibokogetpricehook";

// Updates the selected token and fetches its exchange rate.
const handleTokenChangeForExchangeRate = (event: React.ChangeEvent<HTMLInputElement>) => {
  const token = event.target.value;
  setSelectedToken(token);
  getExchangeRate(token, numberOfTokens);
};

// Updates the number of tokens and fetches the updated exchange rate.
const handleNumberOfTokensChangeForExchangeRate = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const tokens = event.target.value;
  setNumberOfTokens(tokens);
  try {
    const amountInKesReceived = await getExchangeRate(selectedToken, tokens);
    setAmountToReceive(String(amountInKesReceived));
    console.log(amountInKesReceived);
  } catch (error) {
    console.error("Error fetching exchange rate", error);
  }
};
```
# 3. Getting Currency-Specific Exchange Rate
## Description
getCurrencyExchangeRate: Obtains the exchange rate for a specified token against a set of currencies, using additional data for calculations.


## Usage
```ts
import { getCurrencyExchangeRate } from "kibokogetpricehook";

// Updates the selected token and fetches its currency-specific exchange rate.
const handleTokenChangeForExchangeRate = (event: React.ChangeEvent<HTMLInputElement>) => {
  const token = event.target.value;
  setSelectedToken(token);
  getCurrencyExchangeRate(token, numberOfTokens, ratesData);
};

// Updates the number of tokens and fetches the updated currency-specific exchange rate.
const handleNumberOfTokensChangeForExchangeRate = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const tokens = event.target.value;
  setNumberOfTokens(tokens);
  try {
    const amountInCurrencyReceived = await getCurrencyExchangeRate(selectedToken, tokens, ratesData);
    setAmountToReceive(String(amountInCurrencyReceived));
    console.log(amountInCurrencyReceived);
  } catch (error) {
    console.error("Error fetching exchange rate", error);
  }
};

```

<!-- ## Functionality
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
 -->

## NPM Package Snapshot

![Alt text](https://github.com/KibokoDao-Africa/KibokoGetPriceHook/blob/main/public/IMG-20240127-WA0128%20(1).jpg)

## License

This library is licensed under the [MIT License](https://opensource.org/license/mit).
