import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

// Observable streams for portfolio and stock data
const portfolio$ = getUserPortfolio();
const stockPrices$ = getStockPricesStream();

// Combine latest data from portfolio and stock prices
combineLatest([portfolio$, stockPrices$]).pipe(
  map(([portfolio, prices]) => calculatePortfolioValue(portfolio, prices))
).subscribe(
  portfolioValue => updatePortfolioUI(portfolioValue),
  error => console.error('Error updating portfolio:', error)
);

function calculatePortfolioValue(portfolio: any, prices: any) {
  // Calculate total portfolio value based on current stock prices
  return portfolio.reduce((total: number, stock: any) => {
    const price = prices.find((p: any) => p.symbol === stock.symbol).price;
    return total + (stock.quantity * price);
  }, 0);
}

function updatePortfolioUI(value: number) {
  console.log('Updated Portfolio Value:', value);
}
