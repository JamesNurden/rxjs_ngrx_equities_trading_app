// services/trading.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Importing a JS file into TS
import { stockPriceStream } from '../equities_app/src/priceStream$';  // Adjust the path

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as TradingActions from '../state/trading.actions';

// Import marketData$ from the JS file
const { marketData$ } = require('../path/to/marketData$');

@Injectable({ providedIn: 'root' })
export class TradingService {
  private apiUrl = 'https://api.example.com/prices'; // Hypothetical API URL

  constructor(private http: HttpClient, private store: Store) {
    // Subscribe to marketData$ and dispatch the stockPricesLoaded action
    marketData$().subscribe(prices => {
      this.store.dispatch(TradingActions.stockPricesLoaded({ prices })); // Dispatch action
    });
  }

  // If you still need to fetch prices using HTTP
  getRealTimePrices(): Observable<{ [symbol: string]: number }> {
    return this.http.get<{ [symbol: string]: number }>(this.apiUrl);
  }
}

@Injectable({ providedIn: 'root' })
export class TradingService {
  getRealTimePrices(): Observable<{ [symbol: string]: number }> {
    return stockPriceStream();  // Use the imported function from .js file
  }
}

// Example in trading.service.ts:
import { aggregateData } from '../equities_app/src/aggregate';

@Injectable({ providedIn: 'root' })
export class TradingService {
  getAggregatedPrices(): Observable<{ [symbol: string]: number }> {
    return this.getRealTimePrices().pipe(
      map(prices => aggregateData(prices))  // Apply aggregation
    );
  }
}

// Example in trading.service.ts:
import { from } from 'rxjs';
import { stockPriceStream } from '../equities_app/src/priceStream$'; // Assuming it's in services

@Injectable({ providedIn: 'root' })
export class TradingService {
  getRealTimePrices(): Observable<{ [symbol: string]: number }> {
    return from(stockPriceStream());  // Replace API call with the stream
  }
}

import { marketData$ } from '../equities_app/src/priceStream$';

@Injectable({ providedIn: 'root' })
export class TradingService {
  private apiUrl = 'https://api.example.com/prices'; // Hypothetical API URL

  constructor(private http: HttpClient) {}

  // Fetch real-time prices from the API
  getRealTimePrices(): Observable<{ [symbol: string]: number }> {
    return this.http.get<{ [symbol: string]: number }>(this.apiUrl);
  }
}

// trade.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trade } from '../state/trading.state';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  private apiUrl = 'https://api.example.com/trades';

  constructor(private http: HttpClient) {}

  getRealTimePrices(): Observable<{ [symbol: string]: number }> {
    return this.http.get<{ [symbol: string]: number }>(`${this.apiUrl}/prices`);
  }

  getTradeHistory(): Observable<Trade[]> {
    return this.http.get<Trade[]>(`${this.apiUrl}/history`);  // New method to fetch trade history
  }

  executeTrade(symbol: string, shares: number, price: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/execute`, { symbol, shares, price });
  }
}
