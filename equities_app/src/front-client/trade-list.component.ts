// trade-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TradingState, Trade } from '../state/trading.state';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.css']
})
export class TradeListComponent implements OnInit {
  tradeHistory$: Observable<Trade[]>;

  constructor(private store: Store<{ trading: TradingState }>) {
    this.tradeHistory$ = this.store.select(state => state.trading.tradeHistory);
  }

  ngOnInit() {}
}
