pragma solidity ^0.4.16;

contract EToken {
    
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    
    //This generates public event on the blockchain that will notify clients
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    function EToken(uint256 initialSupply, string tokenName, string tokenSymbol) public {
        totalSupply = initialSupply * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
        name = tokenName;
        symbol = tokenSymbol;
    }
    
    /**
     * Internal transfer method that can be called only from this contract
     */
    function _transfer(address _from, address _to, uint256 _value) internal {
        //Check has enough tokens for Transfer
        require(balanceOf[_from] >= _value);
        
        //Substract from sender
        balanceOf[_from] -= _value;
        //Add to the receiver
        balanceOf[_to] += _value;
        
        //Emit event
        Transfer(_from, _to, _value);
    }
    
    /**
     * Transfer tokens from your account _to
     * 
     * @param _to address to be sent to
     * @param _value amount to be sent
     */
    function transfer(address _to, uint256 _value) public {
        _transfer(msg.sender, _to, _value);
    }
    
    /**
    * Transfer tokens _from account _to account
    * @param _from address that sends tokens
    * @param _to address to be sent to
    * @param _value amount to be sent
    */
    function transferFrom(address _from, address _to, uint256 _value) public {
        _transfer(_from, _to, _value);
    }
}

contract SmartGrid {
    //Address of the token contract
    address public tokenAddress;
    //Address of the Smart Grid provider wallet
    address public owner;
    //Debt a user owes to the Smart Grid
    struct User {
        uint256 debt;
    }
    //Global price set as 1
    uint256 public globalPrice = 1;

    EToken public tokenContract;
    mapping(address => User) public users;
    
    /**
    * Constructor that creates the contract
    * @param _tokenAddress token contract address
    */
    function SmartGrid(address _tokenAddresss) public {
        tokenAddress = _tokenAddresss;
        owner = msg.sender;
        tokenContract = EToken(tokenAddress);
    }

    /**
    * Pays the amount of token according to the _produced and current globalPrice
    * @param _produced the amount that was produced
    */
    function produce(uint256 _produced) public {
        //Calculate value based on global price
        uint256 amount = globalPrice * _produced;
        //Pay out value amount of token to the producers wallet
        _payOut(msg.sender, amount);
    }

    function _payOut(address _to, uint256 amount) internal {
        tokenContract.transferFrom(owner, _to, amount);
    }
    
    /**
    * Sets the debt according to the _consumed and current globalPrice
    * @param _consumed the amount that was consumed
    */
    function setDebt(uint256 _consumed) public {
        //Calculate value based on global price
        uint256 amount = globalPrice * _consumed;
        //Set debt for the user
        users[msg.sender].debt = amount;
    }
    
    /**
    * Pays the amount of debt that the user owes to the provider
    */
    function payDebt() public {
        //Pay the debt owed to the grid
        uint256 amount = users[msg.sender].debt;
        tokenContract.transferFrom(msg.sender, owner, amount);
    }
    
}
