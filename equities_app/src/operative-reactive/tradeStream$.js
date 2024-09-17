// tradeStream$.js
const { of, interval } = require('rxjs');
const { map } = require('rxjs/operators');

function tradeStream() {
  return interval(1000).pipe(map(() => ({
    symbol: 'AAPL',
    shares: Math.floor(Math.random() * 100),
    price: 150 + Math.random() * 10
  })));
}

module.exports = { tradeStream };

const tradeStream$ = new Subject(); // Stream of trades

tradeStream$.pipe(
  throttleTime(1000) // Limit the number of trades processed per second
).subscribe(trade => {
  console.log(`Processing trade: ${trade}`);
});

tradeStream$.next('Trade 1');
tradeStream$.next('Trade 2');
tradeStream$.next('Trade 3'); // Only Trade 1 and Trade 3 will be processed
