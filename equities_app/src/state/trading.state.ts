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

// trading.state.ts
export interface TradingState {
  stockPrices: { [symbol: string]: number };  // Add stockPrices to the state
  loading: boolean;
  error: string | null;
  // ... other existing properties
}

export const initialTradingState: TradingState = {
  stockPrices: {},  // Initialize with an empty object
  loading: false,
  error: null,
  // ... other initial state values
};

// trading.state.ts
export interface TradingState {
  stockPrices: { [symbol: string]: number };
  tradeHistory: Trade[]; // Add tradeHistory to the state
  loading: boolean;
  error: string | null;
}

export const initialTradingState: TradingState = {
  stockPrices: {},
  tradeHistory: [], // Initialize trade history as an empty array
  loading: false,
  error: null,
};

// Example selector in trading.state.ts
export const selectTradeDetails = (state: TradingState, symbol: string) => 
  state.tradeHistory.find(trade => trade.symbol === symbol);
