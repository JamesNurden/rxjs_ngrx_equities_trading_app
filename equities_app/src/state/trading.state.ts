// state/trading.state.ts
export interface TradingState {
  stockPrices: { [symbol: string]: number };
  portfolio: { [symbol: string]: { shares: number, avgPrice: number } };
  tradeHistory: Trade[];
  error: string | null;
  loading: boolean;
}

export interface Trade {
  symbol: string;
  shares: number;
  price: number;
  timestamp: Date;
}

export const initialTradingState: TradingState = {
  stockPrices: {},
  portfolio: {},
  tradeHistory: [],
  error: null,
  loading: false,
};
