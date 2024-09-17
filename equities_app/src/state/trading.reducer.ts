// state/trading.reducer.ts
import { createReducer, on, Action } from '@ngrx/store';
import * as TradingActions from './trading.actions';
import { initialTradingState, TradingState } from './trading.state';
import { Trade } from './trading.state';

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
