require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

require("dotenv").config();

const privatekey = process.env.PRIVATE_KEY;
const endpoint = process.env.URL;



task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});



/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: { 
    version: "0.8.4"
},
networks:{
  rinkeby:{
    url: endpoint,
    accounts: [`0x${privatekey}`]
  }

}

};

