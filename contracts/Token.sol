// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.0 <0.9.0;

/**
* @title Token - smart contract for the Casla token (erc 20 compliant)
*/

contract Token{
    //declare state varibales to be used in the contract
    address private owner;

    string public constant name = "CASLA";
    string public constant symbol = "$CSL";
    uint256 private totalSupply;

    //put the addresses in a balances mapping 
    mapping(address => uint256) private balances;

    /**
     * @param _totalSupply total supply to ever exist.
     */

    constructor(uint256 _totalSupply){
        owner = msg.sender;
        totalSupply = _totalSupply;

        //add the total supply to the owner
        balances[owner] += totalSupply;
    }

    /**
    * @param _amount amout to  transfer. Needs to be less than balances of the msg.sender
    * @param _to address reciever
    */

    function transfer(uint256 _amount, address _to) external {
    
        //require msg.sender >= _amount 
        require(balances[msg.sender] >= _amount, "Not enough funds");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;

    }
     /**
     * @param _address address to view the balance.
     */
     function balanceOf(address _address)
     external 
     view 
     returns (uint256 result)
     {
         result = balances[_address];
     }

 /**
     * @notice returns the total supply.
     */
    function getTotalSupply() external view returns (uint256 _totalSupply) {
        _totalSupply = totalSupply;
    }

}   