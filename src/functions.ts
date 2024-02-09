import axios from "axios";
// import { useState } from "react";
import { CairoCustomEnum, Contract } from "starknet";
import PRAGMA_ABI, { PRAGMA_CONTRACT_ADDRESS } from "./pragmaabi";
import { BigNumber } from "bignumber.js";

// state for currency rate
// const [exchangeRate, setExchangeRate] = useState<number>(0);
// const [baseCoinRate, setBaseCoin] = useState<number>(0);
const pragma_contract = new Contract(PRAGMA_ABI, PRAGMA_CONTRACT_ADDRESS);

//helper functions
//converts hexa to readable rwsult
export function getRealPrice(val: any) {
  let decimals = BigNumber(val.decimals).toNumber();
  let ts = BigNumber(val.last_updated_timestamp).toNumber();
  let real_price = {
    price: BigNumber(val.price)
      .dividedBy(10 ** decimals)
      .toNumber(),
    last_updated_timestamp: timeStampToDate(ts),
    num_sources_aggregated: BigNumber(val.num_sources_aggregated).toNumber(),
  };
  return real_price;
}
//convert u64 to readabe time
export function timeStampToDate(timestamp: number) {
  if (!timestamp) return null;
  const timestampInMilliseconds = timestamp * 1000;
  const date = new Date(timestampInMilliseconds);
  return date;
}
//user can call this
export const getPairPrice = async (pair: string) => {
  if (pragma_contract) {
    try {
      const SPOTENTRY_ENUM = new CairoCustomEnum({
        SpotEntry: pair,
      });
      const res = await pragma_contract.get_data_median(SPOTENTRY_ENUM);
      const price = getRealPrice(res);
      return price;
    } catch (err) {
      console.log("pair not found");
    }
  }
};

export const getExchangeRate = async (symbol: any, amount: any) => {
  try {
    const response = await axios.get(
      `https://api.coinbase.com/v2/exchange-rates?currency=${symbol}`
    );

    // Check if the response is successful
    if (response.status === 200) {
      const data = response.data;
      if (data && data.data && data.data.rates && data.data.rates.KES) {
        const baseCoinRate: number = data.data.rates.KES;
        const amountInKesReceived: number = amount * baseCoinRate;
        //TODOS: Add deduction and make it accept diffrent currencies
        // setExchangeRate(Number(amountInKesReceived.toFixed(2))); // convert to number and set state
        // setBaseCoin(baseCoinRate);
        return amountInKesReceived;
      } else {
        console.log("No exchange rate data found for KES");
      }
    } else {
      console.log("Failed to fetch exchange rate from Coinbase API");
    }
  } catch (error) {
    console.log("Unable to get exchange rate", error);
  }
};

export const getCurrencyExchangeRate = async (symbol: any, amount: any, rates: any) => {
  //return based on the currency specified
  try {
    const response = await axios.get(
      `https://api.coinbase.com/v2/exchange-rates?currency=${symbol}`

    );

    // Check if the response is successful
    if (response.status === 200) {
      const data = response.data;
      if (data && data.data && data.data.rates && data.data.rates[rates]) {
        const baseCoinRate: number = data.data.rates[rates];
        // return the amount in the specified currency
        const amountInCurrencyReceived: number = amount * baseCoinRate;
        return amountInCurrencyReceived;
       
      } else {
        console.log("No exchange rate data found for {currency}", rates);
      }
    } else {
      console.log("Failed to fetch exchange rate from Coinbase API");
    }
  } catch (error) {
    console.log("Unable to get exchange rate", error);
  };
};

//function to get onRampExchangeRate based on the currency/rate specified
export const getOnrampExchangeRate = async (symbol: any, amount: any, rates: any) => {
  //return based on the currency specified
  try {
    const response = await axios.get(
      `https://api.coinbase.com/v2/exchange-rates?currency=${symbol}`
    );

    // Check if the response is successful
    if (response.status === 200) {
      const data = response.data;
      if (data && data.data && data.data.rates && data.data.rates[rates]) {
        const baseCoinRate: number = data.data.rates[rates];
        // Adding 5% to the baseCoinRate (Onramp adjustment)
        const adjustedRate: number = baseCoinRate * 1.05;
        // return the amount in the specified currency with the adjusted rate
        const amountInCurrencyReceived: number = amount * adjustedRate;
        return amountInCurrencyReceived;
      } else {
        console.log("No exchange rate data found for {currency}", rates);
      }
    } else {
      console.log("Failed to fetch exchange rate from Coinbase API");
    }
  } catch (error) {
    console.log("Unable to get exchange rate", error);
  }
};
//function to get OffRampExchangeRate based on currency/rate specified
export const getOfframpExchangeRate = async (symbol: any, amount: any, rates: any) => {
  //return based on the currency specified
  try {
    const response = await axios.get(
      `https://api.coinbase.com/v2/exchange-rates?currency=${symbol}`
    );

    // Check if the response is successful
    if (response.status === 200) {
      const data = response.data;
      if (data && data.data && data.data.rates && data.data.rates[rates]) {
        const baseCoinRate: number = data.data.rates[rates];
        // Reducing 5% to the baseCoinRate (Onramp adjustment)
        const adjustedRate: number = baseCoinRate * 0.95;
        // return the amount in the specified currency with the adjusted rate
        const amountInCurrencyReceived: number = amount * adjustedRate;
        return amountInCurrencyReceived;
      } else {
        console.log("No exchange rate data found for {currency}", rates);
      }
    } else {
      console.log("Failed to fetch exchange rate from Coinbase API");
    }
  } catch (error) {
    console.log("Unable to get exchange rate", error);
  }
};
