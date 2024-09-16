import { fromEvent, interval, of } from 'rxjs';
import { switchMap, throttleTime, retry, catchError, tap, bufferTime } from 'rxjs/operators';

// Simulating a mock API for fetching real-time market data (prices/volume)
function fetchMarketData(symbol) {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.1; // 90% chance of success
    const price = (Math.random() * 1000).toFixed(2); // Simulating random stock price
    const volume = Math.floor(Math.random() * 10000); // Simulating random volume
    setTimeout(() => {
      success ? resolve({ symbol, price, volume }) : reject(`Error fetching data for ${symbol}`);
    }, 200);
  });
}

// Simulating trade execution
function executeTrade(order) {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.2; // 80% chance of success
    setTimeout(() => {
      success ? resolve(`Trade Success: ${order}`) : reject(`Trade Failed: ${order}`);
    }, 300);
  });
}

// Real-time Market Data Stream
function marketDataStream(symbols) {
  return interval(1000).pipe(
    // Fetch market data for each symbol every second
    switchMap(() => from(symbols).pipe(
      switchMap(symbol => from(fetchMarketData(symbol)).pipe(
        retry(3), // Retry up to 3 times in case of failure
        catchError(err => of(`Failed to fetch market data: ${err}`)) // Handle error gracefully
      ))
    )),
    bufferTime(1000), // Buffer market data updates every second
    tap(bufferedData => {
      console.log('Market Data:', bufferedData);
      bufferedData.forEach(data => {
        if (data.price) {
          // Simulate displaying data in UI
          console.log(`Symbol: ${data.symbol}, Price: ${data.price}, Volume: ${data.volume}`);
        }
      });
    })
  );
}

// Order Execution Stream
function orderExecutionStream(order$) {
  return order$.pipe(
    throttleTime(500), // Throttle order execution to prevent rapid firing
    switchMap(order => from(executeTrade(order)).pipe(
      retry(2), // Retry failed orders up to 2 times
      catchError(err => of(`Failed to execute trade: ${err}`)) // Handle trade execution failure
    )),
    tap(result => {
      console.log(result); // Display trade result (success or failure)
    })
  );
}

// List of market symbols for simulation
const marketSymbols = ['AAPL', 'GOOGL', 'AMZN', 'TSLA'];

// Market data observable (simulate real-time market data)
const marketData$ = marketDataStream(marketSymbols);

// User order input observable (simulate user placing orders)
const order$ = fromEvent(document, 'click').pipe(
  tap(() => console.log('User clicked to place an order')),
  switchMap(() => of({ symbol: 'AAPL', action: 'BUY', quantity: 10 })) // Example order data
);

// Execute market data stream and order execution stream
marketData$.subscribe();
orderExecutionStream(order$).subscribe();
