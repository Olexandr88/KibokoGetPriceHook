
// Example: Generating pairs programmatically
const currencies = ['ETH', 'BTC', 'LTC', 'XRP'];
export const PAIRS: string[] = currencies.map(currency => `${currency}/USD`);
