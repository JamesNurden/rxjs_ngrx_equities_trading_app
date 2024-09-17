function topKStocks(prices, k) {
    let heap = [];
    for (let price of prices) {
      heap.push(price);
      heap.sort((a, b) => b - a); // Max-Heap
      if (heap.length > k) heap.pop();
    }
    return heap;
  }
  
  console.log(topKStocks([120, 130, 125, 150, 140], 3)); // Output: [150, 140, 130]
  