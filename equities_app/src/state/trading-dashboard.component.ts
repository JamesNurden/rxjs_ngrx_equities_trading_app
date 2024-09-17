// components/trading-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadStockPrices } from '../state/trading.actions';
import { TradingState } from './trading.state';

@Component({
  selector: 'app-trading-dashboard',
  templateUrl: './trading-dashboard.component.html',
})
export class TradingDashboardComponent implements OnInit {
  stockPrices$: Observable<{ [symbol: string]: number }>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<{ trading: TradingState }>) {
    this.stockPrices$ = this.store.select(state => state.trading.stockPrices);
    this.loading$ = this.store.select(state => state.trading.loading);
    this.error$ = this.store.select(state => state.trading.error);
  }

  ngOnInit(): void {
    this.store.dispatch(loadStockPrices());
  }
}
