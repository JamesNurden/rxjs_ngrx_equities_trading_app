// state/trading.actions.ts
import { createAction, props } from '@ngrx/store';
import { Trade } from './trading.state'; // Importing the Trade interface from state

// Load stock prices
export const loadStockPrices = createAction('[Trading] Load Stock Prices');

// Stock prices loaded successfully
export const stockPricesLoaded = createAction(
  '[Trading] Stock Prices Loaded',
  props<{ prices: { [symbol: string]: number } }>() // Payload for stock prices
);

// Execute a trade
export const executeTrade = createAction(
  '[Trading] Execute Trade',
  props<{ symbol: string, shares: number, price: number }>() // Payload includes trade details
);

// Trade executed successfully
export const tradeExecuted = createAction(
  '[Trading] Trade Executed',
  props<{ trade: Trade }>() // Payload includes trade object
);

// Error during loading or executing
export const loadError = createAction(
  '[Trading] Load Error',
  props<{ error: string }>() // Error payload
);
