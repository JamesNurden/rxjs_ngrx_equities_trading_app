// services/trade.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  private apiUrl = 'https://api.example.com/trades';

  constructor(private http: HttpClient) {}

  getRealTimePrices(): Observable<{ [symbol: string]: number }> {
    return this.http.get<{ [symbol: string]: number }>(`${this.apiUrl}/prices`);
  }

  executeTrade(symbol: string, shares: number, price: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/execute`, { symbol, shares, price });
  }
}
