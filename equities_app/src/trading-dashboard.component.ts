// components/trading-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadStockPrices } from '../state/trading.actions';
import { TradingState } from '../state/trading.state';

@Component({
  selector: 'app-trading-dashboard',
  templateUrl: './trading-dashboard.component.html',
})
export class TradingDashboardComponent implements OnInit {
  stockPrices$: Observable<{ [symbol: string]: number }>;

  constructor(private store: Store<{ trading: TradingState }>) {
    this.stockPrices$ = this.store.select(state => state.trading.stockPrices);
  }

  ngOnInit(): void {
    this.store.dispatch(loadStockPrices());
  }
}
