import axios from "axios";
import { useEffect } from "react";
import { CairoCustomEnum, Contract } from "starknet";
import PRAGMA_ABI, { PRAGMA_CONTRACT_ADDRESS } from "./pragmaabi";
import { BigNumber } from "bignumber.js";

// Define types
type RealPrice = {
  price: number;
  last_updated_timestamp: Date | null;
  num_sources_aggregated: number;
};

type RatesData = {
  decimals: number;
  last_updated_timestamp: number;
  price: string;
  num_sources_aggregated: number;
};

const pragma_contract = new Contract(PRAGMA_ABI, PRAGMA_CONTRACT_ADDRESS);

// Helper functions

// Function to fetch rates data
const fetchRatesData = async (
  fromCurrency: string,
  toCurrency: string,
  numberOfTokens: number | string
): Promise<void> => {
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
    console.log(amountInCurrencyReceived); // Do something with the result
  } catch (error) {
    console.error("Error fetching exchange rates", error);
  }
};

// Call fetchRatesData inside useEffect
useEffect(() => {
  fetchRatesData("STRK", "USDT", 0); // Initial call with default values
}, []); // Empty dependency array means this effect runs once after the component mounts

// Real Function to be called by users

// Converts hexa to readable result
export function getRealPrice(val: RatesData): RealPrice {
  let decimals = BigNumber(val.decimals).toNumber();
  let ts = BigNumber(val.last_updated_timestamp).toNumber();
  let real_price: RealPrice = {
    price: BigNumber(val.price).dividedBy(10 ** decimals).toNumber(),
    last_updated_timestamp: timeStampToDate(ts),
    num_sources_aggregated: BigNumber(val.num_sources_aggregated).toNumber(),
  };
  return real_price;
}

// Converts u64 to readable time
export function timeStampToDate(timestamp: number): Date | null {
  if (!timestamp) return null;
  const timestampInMilliseconds = timestamp * 1000;
  const date = new Date(timestampInMilliseconds);
  return date;
}

// User can call this
export const getPairPrice = async (pair: string): Promise<RealPrice | void> => {
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
  return undefined; // Return undefined instead of null
};

// Function to get exchange rate based on currency specified by user
export const getCurrencyExchangeRate = async (
  fromCurrency: string,
  toCurrency: string,
  amount: number
): Promise<number | void> => {
  try {
    const response = await axios.get(
      `https://api.coinbase.com/v2/exchange-rates?currency=${fromCurrency}`
    );

    // Check if the response is successful
    if (response.status === 200) {
      const data = response.data;
      if (
        data &&
        data.data &&
        data.data.rates &&
        data.data.rates[toCurrency]
      ) {
        const baseCoinRate = data.data.rates[toCurrency];
        const amountInCurrencyReceived = amount * baseCoinRate;
        return amountInCurrencyReceived;
      } else {
        console.log(`No exchange rate data found for ${toCurrency}`);
      }
    } else {
      console.log("Failed to fetch exchange rate from Coinbase API");
    }
  } catch (error) {
    console.log("Unable to get exchange rate", error);
  }
};

// Other functions...

//function to get onRampCurrencyExchangeRate based on the currency/rate specified
export const getOnrampCurrencyExchangeRate = async (
  fromCurrency: string,
  toCurrency: string,
  amount: number
): Promise<number | void> => {
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
): Promise<number | void> => {
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
export const getOnrampExchangeRateIn = async (
  symbol: any,
  amount: any
): Promise<number | void> => {
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
export const getOffRampExchangeRateIn = async (
  symbol: any,
  amount: any
): Promise<number | void> => {
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
