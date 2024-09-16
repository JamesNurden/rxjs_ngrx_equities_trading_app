class Stack {
    constructor() {
      this.items = [];
    }
    
    push(item) {
      this.items.push(item);
    }
    
    pop() {
      return this.items.pop();
    }
    
    peek() {
      return this.items[this.items.length - 1];
    }
    
    isEmpty() {
      return this.items.length === 0;
    }
  }
  
  const tradeStack = new Stack();
  tradeStack.push({ order: "Buy", symbol: "AAPL", quantity: 10 });
  tradeStack.push({ order: "Sell", symbol: "TSLA", quantity: 5 });
  
  console.log(tradeStack.pop()); // Output: { order: "Sell", symbol: "TSLA", quantity: 5 }
  console.log(tradeStack.peek()); // Output: { order: "Buy", symbol: "AAPL", quantity: 10 }
  