// state/trading.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TradingActions from './trading.actions';
import { TradingService } from '../services/trading.service';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TradingActions from './trading.actions';
import { TradingService } from '../services/trading.service';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TradingActions from './trading.actions';

// Import the marketData$ stream
const { marketData$ } = require('../path/to/marketData$');

@Injectable()
export class TradingEffects {
  loadStockPrices$ = createEffect(() =>
    marketData$().pipe(
      map(prices => TradingActions.stockPricesLoaded({ prices })),
      catchError(error => of(TradingActions.loadError({ error: error.message })))
    )
  );

  constructor(private actions$: Actions) {}
}

// Import the tradeStream function from tradeStream$.js
const { tradeStream } = require('../path/to/tradeStream$');

@Injectable()
export class TradingEffects {
  // Effect to load trade data from tradeStream$
  loadTradeStream$ = createEffect(() =>
    tradeStream().pipe( // Use tradeStream$ function
      map(tradeData => TradingActions.tradeExecuted({ trade: tradeData })),
      catchError(error => of(TradingActions.loadError({ error: error.message })))
    )
  );

  constructor(
    private actions$: Actions,
    private tradingService: TradingService
  ) {}
}

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

// trading.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TradingActions from './trading.actions';
import { TradingService } from '../services/trading.service';
import { tradeStream } from '../path/to/tradeStream$';  // Adjust the path to your .js file

@Injectable()
export class TradingEffects {
  loadTradeStream$ = createEffect(() =>
    tradeStream().pipe(  // Call the function from the imported JS file
      map((tradeData) => TradingActions.tradeExecuted({ trade: tradeData })),
      catchError((error) => of(TradingActions.loadError({ error: error.message })))
    )
  );

  constructor(
    private actions$: Actions,
    private tradingService: TradingService
  ) {}
}

@Injectable()
export class TradingEffects {
  loadStockPrices$ = createEffect(() =>
    marketData$().pipe(
      map(prices => TradingActions.stockPricesLoaded({ prices })), // Dispatch stockPricesLoaded action
      catchError(error => of(TradingActions.loadError({ error: error.message })))
    )
  );

  constructor(private actions$: Actions) {}
}
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TradingActions from './trading.actions'; // Import actions
import { TradingService } from '../services/trading.service'; // Import service
import { marketData$ } from '../path/to/marketData$.js'; // Import JS stream

@Injectable()
export class TradingEffects {

  // Effect to load market data
  loadMarketData$ = createEffect(() =>
    marketData$.pipe(  // Stream from JS file
      map((data) => TradingActions.stockPricesLoaded({ prices: data })),
      catchError((error) => of(TradingActions.loadError({ error: error.message })))
    )
  );

  constructor(
    private actions$: Actions,
    private tradingService: TradingService
  ) {}
}

// trading.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TradingActions from './trading.actions';
import { TradeService } from '../services/trade.service';

@Injectable()
export class TradingEffects {
  
  loadStockPrices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TradingActions.loadStockPrices),
      switchMap(() =>
        this.tradeService.getRealTimePrices().pipe(
          map((prices) => TradingActions.stockPricesLoaded({ prices })),
          catchError((error) => of(TradingActions.loadError({ error: error.message })))
        )
      )
    )
  );
  
  loadTradeHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TradingActions.loadTradeHistory),
      switchMap(() =>
        this.tradeService.getTradeHistory().pipe(
          map((tradeHistory) => TradingActions.tradeHistoryLoaded({ tradeHistory })),
          catchError((error) => of(TradingActions.loadError({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private tradeService: TradeService) {}
}
