async function processTrade() {
    try {
      let result = await fetchTradeData(); // Async trade data fetching
      console.log(result);
    } catch (error) {
      console.error('Error processing trade:', error);
    }
  }
  
  processTrade();
  