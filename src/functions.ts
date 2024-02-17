import axios from "axios";
import { useEffect } from "react";
import { BigNumber } from "bignumber.js";
import { Contract } from "starknet";
import { CairoCustomEnum } from "starknet";
import  PRAGMA_ABI, { PRAGMA_CONTRACT_ADDRESS } from "./pragmaabi";

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

const fetchRatesData = async (
  fromCurrency: string,
  toCurrency: string,
  numberOfTokens: number | string
): Promise<void> => {
  try {
    const tokens =
      typeof numberOfTokens === "number"
        ? numberOfTokens
        : parseFloat(numberOfTokens);
    const amountInCurrencyReceived = await getCurrencyExchangeRate(
      fromCurrency,
      toCurrency,
      tokens
    );
    console.log(amountInCurrencyReceived);
  } catch (error) {
    console.error("Error fetching exchange rates", error);
  }
};

export const useCurrencyExchange = (
  fromCurrency: string,
  toCurrency: string,
  numberOfTokens: number | string
): void => {
  useEffect(() => {
    fetchRatesData(fromCurrency, toCurrency, numberOfTokens);
  }, [fromCurrency, toCurrency, numberOfTokens]);
};

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

export function timeStampToDate(timestamp: number): Date | null {
  if (!timestamp) return null;
  const timestampInMilliseconds = timestamp * 1000;
  const date = new Date(timestampInMilliseconds);
  return date;
}

export const getPairPrice = async (
  pair: string
): Promise<RealPrice | void> => {
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
  return undefined;
};

export const getCurrencyExchangeRate = async (
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
        const adjustedRate: number = baseCoinRate * 1.05;
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
        const adjustedRate: number = baseCoinRate * 0.95;
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

export const getOnrampExchangeRateIn = async (
  symbol: any,
  amount: any
): Promise<number | void> => {
  try {
    const response = await axios.get(
      `https://api.coinbase.com/v2/exchange-rates?currency=${symbol}`
    );
    if (response.status === 200) {
      const data = response.data;
      if (data && data.data && data.data.rates && data.data.rates["KES"]) {
        const baseCoinRate: number = data.data.rates["KES"];
        const adjustedRate: number = baseCoinRate * 1.05;
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

export const getOffRampExchangeRateIn = async (
  symbol: any,
  amount: any
): Promise<number | void> => {
  try {
    const response = await axios.get(
      `https://api.coinbase.com/v2/exchange-rates?currency=${symbol}`
    );
    if (response.status === 200) {
      const data = response.data;
      if (data && data.data && data.data.rates && data.data.rates["KES"]) {
        const baseCoinRate: number = data.data.rates["KES"];
        const adjustedRate: number = baseCoinRate * 0.95;
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
