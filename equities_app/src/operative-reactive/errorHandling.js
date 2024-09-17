const liveData$ = webSocket('wss://live-stock-prices.com');

liveData$.pipe(
  retryWhen(errors => errors.pipe(delay(1000), take(10))),
  catchError(err => {
    console.error('Failed to reconnect:', err);
    return of(fallbackData);
  })
).subscribe(
  data => updateStockPrices(data),
  error => showErrorMessage(error)
);
