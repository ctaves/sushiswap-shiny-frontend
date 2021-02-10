export function swapExactTokensForTokens(
  the_amountIN,
  the_amountOUT,
  decimals_IN,
  decimals_OUT,
  path_address,
  to_address
) {
  var USER_SETTINGS_DEADLINE = $("#CONF_SETTINGS_DEADLINE").val();
  var USER_DEADLINE = USER_SETTINGS_DEADLINE * 60;
  var DATE_now = Math.floor(Date.now() / 1000);
  var DATE_expiration = DATE_now + USER_DEADLINE;
  var OUT_amounType = decimalToWeiName(decimals_OUT);
  var IN_amountType = decimalToWeiName(decimals_IN);

  var DATA_swapExactTokensForTokens = web3.eth.abi.encodeFunctionCall(
    {
      type: "function",
      name: "swapExactTokensForTokens",
      inputs: [
        {
          name: "amountIn",
          type: "uint256",
        },
        {
          name: "amountOutMin",
          type: "uint256",
        },
        {
          name: "path",
          type: "address[]",
        },
        {
          name: "to",
          type: "address",
        },
        {
          name: "deadline",
          type: "uint256",
        },
      ],
    },
    [
      web3.utils.toWei("" + the_amountIN + "", "" + IN_amountType + ""),
      web3.utils.toWei("" + the_amountOUT + "", "" + OUT_amounType + ""),
      path_address,
      to_address,
      DATE_expiration,
    ]
  );

  return DATA_swapExactTokensForTokens;
}

export function swapExactETHForTokens(the_amountOUT, decimals_OUT, path_address, to_address) {
  var USER_SETTINGS_DEADLINE = $("#CONF_SETTINGS_DEADLINE").val();
  var USER_DEADLINE = USER_SETTINGS_DEADLINE * 60;
  var DATE_now = Math.floor(Date.now() / 1000);
  var DATE_expiration = DATE_now + USER_DEADLINE;

  var OUT_amounType = decimalToWeiName(decimals_OUT);

  var DATA_swapExactETHForTokens = web3.eth.abi.encodeFunctionCall(
    {
      type: "function",
      name: "swapExactETHForTokens",
      inputs: [
        {
          name: "amountOutMin",
          type: "uint256",
        },
        {
          name: "path",
          type: "address[]",
        },
        {
          name: "to",
          type: "address",
        },
        {
          name: "deadline",
          type: "uint256",
        },
      ],
    },
    [web3.utils.toWei("" + the_amountOUT + "", "" + OUT_amounType + ""), path_address, to_address, DATE_expiration]
  );

  return DATA_swapExactETHForTokens;
}

export function swapExactTokensForETH(the_amountIN, the_amountOUT, decimals_IN, path_address, to_address) {
  var USER_SETTINGS_DEADLINE = $("#CONF_SETTINGS_DEADLINE").val();
  var USER_DEADLINE = USER_SETTINGS_DEADLINE * 60;
  var DATE_now = Math.floor(Date.now() / 1000);
  var DATE_expiration = DATE_now + USER_DEADLINE;

  var IN_amounType = decimalToWeiName(decimals_IN);

  var DATA_swapExactTokensForETH = web3.eth.abi.encodeFunctionCall(
    {
      type: "function",
      name: "swapExactTokensForETH",
      inputs: [
        {
          name: "amountIn",
          type: "uint256",
        },
        {
          name: "amountOutMin",
          type: "uint256",
        },
        {
          name: "path",
          type: "address[]",
        },
        {
          name: "to",
          type: "address",
        },
        {
          name: "deadline",
          type: "uint256",
        },
      ],
    },
    [
      web3.utils.toWei("" + the_amountIN + "", "" + IN_amounType + ""),
      web3.utils.toWei("" + the_amountOUT + "", "ether"),
      path_address,
      to_address,
      DATE_expiration,
    ]
  );

  return DATA_swapExactTokensForETH;
}

