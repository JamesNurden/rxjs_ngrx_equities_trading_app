function maxSlidingWindow(prices, k) {
    let deque = [], result = [];
    for (let i = 0; i < prices.length; i++) {
      if (deque.length && deque[0] <= i - k) deque.shift();
      while (deque.length && prices[deque[deque.length - 1]] <= prices[i]) deque.pop();
      deque.push(i);
      if (i >= k - 1) result.push(prices[deque[0]]);
    }
    return result;
  }
  
  console.log(maxSlidingWindow([120, 130, 125, 150, 140], 3)); // Output: [130, 150, 150]
  