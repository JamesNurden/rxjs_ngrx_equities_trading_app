const stockPriceStream$ = webSocket('wss://live-stock-prices.com');

stockPriceStream$.pipe(
  filter(stock => stock.symbol === 'GOOG' && stock.price > 1500),
  throttleTime(3000) // Prevents multiple alerts in a short time
).subscribe(
  stock => triggerPriceAlert(stock),
  error => console.error('Error with stock price stream:', error)
);