function ethWSS() {
  try {
    eth_socket = new WebSocket("wss://stream.binance.com:9443/stream?streams=ethusdt@aggTrade");
  } catch (exception) {}

  eth_socket.onopen = function(event) {
    this.onmessage = function(event) {
      the_message = JSON.parse(event.data);
      the_price = the_message.data.p;

      $("#wssEthPrice").val(the_price); // usdt 1% spread with usd

      infos_price = $("#PRICE_INFO_PAIRS").html();
      inf_price = infos_price.split(";");
      eth_price = $("#wssEthPrice").val();

      // Price PAIR
      old_1 = $("#PRICE_PAIR_1").html();
      old_2 = $("#PRICE_PAIR_2").html();
      old_p_1 = old_1.replace("$", "");
      old_p_2 = old_2.replace("$", "");

      new_1 = (inf_price[1] * eth_price).toFixed(4);
      new_2 = (inf_price[3] * eth_price).toFixed(4);

      if (new_1 >= old_p_1) {
        color_1 = "green";
      } else {
        color_1 = "red";
      }
      if (new_2 >= old_p_2) {
        color_2 = "green";
      } else {
        color_2 = "red";
      }

      $("#PRICE_PAIR_1")
        .css("color", "" + color_1 + "")
        .html("$" + new_1 + "");
      $("#PRICE_PAIR_2")
        .css("color", "" + color_2 + "")
        .html("$" + new_2 + "");

      // Liquidity USD
      liq_ETH = $("#LIQ_ETH").html();

      parse_liqUSD = liq_ETH.replace(" ETH", "");
      old_liqUSD = parse_liqUSD.replaceAll(",", "");

      new_liq = (old_liqUSD * eth_price).toFixed(2);

      $("#LIQ_USD").html("" + Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(new_liq));
    };
  };
}

function autoUpdatePrice() {
  var the_pair = $("#TOKEN_PAIRS").val();

  $("#PRICE_INFO_PAIRS").load("./inc/load.php?data=7&token=" + the_pair + "", function() {
    var infos_price = $("#PRICE_INFO_PAIRS").html();
    var inf_price = infos_price.split(";");

    $("#PAIR_1").html("" + inf_price[0] + "");
    $("#PAIR_2").html("" + inf_price[2] + "");
  });
}

function pricePairShow(current_pair) {
  $("#PAIR_1").html('<i class="fas fa-spinner fa-spin"></i>');
  $("#PAIR_2").html('<i class="fas fa-spinner fa-spin"></i>');
  $("#PRICE_PAIR_1").html('<i class="fas fa-spinner fa-spin"></i>');
  $("#PRICE_PAIR_2").html('<i class="fas fa-spinner fa-spin"></i>');

  $("#PRICE_INFO_PAIRS").load("./inc/load.php?data=7&token=" + current_pair + "", function() {
    var infos_price = $("#PRICE_INFO_PAIRS").html();
    var inf_price = infos_price.split(";");

    $("#PAIR_1").html("" + inf_price[0] + "");
    $("#PAIR_2").html("" + inf_price[2] + "");
  });
}

$("#LIQ_USD").load("./inc/load.php?data=1");
$("#LIQ_ETH").load("./inc/load.php?data=2");

$("#NB_PAIRS").load("./inc/load.php?data=3");

$("#TOKEN_LIST").load("./inc/load.php?data=4");
$("#TOKEN_PAIRS").load("./inc/load.php?data=5", function() {
  var current_pair = $("#TOKEN_PAIRS").val();
  $("#CURRENT_RESERV").load("./inc/load.php?data=6&token=" + current_pair + "");
  pricePairShow(current_pair);
});

