const stockPriceStream = webSocket('wss://live-stock-prices.com');

stockPriceStream.pipe(
  map(data => ({ symbol: data.symbol, price: data.price })),
  filter(stock => stock.symbol === 'AAPL')
).subscribe(stock => {
  updateStockPriceUI(stock);
});
