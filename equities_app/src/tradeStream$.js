const tradeStream$ = new Subject(); // Stream of trades

tradeStream$.pipe(
  throttleTime(1000) // Limit the number of trades processed per second
).subscribe(trade => {
  console.log(`Processing trade: ${trade}`);
});

tradeStream$.next('Trade 1');
tradeStream$.next('Trade 2');
tradeStream$.next('Trade 3'); // Only Trade 1 and Trade 3 will be processed
