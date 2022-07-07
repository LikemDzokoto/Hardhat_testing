    const { expect } = require("chai");
    const { ethers } = require("hardhat");

    describe("Token.sol", () => {
        let contractFactory;
        let contract;
        let owner;
        let fiifi;
        let likem;
        let initialSupply;
        let ownerAddress;
        let fiifiAddress;
        let likemAddress;


        beforeEach(async () => {
            [owner, fiifi, likem] = await ethers.getSigners();
            initialSupply = ethers.utils.parseEther("100000");
            contractFactory = await ethers.getContractFactory("Token");
            contract = await contractFactory.deploy(initialSupply);
            ownerAddress = await owner.getAddress();
            fiifiAddress = await fiifi.getAddress();
            likemAddress = await likem.getAddress();
        });

    describe("Correct setup", () => {
        it("should be named 'CASLA", async () => {
            const name = await contract.name();
            expect(name).to.equal("CASLA");
        });
        it("should have correct supply", async () => {
            const supply = await contract.getTotalSupply();
            expect(supply).to.equal(initialSupply);
        });
        it("owner should have all the supply", async () => {
            const ownerBalance = await contract.balanceOf(ownerAddress);
            expect(ownerBalance).to.equal(initialSupply);
        });
    });

    describe("Core", () => {
        it("owner should transfer to fiifi and update balances", async () => {
            const transferAmount = ethers.utils.parseEther("1000");
            let fiifiBalance = await contract.balanceOf(fiifiAddress);
            expect(fiifiBalance).to.equal(0);
            await contract.transfer(transferAmount, fiifiAddress);
            fiifiBalance = await contract.balanceOf(fiifiAddress);
            expect(fiifiBalance).to.equal(transferAmount);
        });
        it("owner should transfer to fiifi and fiifi to likem", async () => {
            const transferAmount = ethers.utils.parseEther("1000");
            await contract.transfer(transferAmount, fiifiAddress); // contract is connected to the owner.
            let likemBalance = await contract.balanceOf(likemAddress);
            expect(likemBalance).to.equal(0);
            await contract.connect(fiifi).transfer(transferAmount, likemAddress);
            likemBalance = await contract.balanceOf(likemAddress);
            expect(likemBalance).to.equal(transferAmount);
        });
        it("should fail by depositing more than current balance", async () => {
            const txFailure = initialSupply + 1;
            await expect(contract.transfer(txFailure, fiifiAddress)).to.be.revertedWith("Not enough funds");
        });
    });
});









