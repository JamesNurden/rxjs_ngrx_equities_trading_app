import { fromEvent } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

// Button to trigger trade execution
const tradeButton = document.getElementById('trade-btn');

// Capture click events from the trade button
const tradeClick$ = fromEvent(tradeButton, 'click');

// Handle trade execution by debouncing clicks and switching to the API call
tradeClick$.pipe(
  debounceTime(300),
  switchMap(() => executeTradeAPI({
    symbol: 'CANTOR',
    orderType: 'BUY',
    quantity: 100
  }))
).subscribe(
  response => showConfirmation(response),
  error => showError(error)
);

function executeTradeAPI(orderDetails: any) {
  // Simulate an API call to execute trade
  return fetch('https://api.cantorplatform.com/trade', {
    method: 'POST',
    body: JSON.stringify(orderDetails),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json());
}

function showConfirmation(response: any) {
  console.log('Trade Executed', response);
}

function showError(error: any) {
  console.error('Trade Failed', error);
}
