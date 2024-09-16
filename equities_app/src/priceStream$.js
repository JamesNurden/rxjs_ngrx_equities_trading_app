const priceStream$ = webSocket('wss://price-stream.com');

priceStream$.pipe(
  bufferTime(1000), // Group price changes over a 1-second interval
  map(prices => calculateTradingStrategy(prices)),
  switchMap(tradeStrategy => executeTrade(tradeStrategy))
).subscribe(
  tradeResult => logTradeResult(tradeResult),
  error => logError(error)
);
