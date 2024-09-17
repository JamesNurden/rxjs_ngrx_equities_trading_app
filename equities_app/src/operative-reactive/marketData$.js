import { webSocket } from 'rxjs/webSocket';
import { map, filter, debounceTime } from 'rxjs/operators';

// WebSocket to get live data stream
const marketData$ = webSocket('wss://marketdata.cantorplatform.com');

marketData$.pipe(
  debounceTime(300), // Delay to avoid overloading UI
  filter(data => data.type === 'stock' && data.symbol === 'CANTOR'), // Filter only specific stock data
  map(data => ({ symbol: data.symbol, price: data.price, volume: data.volume }))
).subscribe(
  stock => updateUI(stock),
  error => console.error('Error fetching market data', error)
);

function updateUI(stock: any) {
  // Code to update the trading dashboard with the latest stock price
  console.log(`Stock: ${stock.symbol}, Price: ${stock.price}, Volume: ${stock.volume}`);
}

// marketData$.js
const { interval } = require('rxjs');
const { map } = require('rxjs/operators');

// Simulate a market data stream that emits stock prices every second
function marketData$() {
  return interval(1000).pipe(
    map(() => ({
      AAPL: 150 + Math.random() * 10,
      GOOGL: 2800 + Math.random() * 50,
      MSFT: 300 + Math.random() * 5
    }))
  );
}

module.exports = { marketData$ };
