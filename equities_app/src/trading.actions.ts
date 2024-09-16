// state/trading.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadStockPrices = createAction('[Trading] Load Stock Prices');
export const stockPricesLoaded = createAction(
  '[Trading] Stock Prices Loaded',
  props<{ prices: { [symbol: string]: number } }>()
);
export const executeTrade = createAction(
  '[Trading] Execute Trade',
  props<{ symbol: string, shares: number, price: number }>()
);
export const tradeExecuted = createAction(
  '[Trading] Trade Executed',
  props<{ trade: Trade }>()
);
export const loadError = createAction(
  '[Trading] Load Error',
  props<{ error: string }>()
);
