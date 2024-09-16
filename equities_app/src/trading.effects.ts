// state/trading.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TradingActions from './trading.actions';
import { TradingService } from '../services/trading.service';

@Injectable()
export class TradingEffects {
  loadStockPrices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TradingActions.loadStockPrices),
      switchMap(() =>
        this.tradingService.getRealTimePrices().pipe(
          map(prices => TradingActions.stockPricesLoaded({ prices })),
          catchError(error => of(TradingActions.loadError({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private tradingService: TradingService
  ) {}
}
