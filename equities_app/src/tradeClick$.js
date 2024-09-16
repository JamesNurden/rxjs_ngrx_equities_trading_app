const tradeClick$ = fromEvent(tradeButton, 'click');

tradeClick$.pipe(
  debounceTime(300), // Avoid duplicate clicks
  switchMap(() => executeTradeAPI(orderData))
).subscribe(
  response => showTradeConfirmation(response),
  error => showErrorMessage(error)
);
