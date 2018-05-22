# Ethereum homomorphic payment contract & frontend

Implementation of homomorphic (partially) zero-knowledge payment with truffle framework.

The payment system is based on a basic DAG transactions. The smart contract checks if all of the transaction inputs are valid and the sum of them are equal to that of transaction outputs. Computing each input value from broadcasted transactions is cryptographically infeasible.

Currently each input and output are hidden, but receiving address is not. However, you may be able to keep privacy in such a way as to use off-chain protocol.

## How to run

### Frontend

### Contract

