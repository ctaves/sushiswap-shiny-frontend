function isMetaMaskInstalled() {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
}


function MetamaskClientCheck(ui) {
    // If MetaMask not installed
    if (!isMetaMaskInstalled()) {
      $('#SET_WALLET').css('background-color', 'rgb(86 31 31)');
      $('#SET_WALLET').html('Install MetaMask');
      $('#SET_WALLET').attr('onClick', 'onClickInstall();');
      $('#SET_WALLET').fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn();
      $('#SET_WALLET').fadeIn();
    } 
    
    // If MetaMask installed
    else {
    	if(ui == 0) {
    	checkIsConnected();
    	} else { }
    }
}
  

async function onClickConnect() {
	try {
    the_accounts 	= await ethereum.request({ method: 'eth_requestAccounts'});
    the_account		= the_accounts[0];
    my_balance		= await getCurrentBalance();
    
    $('#the_table_last_transactions').css('height', '140px');
    // $('#SET_WALLET').html('<i class="fas fa-wallet"></i> : <b>'+the_account.substr(0,5)+'...'+the_account.substr(37,5))+'</b>';
  	$('#SET_WALLET').html('<span style="background-color: white; color: black; padding: 10px; border-top-left-radius: 10px; border-bottom-left-radius: 10px; font-size: 11px; margin-left: -15px;"><i class="fas fa-wallet"></i> &nbsp;&nbsp;'+my_balance+' ETH</span> &nbsp;&nbsp;<b>'+the_account.substr(0,5)+'...'+the_account.substr(37,5))+'</b>';
    
  	$('#SET_WALLET').attr('onClick', '');
  	$('#WALLET_BLOC').fadeIn();
  	$('#isUserConnected').val(1);
  	
  } catch (error) {
    console.error(error);
  }
}




async function checkIsConnected() {
	the_accounts 	= await ethereum.request({ method: 'eth_accounts'});
    if(the_accounts.length > 0) {
		the_account		= the_accounts[0];
		my_balance		= await getCurrentBalance();
    	$('#SET_WALLET').html('<span style="background-color: white; color: black; padding: 10px; border-top-left-radius: 10px; border-bottom-left-radius: 10px; font-size: 11px; margin-left: -15px;"><i class="fas fa-wallet"></i> &nbsp;&nbsp;'+my_balance+' ETH</span> &nbsp;&nbsp;<b>'+the_account.substr(0,5)+'...'+the_account.substr(37,5))+'</b>';
		$('#the_table_last_transactions').css('height', '140px');
		$('#WALLET_BLOC').fadeIn();
		$('#isUserConnected').val(1);
		checkListTransaction();
		checkBalanceERC20();
		
    } else {
    	$('#SET_WALLET').css('background-color', '#1e59b142');
      	$('#SET_WALLET').html('<i class="fas fa-wallet"></i> &nbsp; Connect your wallet');
      	$('#SET_WALLET').attr('onClick', 'onClickConnect();');
      	$('#the_table_last_transactions').css('height', '360px');
      	$('#WALLET_BLOC').fadeOut();
      	$('#isUserConnected').val(0);
    }
    
}

async function getCurrentBalance() {
	the_accounts 	= await ethereum.request({ method: 'eth_accounts'});
	the_account		= the_accounts[0];
	the_balance		= await ethereum.request({ method: 'eth_getBalance', params:[the_account, 'latest']});
	try {
		conv_balance	= web3.fromWei(the_balance, "ether");
	} catch {
		conv_balance	= web3.utils.fromWei(the_balance, "ether");
	}
	return conv_balance;
}



async function checkPendingTransaction() {
	try {
	the_accounts 	= await ethereum.request({ method: 'eth_accounts'});
	the_account		= the_accounts[0];
	no_pending_transactions	= await web3.eth.getTransactionCount(the_account);
	pending_transactions	= await web3.eth.getTransactionCount(the_account, 'pending');
	if(no_pending_transactions != pending_transactions) {
		total_pending	=	pending_transactions-no_pending_transactions;
		$('#Notif_pending').fadeIn();
		$('#Notif_pending').html('You have <b>'+total_pending+'</b> pending transactions');
	} else { }
	} catch {
		$('#Notif_pending').fadeOut();
	}
}



async function checkListTransaction() {
	var isUserConnected = $('#isUserConnected').val();
	if(isUserConnected == 1) {
	try {
	the_accounts 	= await ethereum.request({ method: 'eth_accounts'});
	the_account		= the_accounts[0];
	$('#table_transactions_wallet').load('./inc/load.php?data=8&address='+the_account+'');
	} catch {
	
	}
	} else { }
}



// Get ERC20 balance by parsing list + ask contract
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));    
        } else 
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}
function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

function getKeys(obj, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getKeys(obj[i], val));
        } else if (obj[i] == val) {
            objects.push(i);
        }
    }
    return objects;
}



