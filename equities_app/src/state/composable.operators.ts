// state/composable.operators.ts

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectAllStocks, selectedStock$ } from './trading.selectors'; // Make sure to have these selectors implemented in a separate file.

export const stockPrices$ = this.store.select(selectAllStocks).pipe(
  combineLatest(this.selectedStock$),
  map(([stocks, selectedStock]) => stocks.find(stock => stock.symbol === selectedStock))
);
