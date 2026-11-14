# Expense Analyser

## Run

Install the locked dependencies with `npm ci`, then run:

```sh
node Warmup.js
node analyser.js
```

`output.txt` contains the console output from running both scripts on Node.js v24.13.0.

## Warmup.js

I predicted `undefined`, then `99 1`, `3`, and `true false`, and that is what the run printed. The first line is `undefined` because `var a` is hoisted and initialized before its assignment; if Part B's `console.log(b)` is uncommented, the script prints that initial `undefined` and then throws a `ReferenceError` at `b`, which is in the temporal dead zone before its `let` declaration. The final comparisons use `==` (loose equality, which coerces the string to a number) and `===` (strict equality, which does not), so their results are `true` and `false`.

## Asynchronous read

`Loop finished` prints before `Async read finished` because the loop runs synchronously on Node's JavaScript thread, while the callback is deferred until the asynchronous file read completes. Node's filesystem implementation, via its underlying operating-system facilities and libuv, performs the file I/O while JavaScript can continue running.

## Budget tracker closure

`createBudgetTracker` creates `spent` in its local scope and returns a function that closes over that variable. The returned function keeps the binding reachable after `createBudgetTracker` returns, so each call updates and reads the same running total.

## Lodash version and lockfile

This project's `package.json` specifies lodash as `^4.18.1`; the `^` is a semver range that allows compatible versions at or above `4.18.1` but below `5.0.0`. `package-lock.json` records the exact resolved package versions and integrity data, so `npm ci` can reproduce the dependency installation (the lockfile here pins lodash to `4.18.1`).
