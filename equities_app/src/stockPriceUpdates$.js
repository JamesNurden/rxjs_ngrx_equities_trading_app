const stockPriceUpdates$ = new Subject(); // Publisher

stockPriceUpdates$.subscribe(price => {
  console.log(`Received stock price: ${price}`);
});

stockPriceUpdates$.next(150); // Subscriber receives the update
