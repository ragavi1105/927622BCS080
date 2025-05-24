const BASE_URL = 'http://20.244.56.144/evaluation-service';

export interface StockPrice {
  price: number;
  lastUpdatedAt: string;
}

export const getStockPrices = async (ticker: string, minutes?: number): Promise<StockPrice[]> => {
  const url = `${BASE_URL}/stocks/${ticker}${minutes ? `?minutes=${minutes}` : ''}`;
  const response = await fetch(url);
  const data = await response.json();
  return Array.isArray(data) ? data : [data.stock];
};
