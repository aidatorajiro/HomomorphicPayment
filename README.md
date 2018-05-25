# Ethereum homomorphic payment contract & frontend

Implementation of homomorphic (partially) zero-knowledge payment with truffle framework.

The payment system is based on a basic DAG transactions. The smart contract checks if all of the transaction inputs are valid and the sum of them are equal to that of transaction outputs. Computing each input value or output value from broadcasted transactions is cryptographically infeasible.

## How to run

1. ```npm install -g truffle```
2. ```npm install```
3. ```truffle migrate```
4. ```npm run dev``` (Will launch dev server)
