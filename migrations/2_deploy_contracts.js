var HomomorphicTransaction = artifacts.require('./HomomorphicTransaction.sol')

module.exports = function (deployer) {
  deployer.deploy(HomomorphicTransaction)
}
