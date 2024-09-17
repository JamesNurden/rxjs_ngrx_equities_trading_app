// tradeClick$.js
const { of, interval } = require('rxjs');
const { map } = require('rxjs/operators');

function tradeClick() {
  return interval(1000).pipe(map(() => ({
    symbol: 'AAPL',
    shares: Math.floor(Math.random() * 100),
    price: 150 + Math.random() * 10
  })));
}

module.exports = { tradeClick };

const tradeClick$ = fromEvent(tradeButton, 'click');

tradeClick$.pipe(
  debounceTime(300), // Avoid duplicate clicks
  switchMap(() => executeTradeAPI(orderData))
).subscribe(
  response => showTradeConfirmation(response),
  error => showErrorMessage(error)
);
