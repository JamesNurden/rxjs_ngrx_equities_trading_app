// state/trading.reducer.ts
import { createReducer, on, Action } from '@ngrx/store';
import * as TradingActions from './trading.actions';
import { initialTradingState, TradingState } from './trading.state';
import { Trade } from './trading.state';

import { createReducer, on, Action } from '@ngrx/store';
import * as TradingActions from './trading.actions';
import { initialTradingState, TradingState } from './trading.state';

// Import the executeTrade function from executeTrade$.js
const { executeTrade } = require('../path/to/executeTrade$');

const tradingReducer = createReducer(
  initialTradingState,
  
  // Handle stock prices loaded
  on(TradingActions.stockPricesLoaded, (state, { prices }) => ({
    ...state,
    stockPrices: prices,
    loading: false
  })),
  
  // Handle trade execution
  on(TradingActions.tradeExecuted, (state, { trade }) => ({
    ...state,
    tradeHistory: [...state.tradeHistory, trade]
  })),

  // Handle errors
  on(TradingActions.loadError, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Set loading to true when fetching stock prices
  on(TradingActions.loadStockPrices, (state) => ({
    ...state,
    loading: true,
    error: null
  }))
);

// Export the reducer function
export function reducer(state: TradingState | undefined, action: Action) {
  return tradingReducer(state, action);
}


const tradingReducer = createReducer(
  initialTradingState,
  // Handle stock prices loaded
  on(TradingActions.stockPricesLoaded, (state, { prices }) => ({
    ...state,
    stockPrices: prices,
    loading: false
  })),
  // Handle trade execution
  on(TradingActions.executeTrade, (state, { symbol, shares, price }) => {
    const updatedShares = (state.portfolio[symbol]?.shares || 0) + shares;
    const avgPrice = price;

    return {
      ...state,
      portfolio: {
        ...state.portfolio,
        [symbol]: {
          shares: updatedShares,
          avgPrice
        }
      },
      tradeHistory: [
        ...state.tradeHistory,
        { symbol, shares, price, timestamp: new Date() }
      ]
    };
  }),
  // Handle errors
  on(TradingActions.loadError, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  // Set loading to true when fetching stock prices
  on(TradingActions.loadStockPrices, (state) => ({
    ...state,
    loading: true,
    error: null
  }))
);

// Exporting the reducer function
export function reducer(state: TradingState | undefined, action: Action) {
  return tradingReducer(state, action);
}

// trading.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as TradingActions from './trading.actions';
import { initialTradingState, TradingState } from './trading.state';
import { executeTrade } from '../path/to/executeTrade$';  // Adjust path

import { createReducer, on, Action } from '@ngrx/store';
import * as TradingActions from './trading.actions';
import { initialTradingState, TradingState } from './trading.state';

// Reducer to handle stock price updates
const tradingReducer = createReducer(
  initialTradingState,
  on(TradingActions.stockPricesLoaded, (state, { prices }) => ({
    ...state,
    stockPrices: prices,  // Update the stock prices in the state
    loading: false
  })),
  on(TradingActions.loadError, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);

// Exporting the reducer function
export function reducer(state: TradingState | undefined, action: Action) {
  return tradingReducer(state, action);
}

const tradingReducer = createReducer(
  initialTradingState,
  on(TradingActions.tradeExecuted, (state, { trade }) => ({
    ...state,
    tradeHistory: [...state.tradeHistory, trade]
  }))
);

// trading.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as TradingActions from './trading.actions';
import { initialTradingState, TradingState } from './trading.state';

const tradingReducer = createReducer(
  initialTradingState,
  
  // Handle loading stock prices
  on(TradingActions.loadStockPrices, (state) => ({
    ...state,
    loading: true, // Set loading to true when fetching stock prices
    error: null,
  })),
  
  // Handle stock prices loaded
  on(TradingActions.stockPricesLoaded, (state, { prices }) => ({
    ...state,
    stockPrices: prices, // Update state with loaded stock prices
    loading: false,  // Reset loading to false once done
  }))
);

export function reducer(state: TradingState | undefined, action: Action) {
  return tradingReducer(state, action);
}

// trading.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as TradingActions from './trading.actions';
import { initialTradingState, TradingState } from './trading.state';

const tradingReducer = createReducer(
  initialTradingState,
  
  // Handle loading trade history
  on(TradingActions.loadTradeHistory, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  // Handle trade history loaded
  on(TradingActions.tradeHistoryLoaded, (state, { tradeHistory }) => ({
    ...state,
    tradeHistory,  // Update state with the loaded trade history
    loading: false,
  }))
);

export function reducer(state: TradingState | undefined, action: Action) {
  return tradingReducer(state, action);
}