function changeToken() {
  var current_token = $("#TOKEN_LIST").val();
  $("#TOKEN_PAIRS").val('<i class="fas fa-spinner fa-spin"></i>');
  $("#CURRENT_RESERV").html('<i class="fas fa-spinner fa-spin"></i>');

  $("#TOKEN_PAIRS").load("./inc/load.php?data=5&token=" + current_token + "", function() {
    var current_pair = $("#TOKEN_PAIRS").val();
    $("#CURRENT_RESERV").load("./inc/load.php?data=6&token=" + current_pair + "");
    pricePairShow(current_pair);
    widget.activeChart().setSymbol("" + current_pair + "");
  });
}

function changePair() {
  $("#CURRENT_RESERV").html('<i class="fas fa-spinner fa-spin"></i>');
  var current_pair = $("#TOKEN_PAIRS").val();
  widget.activeChart().setSymbol("" + current_pair + "");
  $("#CURRENT_RESERV").load("./inc/load.php?data=6&token=" + current_pair + "");
  pricePairShow(current_pair);
}

function showLastSushiTransaction() {
  $("#all_last_transactions").load("./inc/load.php?data=9");
}

async function getPriceAndRoute(goswap) {
  $("#OUTPUT_WAITING").show();
  var THE_INPUT_TOKEN = $("#SWAP_INPUT_TOKEN").val();
  var THE_INPUT_AMOUNT = $("#SWAP_INPUT_TOKEN_AMOUNT").val();
  var THE_OUTPUT_TOKEN = $("#SWAP_OUTPUT_TOKEN").val();
  var SLIPPAGE = $("#CONF_SETTINGS_SLIPPAGE").val();
  var CONF_MAX_HOPS = $("#CONF_SETTINGS_MAX_HOPS").val();

  // Check if is numeric + empty input + input != token
  if (
    !isNaN(THE_INPUT_AMOUNT) &&
    THE_INPUT_AMOUNT != "" &&
    THE_INPUT_TOKEN != THE_OUTPUT_TOKEN &&
    !(THE_INPUT_TOKEN == "FROM_ETH" && THE_OUTPUT_TOKEN == "TO_ETH")
  ) {
    $.post("./inc/find_route.php", {
      QUANTITY: THE_INPUT_AMOUNT,
      TOKEN_INPUT: THE_INPUT_TOKEN,
      TOKEN_OUTPUT: THE_OUTPUT_TOKEN,
      HOPS: CONF_MAX_HOPS,
    }).done(function(data) {
      var DATA_TO_PARSE = JSON.parse(data);
      var ROUTES_POSSIBLE = DATA_TO_PARSE.number_of_routes;
      var ri = 0;
      var ALL_ROUTES = [];
      var CONFIG_SOR = $("#CONF_SETTINGS_SOR").val();

      // If a route exist without too much price impact
      if (ROUTES_POSSIBLE > 0) {
        DATA_TO_PARSE.route.forEach(function(the_route) {
          ALL_ROUTES.push([
            "" + the_route.route + "",
            the_route.sum_output,
            the_route.max_impact_output,
            the_route.percent_sum_price_impact,
            the_route.percent_max_price_impact,
            the_route.decimals_input,
            the_route.decimals_output,
          ]);
          ri++;
        });

        if (CONFIG_SOR == 1) {
          ALL_ROUTES.sort(function(a, b) {
            return a[4] - b[4];
          });
        } else if (CONFIG_SOR == 2) {
          ALL_ROUTES.sort(function(a, b) {
            return a[3] - b[3];
          });
        } else if (CONFIG_SOR == 3) {
          ALL_ROUTES.sort(function(a, b) {
            return b[2] - a[2];
          });
        } else {
          ALL_ROUTES.sort(function(a, b) {
            return b[1] - a[1];
          });
        }

        // Smart Order Routing BEST ROUTE
        var BEST_ROUTE = ALL_ROUTES[0];
        var MIN_RECEIVE = BEST_ROUTE[2] - (BEST_ROUTE[2] / 100) * SLIPPAGE;

        // Show the SUM, but MAX-SLIPPAGE for min receive
        $("#OUTPUT_WAITING").hide();

        // Prepare the swap
        $("#SWAP_BEST_ROUTE").val("" + BEST_ROUTE[0] + "");
        $("#SWAP_MINIMUM_RECEIVED").val(MIN_RECEIVE.toFixed(8));
        $("#SWAP_INPUT_DECIMALS").val("" + BEST_ROUTE[5] + "");
        $("#SWAP_OUTPUT_DECIMALS").val("" + BEST_ROUTE[6] + "");
        $("#TD_SUM_PRICE_IMPACT").html("" + BEST_ROUTE[3] + "%");
        $("#TD_MAX_PRICE_IMPACT").html("" + BEST_ROUTE[4] + "%");

        $("#SWAP_OUTPUT_TOKEN_AMOUNT").val(BEST_ROUTE[1]);

        $("#BUTTON_TO_SEND_SWAP").css("background-color", "#1eb1aa");
        $("#TD_MIN_RECEIVE").html(MIN_RECEIVE);
        $("#SWAP_OUTPUT_TOKEN_AMOUNT").css("border", "1px solid white");
        $("#SWAP_OUTPUT_TOKEN").css("background-color", "white");

        var IS_IT_CONNECTED = $("#isUserConnected").val();

        if (goswap == 777 && IS_IT_CONNECTED == 1) {
          $("#BUTTON_TO_SEND_SWAP").effect("highlight");
          sendTransaction();
        } else if (goswap == 777 && IS_IT_CONNECTED == 0) {
          $("#BUTTON_TO_SEND_SWAP").effect("highlight");
          $("#SET_WALLET")
            .effect("pulsate")
            .effect("pulsate");
        } else {
        }
      } else {
        $("#OUTPUT_WAITING").hide();

        $("#SWAP_MINIMUM_RECEIVED").val("");
        $("#SWAP_BEST_ROUTE").val("");
        $("#SWAP_INPUT_DECIMALS").val("");
        $("#SWAP_OUTPUT_DECIMALS").val("");
        $("#TD_SUM_PRICE_IMPACT").html("");
        $("#TD_MAX_PRICE_IMPACT").html("");

        $("#SWAP_OUTPUT_TOKEN_AMOUNT").val("");

        $("#BUTTON_TO_SEND_SWAP").css("background-color", "#5a1515");
        $("#TD_MIN_RECEIVE").html("");
        $("#SWAP_OUTPUT_TOKEN_AMOUNT").css("border", "1px solid #de6565");
        $("#SWAP_OUTPUT_TOKEN").css("background-color", "#de6565");

        $("#BUTTON_TO_SEND_SWAP")
          .effect("bounce")
          .effect("bounce");
      }
    });
  } else {
    $("#OUTPUT_WAITING").hide();

    $("#SWAP_MINIMUM_RECEIVED").val("");
    $("#SWAP_BEST_ROUTE").val("");
    $("#SWAP_INPUT_DECIMALS").val("");
    $("#SWAP_OUTPUT_DECIMALS").val("");
    $("#TD_SUM_PRICE_IMPACT").html("");
    $("#TD_MAX_PRICE_IMPACT").html("");

    $("#SWAP_OUTPUT_TOKEN_AMOUNT").val("");
    $("#TD_MIN_RECEIVE").html("");

    $("#BUTTON_TO_SEND_SWAP").css("background-color", "#5a1515");
    $("#SWAP_OUTPUT_TOKEN_AMOUNT").css("border", "1px solid #de6565");
    $("#SWAP_OUTPUT_TOKEN").css("background-color", "#de6565");

    $("#BUTTON_TO_SEND_SWAP")
      .effect("bounce")
      .effect("bounce");
  }
}

