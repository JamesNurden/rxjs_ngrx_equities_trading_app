const stockPrices = {
    AAPL: 150,
    MSFT: 200,
    TSLA: 700
  };
  
  console.log(stockPrices['AAPL']); // Output: 150
  
  stockPrices['AAPL'] = 160; // Update stock price
  console.log(stockPrices['AAPL']); // Output: 160

  const stockPrices$ = new Subject(); // Producer

stockPrices$.pipe(
  bufferTime(1000), // Batch stock prices every second
  filter(prices => prices.length > 0) // Only act if there are prices
).subscribe(prices => {
  console.log('Processing batch of stock prices:', prices); // Consumer
});

stockPrices$.next(150);
stockPrices$.next(152);
stockPrices$.next(148);
