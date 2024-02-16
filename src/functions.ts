import axios from "axios";
import { useState, useEffect } from "react";
import { CairoCustomEnum, Contract } from "starknet";
import PRAGMA_ABI, { PRAGMA_CONTRACT_ADDRESS } from "./pragmaabi";
import { BigNumber } from "bignumber.js";

const pragma_contract = new Contract(PRAGMA_ABI, PRAGMA_CONTRACT_ADDRESS);

//helper functions
const [fromCurrency, setFromCurrency] = useState<string>("STRK");
const [toCurrency, setToCurrency] = useState<string>("USDT");
const [numberOfTokens, setNumberOfTokens] = useState<number | "">(0);
const [amountToReceive, setAmountToReceive] = useState<string>("");


useEffect(() => {
  const fetchRatesData = async () => {
    try {
      const tokens =
        typeof numberOfTokens === "number"
          ? numberOfTokens
          : parseFloat(numberOfTokens); // Convert numberOfTokens to number
      const amountInCurrencyReceived = await getCurrencyExchangeRate(
        fromCurrency,
        toCurrency,
        tokens
      );
      setAmountToReceive(String(amountInCurrencyReceived));
    } catch (error) {
      console.error("Error fetching exchange rates", error);
    }
  };
  fetchRatesData();
}, [fromCurrency, toCurrency, numberOfTokens]); // Watch for changes in fromCurrency, toCurrency, and numberOfTokens

//REal Function to be called byusers
async function getCurrencyExchangeRate(
  fromCurrency: string,
  toCurrency: string,
  amount: number
) {
  try {
    const response = await axios.get(
      `https://api.coinbase.com/v2/exchange-rates?currency=${fromCurrency}`
    );
    if (response.status === 200) {
      const data = response.data;
      if (data && data.data && data.data.rates && data.data.rates[toCurrency]) {
        const baseCoinRate: number = data.data.rates[toCurrency];
        const amountInCurrencyReceived: number = amount * baseCoinRate;
        return amountInCurrencyReceived;
      } else {
        console.log("No exchange rate data found for", toCurrency);
      }
    } else {
      console.log("Failed to fetch exchange rate from Coinbase API");
    }
  } catch (error) {
    console.log("Unable to get exchange rate", error);
  }
}
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

//function to get onRampCurrencyExchangeRate based on the currency/rate specified
export const getOnrampCurrencyExchangeRate = async (
  fromCurrency: string,
  toCurrency: string,
  amount: number
) => {
  try {
    const response = await axios.get(
      `https://api.coinbase.com/v2/exchange-rates?currency=${fromCurrency}`
    );
    if (response.status === 200) {
      const data = response.data;
      if (data && data.data && data.data.rates && data.data.rates[toCurrency]) {
        const baseCoinRate: number = data.data.rates[toCurrency];
        // Adding 5% to the baseCoinRate (Onramp adjustment)
        const adjustedRate: number = baseCoinRate * 1.05;
        // Calculate the amount in the specified currency with the adjusted rate
        const amountInCurrencyReceived: number = amount * adjustedRate;
        return amountInCurrencyReceived;
      } else {
        console.log("No exchange rate data found for", toCurrency);
      }
    } else {
      console.log("Failed to fetch exchange rate from Coinbase API");
    }
  } catch (error) {
    console.log("Unable to get exchange rate", error);
  }
};

//function to get OffRampCurrencyExchangeRate based on currency/rate specified
export const getOfframpCurrencyExchangeRate = async (
  fromCurrency: string,
  toCurrency: string,
  amount: number
) => {
  try {
    const response = await axios.get(
      `https://api.coinbase.com/v2/exchange-rates?currency=${fromCurrency}`
    );
    if (response.status === 200) {
      const data = response.data;
      if (data && data.data && data.data.rates && data.data.rates[toCurrency]) {
        const baseCoinRate: number = data.data.rates[toCurrency];
        // Reducing 5% to the baseCoinRate (Offramp adjustment)
        const adjustedRate: number = baseCoinRate * 0.95;
        // Calculate the amount in the specified currency with the adjusted rate
        const amountInCurrencyReceived: number = amount * adjustedRate;
        return amountInCurrencyReceived;
      } else {
        console.log("No exchange rate data found for", toCurrency);
      }
    } else {
      console.log("Failed to fetch exchange rate from Coinbase API");
    }
  } catch (error) {
    console.log("Unable to get exchange rate", error);
  }
};

//function to get OnRampExchangeRate in KES
export const getOnrampExchangeRateIn= async (symbol: any, amount: any) => {
  // Return based on the currency specified
  try {
    const response = await axios.get(
      `https://api.coinbase.com/v2/exchange-rates?currency=${symbol}`
    );

    // Check if the response is successful
    if (response.status === 200) {
      const data = response.data;
      if (data && data.data && data.data.rates && data.data.rates["KES"]) {
        const baseCoinRate: number = data.data.rates["KES"];
        // Adding 5% to the baseCoinRate (Onramp adjustment)
        const adjustedRate: number = baseCoinRate * 1.05;
        // Return the amount in KES with the adjusted rate
        const amountInKES: number = amount * adjustedRate;
        return amountInKES;
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
//function to get OffRampExchangeRate in KES
export const getOffRampExchangeRateIn= async (symbol: any, amount: any) => {
  // Return based on the currency specified
  try {
    const response = await axios.get(
      `https://api.coinbase.com/v2/exchange-rates?currency=${symbol}`
    );
    // Check if the response is successful
    if (response.status === 200) {
      const data = response.data;
      if (data && data.data && data.data.rates && data.data.rates["KES"]) {
        const baseCoinRate: number = data.data.rates["KES"];
        // Subtracting 5% from the baseCoinRate (OffRamp adjustment)
        const adjustedRate: number = baseCoinRate * 0.95;
        // Return the amount in KES with the adjusted rate
        const amountInKES: number = amount * adjustedRate;
        return amountInKES;
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
