const stockPrices$ = getStockPrices();
const portfolioMetrics$ = getPortfolioMetrics();
const marketNews$ = getMarketNews();

combineLatest([stockPrices$, portfolioMetrics$, marketNews$])
  .subscribe(([prices, metrics, news]) => {
    updateDashboard(prices, metrics, news);
  });
