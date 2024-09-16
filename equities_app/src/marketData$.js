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