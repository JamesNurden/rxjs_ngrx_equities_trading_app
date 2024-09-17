import { webSocket } from 'rxjs/webSocket';
import { retryWhen, delay, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const marketData$ = webSocket('wss://marketdata.cantorplatform.com');

marketData$.pipe(
  retryWhen(errors => errors.pipe(delay(2000), take(5))), // Retry 5 times with delay
  catchError(err => {
    console.error('Market data stream failed:', err);
    return of([]); // Return empty array on failure
  })
).subscribe(
  data => updateMarketData(data),
  error => console.error('Stream permanently failed:', error)
);

function updateMarketData(data: any) {
  console.log('Market Data:', data);
}
