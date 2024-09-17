// state/trading.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TradingActions from './trading.actions';
import { TradingService } from '../services/trading.service';

// Example integration of triggerPriceAlert in trading.effects.ts:
@Injectable()
export class TradingEffects {
  priceAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TradingActions.stockPricesLoaded),
      map(({ prices }) => triggerPriceAlert(prices)),  // Call triggerPriceAlert
      map(alert => TradingActions.priceAlertTriggered({ alert })),
      catchError(error => of(TradingActions.loadError({ error: error.message })))
    )
  );
}

// Example in trading.effects.ts
@Injectable()
export class TradingEffects {
  executeTrade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TradingActions.executeTrade),
      switchMap(() => 
        tradeStream$.pipe(  // Subscribe to trade stream
          map(trade => TradingActions.tradeExecuted({ trade })),
          catchError(error => of(TradingActions.loadError({ error: error.message })))
        )
      )
    )
  );
}

@Injectable()
export class TradingEffects {
  // Effect for loading stock prices
  loadStockPrices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TradingActions.loadStockPrices),
      switchMap(() =>
        this.tradingService.getRealTimePrices().pipe(
          map((prices) => TradingActions.stockPricesLoaded({ prices })), // Dispatch success action
          catchError((error) => of(TradingActions.loadError({ error: error.message }))) // Dispatch error action
        )
      )
    )
  );

  constructor(private actions$: Actions, private tradingService: TradingService) {}
}
