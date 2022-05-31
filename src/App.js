import {useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction, useMoralisWeb3ApiCall, useNativeBalance} from "react-moralis";
import React from "react";

function App() {
  
  
  

  const [balances, setBalance]=React.useState(0);
  const {Moralis} = useMoralis();
  const web3Api= useMoralisWeb3Api();
  const contractProcessor=useWeb3ExecuteFunction();
// ----------------------------------LOGIN-------------------------------------------------------------
  const{authenticate, isAuthenticated, isAuthenticating, user, account, logout}=useMoralis();
  async function login(){
    if(!isAuthenticated){
      await authenticate();
      Update();
      
    }
    
  }

// --------------------------------------LOGOUT--------------------------------------------------------------
  async function logOut(){
    await logout();
    setBalance(0);
  }

// ----------------------------------------BALANCE--------------------------------------------------------------------------
  async function Update(){
    const options={
      chain: "ropsten",
      address: "0xC2ecFbdBC7bd3A8B71c2D28250b50bDF80957137"
    }
    const Balance=await web3Api.account.getNativeBalance(options);
  //   const  {data}  = useNativeBalance({chain: "ropsten",
  //   address: "0xC2ecFbdBC7bd3A8B71c2D28250b50bDF80957137"
  //   });
    setBalance(Moralis.Units.FromWei(Balance.balance)+" "+"ETH");
  }
//  ----------------------------------------------------TRANSFER--------------------------------------------------------------- 
  async function donate(){
    let option={
      contractAddress: "0xC2ecFbdBC7bd3A8B71c2D28250b50bDF80957137",
      functionName: "transfer",
      abi: [{"inputs":[],"name":"numOfFunders","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"transfer","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"withdrawAmount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],
      msgValue: await Moralis.Units.ETH(prompt("Enter the amount in ETH:"))
    }
    await contractProcessor.fetch({
      params: option
    });
    try{
      Update();
    }catch(e){
      console.log(e);
    }
    
  }
// ------------------------------------------------WITHDRAW---------------------------------------
  
  async function Withdraw(){
    const web3 = await Moralis.enableWeb3({ provider: "metamask" });
    const sendOptions = {
      contractAddress: "0xC2ecFbdBC7bd3A8B71c2D28250b50bDF80957137",
      functionName: "withdraw",
      abi: [{"inputs":[],"name":"numOfFunders","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"transfer","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"withdrawAmount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],
      params: {
        withdrawAmount: Moralis.Units.ETH(prompt("Enter the withdrawal amount:", "Amount <= 2 Ether")),
        
      },
    };
    
    const transaction = await Moralis.executeFunction(sendOptions);
    try{
      Update();
    }catch(e){
      console.log(e);
    }
}
  
    
    


  return (
   <>
     <div className="card text-center" style={{backgroundColor: '#26232a', color: "grey", fontStyle: "italic", fontWeight: "bold"}}>
        <div className="card-header" style={{color: "grey"}}>Funding</div>
        <div className="card-body" style={{backgroundColor: '#26232a', color: "white"}}>
          
          {isAuthenticated? <button type="button" className="btn btn-outline-warning" onClick={Update}>Balance: {balances}</button> : null}
          {isAuthenticated? <p className="card-text">Account : {user.get("ethAddress")}</p> : <p className="card-text">Account : Not Connected</p>}
          {!isAuthenticated? <button type="button" className="btn btn-outline-info" onClick={login}>
            Connect to metamask
          </button> : null}
          &nbsp;
          {isAuthenticated? <button type="button" className="btn btn-outline-success" onClick={donate} >Transfer</button> : null}
          &nbsp;
          {/* {isAuthenticated? <input placeholder="Enter the amount" id="amount" style={{color: "blue"}}></input> : null} */}
          &nbsp;
          {isAuthenticated? <button type="button" className="btn btn-outline-primary" id="withdraw" onClick={Withdraw}>Withdraw</button> : null}
          &nbsp;
          &nbsp;
         {isAuthenticated?<button type="button" className="btn btn-outline-danger" onClick={logOut}>Logout</button> : null}
        </div>
        <div className="card-footer " style={{color: "grey", border: "black"}}>Copyright @Abir Dutta</div>
      </div>
   </>
  );
}

export default App;
