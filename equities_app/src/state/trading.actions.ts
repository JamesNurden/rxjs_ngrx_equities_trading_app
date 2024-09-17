// state/trading.actions.ts
import { createAction, props } from '@ngrx/store';
import { Trade } from './trading.state'; // Importing the Trade interface from state

import { createAction, props } from '@ngrx/store';
import { Trade } from './trading.state';

// Import marketData$ from the JS file
const { marketData$ } = require('../path/to/marketData$');

// Dispatch an action to update stock prices when new data arrives
marketData$().subscribe(prices => {
  stockPricesLoaded({ prices }); // Dispatch action
});

// Load stock prices action
export const loadStockPrices = createAction('[Trading] Load Stock Prices');

// Stock prices loaded
export const stockPricesLoaded = createAction(
  '[Trading] Stock Prices Loaded',
  props<{ prices: { [symbol: string]: number } }>()
);

// Execute a trade
export const executeTrade = createAction(
  '[Trading] Execute Trade',
  props<{ symbol: string, shares: number, price: number }>()
);

// Trade executed action
export const tradeExecuted = createAction(
  '[Trading] Trade Executed',
  props<{ trade: Trade }>()
);

// Load error action
export const loadError = createAction(
  '[Trading] Load Error',
  props<{ error: string }>()
);

// Handle trade click (import from tradeClick$.js)
const { tradeClick } = require('../path/to/tradeClick$');
export const tradeClickAction = createAction('[Trading] Trade Clicked');


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

// trading.actions.ts
import { createAction, props } from '@ngrx/store';
import { tradeClick } from '../path/to/tradeClick$';  // Adjust path

export const tradeClickAction = createAction('[Trading] Trade Clicked');

// trading.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadStockPrices = createAction('[Trading] Load Stock Prices'); // Action for loading prices
export const stockPricesLoaded = createAction(
  '[Trading] Stock Prices Loaded',
  props<{ prices: { [symbol: string]: number } }>() // Action with payload to load stock prices
);

// trading.actions.ts
export const loadTradeHistory = createAction('[Trading] Load Trade History'); // Action to load trade history
export const tradeHistoryLoaded = createAction(
  '[Trading] Trade History Loaded',
  props<{ tradeHistory: Trade[] }>() // Action to update trade history in the store
);