var hear_input_amount = null;

// if(event.which != 16 && THE_INPUT_AMOUNT != '') {
$("#SWAP_INPUT_TOKEN_AMOUNT").on("input", function(event) {
  clearTimeout(hear_input_amount);
  hear_input_amount = setTimeout(function() {
    getPriceAndRoute();
  }, 650);
});

function removePopup() {
  $("#bgPopup").hide();
  $("#popupDialogRejected").hide();
  $("#popupDialogSettings").hide();
  $("#popupDialogTransactionAccepted").hide();
  $("#popupDialogApprovalAccepted").hide();
}

function openSettings() {
  $("#bgPopup").fadeIn();
  $("#popupDialogSettings").fadeIn();
}

$.post("https://apy.sushiswap.fi/", { GET: 1 }).done(function(data) {
  var APY_DATA = data;
  var i = 0;
  var ALL_DATA_PAIRS = [];
  APY_DATA.pairs.forEach(function(apy_info) {
    ALL_DATA_PAIRS.push([
      apy_info.token0.symbol.substr(0, 10),
      apy_info.token1.symbol.substr(0, 10),
      parseFloat(apy_info.reserveETH).toFixed(2),
      parseFloat(apy_info.aprDay).toFixed(2),
      parseFloat(apy_info.aprMonthly).toFixed(2),
      parseFloat(apy_info.aprYear_with_lockup).toFixed(2),
    ]);
  });

  ALL_DATA_PAIRS.sort(function(a, b) {
    return b[5] - a[5];
  });
  ALL_DATA_PAIRS.forEach(function(apy_pair) {
    if (apy_pair[5] >= 40) {
      var bg_pair_color = "#6bbf6b6e";
    } else if (apy_pair[5] >= 10 && apy_pair[5] < 40) {
      var bg_pair_color = "#d29b356e";
    } else {
      var bg_pair_color = "#da67676e";
    }

    if (i < 30) {
      $("#TABLE_APY_LEFT tr:last").after(
        '<tr style="font-size:11px;"><td style="background-color:' +
          bg_pair_color +
          ";font-family:'Arial', sans-serif;font-weight:bold;\"> " +
          apy_pair[0] +
          " / " +
          apy_pair[1] +
          "</td><td>" +
          apy_pair[2] +
          " </td><td>" +
          apy_pair[3] +
          "%</td><td>" +
          apy_pair[4] +
          "%</td><td>" +
          apy_pair[5] +
          "%</td></tr>"
      );
    } else if (i < 60) {
      $("#TABLE_APY_RIGHT tr:last").after(
        '<tr style="font-size:11px;"><td style="background-color:' +
          bg_pair_color +
          ";font-family:'Arial', sans-serif;font-weight:bold;\"> " +
          apy_pair[0] +
          " / " +
          apy_pair[1] +
          "</td><td>" +
          apy_pair[2] +
          " </td><td>" +
          apy_pair[3] +
          "%</td><td>" +
          apy_pair[4] +
          "%</td><td>" +
          apy_pair[5] +
          "%</td></tr>"
      );
    } else {
    }

    i++;
  });
});

function viewQuantPairs() {
  var QUANT_SELECTED_PAIR = $("#QUANT_RESERVE_PAIR").val();
  $("#TABLE_QUANT_PAIRS").load("./inc/load.php?data=10&PAIR_ID=" + QUANT_SELECTED_PAIR + "");
}

$("#QUANT_ETH_GAS").load("./inc/load.php?data=11");
$("#QUANT_RESERVE_PAIR").load("./inc/load.php?data=12");
$("#TABLE_QUANT_PAIRS").load("./inc/load.php?data=10&PAIR_ID=0x795065dcc9f64b5614c407a6efdc400da6221fb0");

function viewFull() {
  $("#RIGHT_SIDE").hide();
  $("#LEFT_CHARTS").css("width", "100%");
  $("#LEFT_CHARTS_ARBITRAGE").css("width", "100%");
}

function backFull() {
  $("#RIGHT_SIDE").show();
  $("#LEFT_CHARTS").css("width", "70%");
  $("#LEFT_CHARTS_ARBITRAGE").css("width", "70%");
}

showLastSushiTransaction();
setInterval("showLastSushiTransaction();", 3000);
setInterval("autoUpdatePrice();", 5000);
