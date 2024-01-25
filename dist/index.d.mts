declare function getRealPrice(val: any): {
    price: number;
    last_updated_timestamp: Date | null;
    num_sources_aggregated: number;
};
declare function timeStampToDate(timestamp: number): Date | null;
declare const getPairPrice: (pair: string) => Promise<{
    price: number;
    last_updated_timestamp: Date | null;
    num_sources_aggregated: number;
} | undefined>;
declare const getExchangeRate: (symbol: any, amount: any) => Promise<number | undefined>;

export { getExchangeRate, getPairPrice, getRealPrice, timeStampToDate };
