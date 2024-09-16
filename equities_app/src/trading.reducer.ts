// state/trading.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as TradingActions from './trading.actions';
import { initialTradingState, TradingState } from './trading.state';

const tradingReducer = createReducer(
  initialTradingState,
  on(TradingActions.stockPricesLoaded, (state, { prices }) => ({
    ...state,
    stockPrices: prices,
    loading: false
  })),
  on(TradingActions.executeTrade, (state, { symbol, shares, price }) => ({
    ...state,
    portfolio: {
      ...state.portfolio,
      [symbol]: {
        shares: (state.portfolio[symbol]?.shares || 0) + shares,
        avgPrice: price
      }
    },
    tradeHistory: [
      ...state.tradeHistory,
      { symbol, shares, price, timestamp: new Date() }
    ]
  })),
  on(TradingActions.loadError, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(TradingActions.loadStockPrices, state => ({
    ...state,
    loading: true,
    error: null
  }))
);

export function reducer(state: TradingState | undefined, action: Action) {
  return tradingReducer(state, action);
}