async function getERC20InfoBalance(theToken,walletAddress) {
	tokenAddress	= theToken;
	askABI = [
  	{
   		"constant":true,
    	"inputs":[{"name":"_owner","type":"address"}],
    	"name":"balanceOf",
    	"outputs":[{"name":"balance","type":"uint256"}],
    	"type":"function"
  	},
  	{
    	"constant":true,
    	"inputs":[],
    	"name":"decimals",
    	"outputs":[{"name":"","type":"uint8"}],
    	"type":"function"
  	}
	];
	// Check if old WEB3.JS 
	try {
	the_contract			= await new web3.eth.Contract(askABI,tokenAddress);
	ERC20_balance 			= await the_contract.methods.balanceOf(walletAddress).call();
	ERC20_array 			= [ERC20_balance];
	} catch {
	// the_contract			= await web3.eth.contract(askABI).at(tokenAddress);
	ERC20_array = ["ERROR"];
	}
	
  	return ERC20_array;
	
}


function decimalToWeiName(decimals) {
	the_decimal = parseInt(decimals);
	switch(the_decimal) {
		case 0:
			weiName = "noether";
			break;
		case 1:
			weiName = "wei";
			break;
		case 2:
			weiName	= "two";			// Added to web3.js
			break;
		case 3:
			weiName = "kwei";
			break;
		case 4:
			weiName	= "four";			// Added to web3.js
			break;
		case 6:
			weiName = "mwei";
			break;
		case 7:
			weiName	= "wbcd";			// Added to web3.js
			break;
		case 8:
			weiName = "wbtc";			// Added to web3.js
			break;
		case 9:
			weiName = "gwei";
			break;
		case 12:
			weiName = "microether";
			break;
		case 15:
			weiName = "milliether";
			break;
		case 18:
			weiName = "ether";
			break;
		case 21:
			weiName = "kether";
			break;
		case 24:
			weiName = "mether";
			break;
		case 27:
			weiName = "gether";
			break;
		case 30:
			weiName = "tether";
			break;
		default:
			weiName = "ether";
	}
	return weiName;
}

async function askERCBalanceList(tokenAddress) {
	the_list		= await fetch('./list/sushiswap.tokenlist.json');
	the_list_result	= await the_list.text();
	list_data		= await the_list_result.replace(/(\r\n|\n|\r)/gm,"");
	list_parsed		= JSON.parse(list_data);
	
	count_token		=	0;
	
	
	for (i = 0; i < list_parsed.tokens.length; i++) {
		theTokenAdd		= list_parsed.tokens[i]["address"];
  		tokenSymbol 	= list_parsed.tokens[i]["symbol"];
		tokenDecimals	= list_parsed.tokens[i]["decimals"];
		tokenLogo		= list_parsed.tokens[i]["logoURI"];
  		
  		tokenBalance	= await getERC20InfoBalance(theTokenAdd,tokenAddress);
  		
  		
  		if(tokenBalance[0] != "ERROR") {
  		
  		count_token++;
  		if(tokenBalance[0] > 0) {
  			theBalance		= tokenBalance[0];
  			console.log(tokenSymbol+" = "+theBalance);
  			
			humanBalance	=	theBalance/Math.pow(10, tokenDecimals);
			
			$('#viewErc20Balance').append('<option id="OPTION_'+tokenSymbol+'" value="'+i+'" data-imagesrc="'+tokenLogo+'" data-description="'+humanBalance+'">'+tokenSymbol+'</option>');
			
		} else { }
		
		} else {
		
		}

	}
	
	
	if(tokenBalance[0] != "ERROR") {
	$('#viewErc20Balance').ddslick({width: '100%', height: '150px', background : '#17132a'});
	$('#Wallet_erc20_balance').show();
	$('#viewErc20BalanceLOADING').hide();
	} else { }
	
	
		
	
	
}



async function checkBalanceERC20() {
	is_connected	=	$('#isUserConnected').val();
	is_bloaded		=	$('#isBloaded').val();
	// Destroy and recreate
	if(is_connected == 1 && is_bloaded == 0) {
		$('#isBloaded').val(1);
		try {
			the_accounts 	= await ethereum.request({ method: 'eth_accounts'});
			the_account		= the_accounts[0];
			askERCBalanceList(the_account);
		} catch {
	
		}
	} else { }
}


async function updateBalanceERC20() {
	is_connected	=	$('#isUserConnected').val();
	if(is_connected == 1) {
	$('#viewErc20Balance').ddslick('destroy');
	$('#viewErc20Balance').html(' <option value="0" data-imagesrc="https://tokens.1inch.exchange/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png" data-description="Click here to view your tokens">My wallet</option>');
	$('#viewErc20Balance').hide();
	$('#viewErc20BalanceLOADING').show();
	$('#isBloaded').val(0);
	checkBalanceERC20();
	the_accounts 	= await ethereum.request({ method: 'eth_requestAccounts'});
    the_account		= the_accounts[0];
 	my_balance		= await getCurrentBalance();
    $('#SET_WALLET').html('<span style="background-color: white; color: black; padding: 10px; border-top-left-radius: 10px; border-bottom-left-radius: 10px; font-size: 11px; margin-left: -15px;"><i class="fas fa-wallet"></i> &nbsp;&nbsp;'+my_balance+' ETH</span> &nbsp;&nbsp;<b>'+the_account.substr(0,5)+'...'+the_account.substr(37,5))+'</b>';
    } else { }
    return true;		
}



MetamaskClientCheck(1);

window.web3 = new Web3(web3.currentProvider);
    	
// 1 -- Check
MetamaskClientCheck(0);

ethereum.on('accountsChanged', function () {
	checkIsConnected();
});

// 2 -- Last Transaction by user
setInterval("checkListTransaction();",3500);
