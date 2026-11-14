// analyser.js - Expense Analyser
const fs = require('fs');
const _ = require('lodash');   // installed in Step 1 with: npm install lodash (not used further)
// GIVEN: turns the text of the file into an array of objects
// like { category: 'food', amount: 250 }
const parseExpenses = (text) => {
      return text.trim().split('\n').map((line) => {
    const parts = line.trim().split(',');
    return { category: parts[0], amount: Number(parts[1]) };
  });
};

// ---------- Step 3: read the file synchronously ----------
console.time('sync read');
const text = fs.readFileSync('expenses.txt', 'utf8')
console.timeEnd('sync read');
const expenses = parseExpenses(text);
console.log('First expense:', expenses[0]);

// ---------- Step 4: higher-order functions ----------
const totalSpent = expenses.reduce((total, e) => total + e.amount, 0);
console.log('Total spent:', totalSpent);
const bigExpenses = expenses.filter((e) => e.amount > 500);
console.log('Big expenses:', bigExpenses);
console.log('Big expenses count:', bigExpenses.length);
const withFee = expenses.map((e) => ({ ...e, amount: e.amount + 50 }));
console.log('First with fee:', withFee[0]);

// ---------- Step 5: totals per category ----------
const totalsByCategory = {};
for (const e of expenses) {
  if (totalsByCategory[e.category] === undefined) {
    totalsByCategory[e.category] = 0;
  }
  totalsByCategory[e.category] += e.amount;
}
console.log('Totals by category:', totalsByCategory);
// ---------- Step 6: switch and ternary ----------
function budgetNote(category) {
  let note;
  switch (category) {
    case 'food':
      note = 'Daily need';
      break;
    case 'travel':
      note = 'Commute';
      break;
    case 'books':
      note = 'Study';
      break;
    default:
      note = 'Other';
  }
  return note;
}
const categories = ['food', 'travel', 'books', 'entertainment'];
categories.forEach((category) => {
  const total = totalsByCategory[category];
  const status = total > 1500 ? 'OVER 1500' : 'OK';
  console.log(`${category} (${budgetNote(category)}): Rs ${total} - ${status}`);
});

// ---------- Step 7: closure ----------
function createBudgetTracker(limit) {
  let spent = 0;
  return function spend(amount) {
    spent += amount;
    const balance = limit - spent;
    return balance >= 0
      ? `Remaining: ${balance}`
      : `Over budget by ${Math.abs(balance)}`;
  };
}
const tracker = createBudgetTracker(1000);
console.log(tracker(300));
console.log(tracker(500));
console.log(tracker(400));

// ---------- Step 8: read the file asynchronously ----------
console.log('Async read started');
fs.readFile('expenses.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Async read finished');
});

for (let i = 0; i < 1000000; i++) {
  // Count to one million to demonstrate that synchronous work runs before the callback.
}
console.log('Loop finished');