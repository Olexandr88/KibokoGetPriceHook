import axios from "axios";
import { useState } from "react"; 

 // state for currency rate
 const [exchangeRate, setExchangeRate] = useState<number>(0);
 const [baseCoinRate, setBaseCoin] = useState<number>(0);

 export const  getExchangeRate = async (symbol: any, amount: any) => {
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
          setExchangeRate(Number(amountInKesReceived.toFixed(2))); // convert to number and set state
          setBaseCoin(baseCoinRate);
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