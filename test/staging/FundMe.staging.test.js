const { getNamedAccounts, ethers, network } = require("hardhat");
const {assert} = require("chai")
const { developmentChains } = require("../../helper-hardhat-config");

developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMeStagingTests", function () {
      let fundMe;
      let deployer;
      const sendValue = ethers.utils.parseEther("0.1");
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        fundMe = await ethers.getContract("FundMe", deployer);
      });

      it ("allows to fund and withdraw", async function() {
        const fundTxResponse = await fundMe.fund({value: sendValue})
        await fundTxResponse.wait(1) 
        const withdrawTxResponse = await fundMe.withdraw()
        await withdrawTxResponse.wait(1)
        const endingBalance = await fundMe.provider.getBalance(
            fundMe.address
        )
        assert.equal(endingBalance.toString(), "0")
      })
    });
