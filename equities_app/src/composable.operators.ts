this.stockPrices$ = this.store.select(selectAllStocks).pipe(
    combineLatest(this.selectedStock$),
    map(([stocks, selectedStock]) => {
      return stocks.find(stock => stock.symbol === selectedStock);
    })
  );
  