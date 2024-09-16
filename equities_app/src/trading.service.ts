// services/trading.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TradingService {
  private apiUrl = 'https://api.example.com/prices'; // hypothetical API URL

  constructor(private http: HttpClient) {}

  getRealTimePrices(): Observable<{ [symbol: string]: number }> {
    return this.http.get<{ [symbol: string]: number }>(this.apiUrl);
  }
}