export async function isAddressAllowedToSpend(the_address, the_token) {
  askABI = [
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "account", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      type: "function",
    },
  ];

  allow_token_contract = await new web3.eth.Contract(askABI, "" + the_token + "");
  is_allowed = await allow_token_contract.methods
    .allowance("" + the_address + "", "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f")
    .call();

  return is_allowed;
}

export function encodeApprove() {
  var DATA_approve = web3.eth.abi.encodeFunctionCall(
    {
      type: "function",
      name: "approve",
      inputs: [
        {
          name: "spender",
          type: "address",
        },
        {
          name: "rawAmount",
          type: "uint256",
        },
      ],
    },
    [
      "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f",
      "115792089237316195423570985008687907853269984665640564039457584007913129639935",
    ]
  );

  return DATA_approve;
}

export async function sendTransaction() {
  // Create array for the route + quantity + minimum output
  token_INPUT = $("#SWAP_INPUT_TOKEN").val();
  token_OUTPUT = $("#SWAP_OUTPUT_TOKEN").val();
  decimals_INPUT = $("#SWAP_INPUT_DECIMALS").val();
  decimals_OUTPUT = $("#SWAP_OUTPUT_DECIMALS").val();
  quantity = $("#SWAP_INPUT_TOKEN_AMOUNT").val();
  minimum_out = $("#SWAP_MINIMUM_RECEIVED").val();
  token_N_INPUT = $("#SWAP_INPUT_TOKEN option:selected").text();
  token_N_OUTPUT = $("#SWAP_OUTPUT_TOKEN option:selected").text();
  conf_gas_PRICE = $("#CONF_SETTINGS_GAS_PRICE").val();
  conf_gas_LIMIT = $("#CONF_SETTINGS_GAS_LIMIT").val();

  swap_route = [];

  best_route = $("#SWAP_BEST_ROUTE").val();

  if (
    token_INPUT != "" &&
    token_OUTPUT != "" &&
    decimals_INPUT != "" &&
    decimals_OUTPUT != "" &&
    quantity != "" &&
    minimum_out != ""
  ) {
    split_route = best_route.split(";");
    length_route = split_route.length;
    ui_route = 0;

    while (ui_route < length_route) {
      swap_route.push(split_route[ui_route]);
      ui_route++;
    }

    // Get the current ETH address
    the_accounts = await ethereum.request({ method: "eth_requestAccounts" });
    the_account = the_accounts[0];

    // Is allowed ?
    if (token_INPUT != "FROM_ETH") {
      isAllowed = await isAddressAllowedToSpend("" + the_account + "", "" + token_INPUT + "");
    } else {
      isAllowed = 1;
    }

    // If he is allowed to spend
    if (isAllowed > 0) {
      // Detect wich function call
      if (token_INPUT != "FROM_ETH" && token_OUTPUT != "TO_ETH") {
        data_encoded = swapExactTokensForTokens(
          quantity,
          minimum_out,
          decimals_INPUT,
          decimals_OUTPUT,
          swap_route,
          the_account
        );
        web3.eth
          .sendTransaction({
            from: the_account,
            to: "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f",
            gasPrice: web3.utils.toWei("" + conf_gas_PRICE + "", "Gwei"),
            gas: conf_gas_LIMIT,
            data: data_encoded,
          })
          .on("error", function() {
            $("#bgPopup").show();
            $("#popupDialogRejected").show();
          })
          .on("transactionHash", function(hash) {
            $("#bgPopup").show();
            $("#popupDialogTransactionAccepted").show();
            $("#CONFIRMATION_SENT").html(quantity + " " + token_N_INPUT + "");
            $("#CONFIRMATION_MINIMUM").html(minimum_out + " " + token_N_OUTPUT + "");
            $("#CONFIRMATION_TX_LINK").attr("href", "http://etherscan.io/tx/" + hash + "");
          })
          .on("receipt", function(receipt) {
            // Update
            updateBalanceERC20();
          });
      } else if (token_INPUT == "FROM_ETH" && token_OUTPUT != "TO_ETH") {
        data_encoded = swapExactETHForTokens(minimum_out, decimals_OUTPUT, swap_route, the_account);
        web3.eth
          .sendTransaction({
            from: the_account,
            to: "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f",
            value: web3.utils.toWei(quantity, "ether"),
            gasPrice: web3.utils.toWei("" + conf_gas_PRICE + "", "Gwei"),
            gas: conf_gas_LIMIT,
            data: data_encoded,
          })
          .on("error", function() {
            $("#bgPopup").show();
            $("#popupDialogRejected").show();
          })
          .on("transactionHash", function(hash) {
            $("#bgPopup").show();
            $("#popupDialogTransactionAccepted").show();
            $("#CONFIRMATION_SENT").html(quantity + " " + token_N_INPUT + "");
            $("#CONFIRMATION_MINIMUM").html(minimum_out + " " + token_N_OUTPUT + "");
            $("#CONFIRMATION_TX_LINK").attr("href", "http://etherscan.io/tx/" + hash + "");
          })
          .on("receipt", function(receipt) {
            // Update
            updateBalanceERC20();
          });
      } else if (token_INPUT != "FROM_ETH" && token_OUTPUT == "TO_ETH") {
        data_encoded = swapExactTokensForETH(quantity, minimum_out, decimals_INPUT, swap_route, the_account);
        web3.eth
          .sendTransaction({
            from: the_account,
            to: "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f",
            gasPrice: web3.utils.toWei("" + conf_gas_PRICE + "", "Gwei"),
            gas: conf_gas_LIMIT,
            data: data_encoded,
          })
          .on("error", function() {
            $("#bgPopup").show();
            $("#popupDialogRejected").show();
          })
          .on("transactionHash", function(hash) {
            $("#bgPopup").show();
            $("#popupDialogTransactionAccepted").show();
            $("#CONFIRMATION_SENT").html(quantity + " " + token_N_INPUT + "");
            $("#CONFIRMATION_MINIMUM").html(minimum_out + " " + token_N_OUTPUT + "");
            $("#CONFIRMATION_TX_LINK").attr("href", "http://etherscan.io/tx/" + hash + "");
          })
          .on("receipt", function(receipt) {
            // Update Balance
            updateBalanceERC20();
          });
      } else {
      }
    } else {
      // If he is NOT allowed to spend
      data_encoded = encodeApprove();
      web3.eth
        .sendTransaction({
          from: the_account,
          to: "" + token_INPUT + "",
          gasPrice: web3.utils.toWei("" + conf_gas_PRICE + "", "Gwei"),
          gas: conf_gas_LIMIT,
          data: data_encoded,
        })
        .on("error", function() {
          $("#bgPopup").show();
          $("#popupDialogRejected").show();
        })
        .on("transactionHash", function(hash) {
          $("#bgPopup").show();
          $("#popupDialogApprovalAccepted").show();
          $("#APPROVE_TX_LINK").attr("href", "http://etherscan.io/tx/" + hash + "");
        })
        .on("receipt", function(receipt) {
          // Update Balance
          updateBalanceERC20();
        });
    }

    // Back to 0
    $("#OUTPUT_WAITING").hide();

    $("#SWAP_INPUT_TOKEN_AMOUNT").val("");
    $("#SWAP_MINIMUM_RECEIVED").val("");
    $("#SWAP_BEST_ROUTE").val("");
    $("#SWAP_INPUT_DECIMALS").val("");
    $("#SWAP_OUTPUT_DECIMALS").val("");
    $("#TD_SUM_PRICE_IMPACT").html("");
    $("#TD_MAX_PRICE_IMPACT").html("");

    $("#SWAP_OUTPUT_TOKEN_AMOUNT").val("");
    $("#TD_MIN_RECEIVE").html("");
  } else {
  }
}
