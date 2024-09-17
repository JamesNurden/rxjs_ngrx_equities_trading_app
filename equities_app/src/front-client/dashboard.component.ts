// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TradingState } from '../state/trading.state';
import { loadStockPrices, executeTrade } from '../state/trading.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stockPrices$: Observable<{ [symbol: string]: number }>;
  loading$: Observable<boolean>;

  constructor(private store: Store<{ trading: TradingState }>) {
    this.stockPrices$ = this.store.select(state => state.trading.stockPrices);
    this.loading$ = this.store.select(state => state.trading.loading);
  }

  ngOnInit() {
    // Dispatch action to load stock prices
    this.store.dispatch(loadStockPrices());
  }

  onTrade(symbol: string, shares: number, price: number) {
    // Dispatch action to execute a trade
    this.store.dispatch(executeTrade({ symbol, shares, price }));
  }
}
