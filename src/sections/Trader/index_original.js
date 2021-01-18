import React from "react";

const Popup = () => {
  return (
    <>
      <div
        id="bgPopup"
        style={{
          display: "none",
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: 999999,
          backgroundColor: "#00000094",
          marginTop: "-10px",
        }}
      >
        <div
          id="popupDialogRejected"
          style={{
            display: "none",
            marginLeft: "auto",
            marginRight: "auto",
            color: "black",
            padding: "10px",
            marginTop: "150px",
            width: "400px",
            zIndex: 999999,
            height: "auto",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <span
            id="CONF_LANG_REJECTED_TITLE"
            style={{ color: "#bf1111", fontSize: "13px", fontWeight: "bold", fontFamily: '"Arial",sans-serif' }}
          >
            The transaction has been rejected
          </span>
          <br />
          <br />
          <span id="CONF_LANG_REJECTED_CONTENT" style={{ fontSize: "11px" }}>
            It seems the transaction has been rejected or canceled.
            <br />
            Feel free to init another swap ! Keep in mind that the rates can quickly change.
            <br />
            <br />
            If you don't have rejected the transaction and you think it's an error, contact us :
            <a href="https://discord.gg/3RbYfFpcfg" style={{ textDecoration: "none" }}>
              https://discord.gg/3RbYfFpcfg
            </a>
          </span>
          <br />
          <input
            id="CONF_LANG_BUTTON_CLOSE"
            type="button"
            onclick="removePopup();"
            style={{
              backgroundColor: "#e46d6d",
              color: "white",
              border: "1px solid #e46d6d",
              cursor: "pointer",
              marginLeft: "330px",
            }}
            defaultValue="Close"
          />
        </div>
        <div
          id="popupDialogSettings"
          style={{
            display: "none",
            marginLeft: "auto",
            marginRight: "auto",
            color: "black",
            padding: "10px",
            marginTop: "150px",
            width: "350px",
            zIndex: 999999,
            height: "auto",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <span
            id="popupTitleSettings"
            style={{ color: "#0f1942", fontSize: "13px", fontWeight: "bold", fontFamily: '"Arial",sans-serif' }}
          >
            <i className="fas fa-cogs" /> <span id="CONF_LANG_SETTINGS_2">Settings</span>
          </span>
          <br />
          <br />
          <table border={0} style={{ fontSize: "12px", width: "100%" }}>
            <tbody>
              <tr style={{ backgroundColor: "#071419", color: "white" }}>
                <td colSpan={2}>
                  <center>General</center>
                </td>
              </tr>
              <tr>
                <td valign="top" style={{ paddingTop: "5px" }} id="CONF_LANG_LANGUAGE">
                  Language
                </td>
                <td style={{ paddingLeft: "10px", paddingTop: "5px" }}>
                  <img
                    src="./img/flag/uk.png"
                    onclick="toEnglish();"
                    style={{ cursor: "pointer", width: "12px" }}
                    title="English"
                  />{" "}
                  &nbsp;
                  <img src="./img/flag/cn.png" style={{ opacity: "0.2", width: "12px" }} title="Chinese" /> &nbsp;
                  <img
                    src="./img/flag/kr.png"
                    onclick="toKorean();"
                    style={{ cursor: "pointer", width: "12px" }}
                    title="Korean"
                  />{" "}
                  &nbsp;
                  <img
                    src="./img/flag/es.png"
                    onclick="toSpanish();"
                    style={{ cursor: "pointer", width: "12px" }}
                    title="Spanish"
                  />{" "}
                  &nbsp;
                  <img src="./img/flag/fr.png" style={{ opacity: "0.2", width: "12px" }} title="French" /> &nbsp;
                  <img
                    src="./img/flag/pt.png"
                    onclick="toPortuguese();"
                    style={{ width: "12px" }}
                    title="Portuguese"
                  />{" "}
                  &nbsp;
                  <img
                    src="./img/flag/ru.png"
                    onclick="toRussian();"
                    style={{ cursor: "pointer", width: "12px" }}
                    title="Russia"
                  />{" "}
                  &nbsp;
                  <br />
                  <br />
                </td>
              </tr>
              <tr style={{ backgroundColor: "#071419", color: "white" }}>
                <td colSpan={2}>
                  <center id="CONF_LANG_TRANSACTIONS">Transactions</center>
                </td>
              </tr>
              <tr>
                <td style={{ paddingTop: "5px" }}>Slippage</td>
                <td style={{ paddingLeft: "10px", paddingTop: "5px" }}>
                  <select id="CONF_SETTINGS_SLIPPAGE" style={{ width: "100%" }}>
                    <option value="0.5" selected>
                      0.5%
                    </option>
                    <option value={1} selected>
                      1%
                    </option>
                    <option value="1.5">1.5%</option>
                    <option value={2}>2%</option>
                    <option value="2.5">2.5%</option>
                    <option value={3}>3%</option>
                    <option value="3.5">3.5%</option>
                    <option value={4}>4%</option>
                    <option value="4.5">4.5%</option>
                    <option value={5}>5%</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Deadline</td>
                <td style={{ paddingLeft: "10px" }}>
                  <select id="CONF_SETTINGS_DEADLINE" style={{ width: "100%" }}>
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={20} selected>
                      20 minutes
                    </option>
                    <option value={25}>25 minutes</option>
                    <option value={30}>30 minutes</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Smart Order Routing</td>
                <td style={{ paddingLeft: "10px" }}>
                  <select id="CONF_SETTINGS_SOR" style={{ width: "100%" }}>
                    <option value={1}>By max price impact % ASC</option>
                    <option value={2}>By sum price impact % ASC</option>
                    <option value={3} selected>
                      By max output DESC
                    </option>
                    <option value={4}>By sum output DESC </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Max hops</td>
                <td style={{ paddingLeft: "10px" }}>
                  <select id="CONF_SETTINGS_MAX_HOPS" style={{ width: "100%" }}>
                    <option value={1}>1 hop : [A]-&gt;[B]</option>
                    <option value={2} selected>
                      2 hops : [A]-&gt;[B]-&gt;[C]
                    </option>
                    <option value={3}>3 hops : [A]-&gt;[B]-&gt;[C]-&gt;[D]</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Gas Price</td>
                <td style={{ paddingLeft: "10px" }}>
                  <select id="CONF_SETTINGS_GAS_PRICE" style={{ width: "100%" }}>
                    {/*?php
            $gp = 40;
            while($gp <= 600) {
              if($gp == 120) { $selected = "selected"; } else { $selected = ""; }
              echo '<option value="'.$gp.'" '.$selected.'*/}
                    '.$gp.''; $gp = $gp+20;
                    {"}"}
                    ?&gt;
                  </select>
                </td>
              </tr>
              <tr>
                <td>Gas Limit</td>
                <td style={{ paddingLeft: "10px" }}>
                  <select id="CONF_SETTINGS_GAS_LIMIT" style={{ width: "100%" }}>
                    {/*?php
            $gp = 120000;
            while($gp <= 400000) {
              if($gp == 200000) { $selected = "selected"; } else { $selected = ""; }
              echo '<option value="'.$gp.'" '.$selected.'*/}
                    '.$gp.''; $gp = $gp+20000;
                    {"}"}
                    ?&gt;
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <input
            id="CONF_LANG_BUTTON_CLOSE_2"
            type="button"
            onclick="removePopup();"
            style={{
              backgroundColor: "#e46d6d",
              color: "white",
              border: "1px solid #e46d6d",
              cursor: "pointer",
              marginLeft: "280px",
            }}
            defaultValue="Close"
          />
        </div>
        <div
          id="popupDialogTransactionAccepted"
          style={{
            display: "none",
            marginLeft: "auto",
            marginRight: "auto",
            color: "black",
            padding: "10px",
            marginTop: "80px",
            width: "400px",
            zIndex: 999999,
            height: "auto",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <span
            id="popupTitleAccepted"
            style={{ color: "green", fontSize: "13px", fontWeight: "bold", fontFamily: '"Arial",sans-serif' }}
          >
            <i className="fas fa-road" /> Your swap is on the way !
          </span>
          <br />
          <br />
          <span id="popupContentAccepted" style={{ fontSize: "11px" }}>
            <span id="CONF_LANG_ACCEP_1">Here we are, your</span>{" "}
            <a id="CONFIRMATION_TX_LINK" href style={{ textDecoration: "none" }}>
              transaction is now in the mempool.
            </a>{" "}
            <br />
            <br />
            <span id="CONF_LANG_ACCEP_2" style={{ backgroundColor: "black", color: "white", padding: "2px" }}>
              Transaction summary{" "}
            </span>
            <br />
            <br />
            <span id="CONF_LANG_ACCEP_3">You have sent</span> <b id="CONFIRMATION_SENT" />,
            <span id="CONF_LANG_ACCEP_4">
              and you will receive <u>at least</u>
            </span>{" "}
            <b id="CONFIRMATION_MINIMUM" />.
            <br />
            <br />
            <span style={{ backgroundColor: "black", color: "white", padding: "2px" }} id="CONF_LANG_ACCEP_5">
              What's next ?
            </span>
            <br />
            <br />
            <span id="CONF_LANG_ACCEP_6">
              You just need to wait !<br />
              Keep in mind that, sometimes, when the price has a big move, your transaction can be reverted. You will
              get back what you sent automatically. <br />
              This is a measure to protect you in the case where you should receive less than what you want.
            </span>
            <br />
            <br />
            If you have any questions, contact us :
            <a href="https://discord.gg/3RbYfFpcfg" style={{ textDecoration: "none" }}>
              https://discord.gg/3RbYfFpcfg
            </a>
          </span>
          <br />
          <input
            id="CONF_LANG_BUTTON_CLOSE_3"
            type="button"
            onclick="removePopup();"
            style={{
              backgroundColor: "#e46d6d",
              color: "white",
              border: "1px solid #e46d6d",
              cursor: "pointer",
              marginLeft: "330px",
            }}
            defaultValue="Close"
          />
        </div>
        <div
          id="popupDialogApprovalAccepted"
          style={{
            display: "none",
            marginLeft: "auto",
            marginRight: "auto",
            color: "black",
            padding: "10px",
            marginTop: "80px",
            width: "400px",
            zIndex: 999999,
            height: "auto",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <span
            id="popupTitle"
            style={{ color: "green", fontSize: "13px", fontWeight: "bold", fontFamily: '"Arial",sans-serif' }}
          >
            <i className="fas fa-check-double" /> You have just authorized SushiSwap !
          </span>
          <br />
          <br />
          <span id="popupContent" style={{ fontSize: "11px" }}>
            Thank you for your trust, you just authorized SushiSwap to spend, always with your permission, your tokens.
            Your{" "}
            <a id="APPROVE_TX_LINK" href style={{ textDecoration: "none" }}>
              transaction is now in the mempool.
            </a>{" "}
            <br />
            <br />
            <span style={{ backgroundColor: "black", color: "white", padding: "2px" }}>What's next ?</span>
            <br />
            <br />
            You just need to wait !<br />
            When the authorization will be accepted by the contract, you will be able to swap this token.
            <br />
            <br />
            <b>You will not need to do again this action for this Token, your address is now whitelisted !</b>
            <br />
            <br />
            If you have any questions, contact us :
            <a href="https://discord.gg/3RbYfFpcfg" style={{ textDecoration: "none" }}>
              https://discord.gg/3RbYfFpcfg
            </a>
          </span>
          <br />
          <br />
          <input
            id="CONF_LANG_BUTTON_CLOSE_4"
            type="button"
            onclick="removePopup();"
            style={{
              backgroundColor: "#e46d6d",
              color: "white",
              border: "1px solid #e46d6d",
              cursor: "pointer",
              marginLeft: "350px",
            }}
            defaultValue="Close"
          />
        </div>
      </div>
    </>
  );
};

const Header = () => {
  return (
    <>
      <div id="HEADER_BAR">
        <div id="LOGO">
          <table border={0}>
            <tbody>
              <tr>
                <td valign="top">
                  <img src="./img/newlogo.png" style={{ marginLeft: "10px", width: "30px" }} />
                </td>
                <td style={{ paddingLeft: "5px" }}>
                  <span style={{ fontSize: "20px" }}>sushiPRO</span>
                  <span style={{ fontSize: "7px", marginTop: "0px", marginLeft: "2px", position: "absolute" }}>
                    swap like a pro
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="SETTINGS">
          <table border={0}>
            <tbody>
              <tr>
                <td>
                  <div
                    id="HELP_META"
                    style={{
                      zIndex: 5,
                      display: "none",
                      position: "absolute",
                      marginTop: "25px",
                      marginLeft: "-50px",
                      padding: "5px",
                      borderRadius: "10px",
                      backgroundColor: "black",
                      opacity: "0.8",
                      color: "yellow",
                      fontSize: "10px",
                    }}
                  >
                    Nothing happened ? It's probably a bug from MetaMask.
                    <br />
                    You just need to refresh the page.
                  </div>
                  <div
                    id="SET_WALLET"
                    onmouseout="$('#HELP_META').hide();$(this).css('opacity', '1');"
                    onmouseover="if($('#isUserConnected').val() == 0 ) { $('#HELP_META').show(); } else { }  $(this).css('opacity', '0.9');"
                    onclick="onClickConnect();"
                    style={{
                      cursor: "pointer",
                      fontSize: "12px",
                      textAlign: "center",
                      padding: "10px",
                      backgroundColor: "rgb(30, 89, 177)",
                      color: "white",
                      borderRadius: "10px",
                      outline: "none",
                      border: "0px",
                      minWidth: "150px",
                    }}
                  >
                    <i className="fas fa-wallet" /> &nbsp; Connect your wallet
                  </div>
                </td>
                <td>
                  <div
                    onmouseout="$(this).css('opacity', '1');"
                    onmouseover="$(this).css('opacity', '0.6');"
                    onclick="openSettings();"
                    style={{
                      cursor: "pointer",
                      fontSize: "12px",
                      textAlign: "center",
                      padding: "10px",
                      backgroundColor: "#1e59b142",
                      color: "white",
                      borderRadius: "10px",
                      outline: "none",
                      border: "0px",
                      width: "auto",
                    }}
                  >
                    <i className="fas fa-cogs" /> &nbsp; <span id="CONF_LANG_SETTINGS">Settings</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const Info = () => {
  return (
    <>
      {" "}
      <div id="INFO_BAR">
        <table border={0} style={{ position: "absolute", right: "15px" }} dir="rtl">
          <tbody>
            <tr>
              <td style={{ width: "120px" }} id="CONF_LANG_PAIR_LIQ">
                Pair liquidity
              </td>
              <td style={{ width: "140px" }} id="CONF_LANG_PAIR_AVBL">
                Direct pair available
              </td>
              <td style={{ width: "120px" }} id="CONF_LANG_PAIR_SELECT">
                Select a Token
              </td>
            </tr>
            <tr>
              <td style={{ width: "120px", color: "#5ae6da", border: "0px", fontSize: "10px" }} id="CURRENT_RESERV">
                <span style={{ color: "red" }}>
                  <i className="fas fa-spinner fa-spin" />
                </span>
              </td>
              <td style={{ width: "140px" }}>
                <select
                  name="TOKEN_PAIRS"
                  id="TOKEN_PAIRS"
                  onchange="changePair();"
                  style={{
                    cursor: "pointer",
                    outline: "none",
                    backgroundColor: "black",
                    color: "#5ae6da",
                    border: "0px",
                    fontSize: "10px",
                    width: "100px",
                  }}
                />
              </td>
              <td style={{ width: "120px" }}>
                <select
                  name="TOKEN_LIST"
                  id="TOKEN_LIST"
                  onchange="changeToken();"
                  style={{
                    cursor: "pointer",
                    outline: "none",
                    backgroundColor: "black",
                    color: "#5ae6da",
                    border: "0px",
                    fontSize: "10px",
                    width: "100px",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table border={0}>
          <tbody>
            <tr>
              <td style={{ width: "120px" }} id="CONF_LANG_LIQ_USD">
                Liquidity USD{" "}
              </td>
              <td style={{ width: "120px" }} id="CONF_LANG_LIQ_ETH">
                Liquidity ETH
              </td>
              <td style={{ width: "120px" }} id="CONF_LANG_LIQ_NB_PAIR">
                Number of pairs
              </td>
            </tr>
            <tr>
              <td style={{ width: "120px", color: "#5ae6da" }} id="LIQ_USD">
                <span style={{ color: "red" }}>
                  <i className="fas fa-spinner fa-spin" />
                </span>
              </td>
              <td style={{ width: "120px", color: "#5ae6da" }} id="LIQ_ETH">
                <span style={{ color: "red" }}>
                  <i className="fas fa-spinner fa-spin" />
                </span>
              </td>
              <td style={{ width: "120px", color: "#5ae6da" }} id="NB_PAIRS">
                <span style={{ color: "red" }}>
                  <i className="fas fa-spinner fa-spin" />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            position: "relative",
            backgroundColor: "white",
            paddingTop: "5px",
            color: "black",
            marginTop: "-43px",
            height: "45px",
            width: "200px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <center>
            <div style={{ display: "none" }} id="PRICE_INFO_PAIRS" value={0} />
            <table border={0}>
              <tbody>
                <tr>
                  <td style={{ width: "95px", textAlign: "center", fontWeight: "bold" }} id="PAIR_1">
                    <i className="fas fa-spinner fa-spin" />
                  </td>
                  <td />
                  <td style={{ width: "95px", textAlign: "center", fontWeight: "bold" }} id="PAIR_2">
                    <i className="fas fa-spinner fa-spin" />
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "95px", textAlign: "center", fontSize: "10px" }} id="PRICE_PAIR_1">
                    <i className="fas fa-spinner fa-spin" />
                  </td>
                  <td />
                  <td style={{ width: "95px", textAlign: "center", fontSize: "10px" }} id="PRICE_PAIR_2">
                    <i className="fas fa-spinner fa-spin" />
                  </td>
                </tr>
              </tbody>
            </table>
          </center>
        </div>
      </div>
    </>
  );
};

const Original = () => {
  return (
    <>
      <div>
        {/*?php include('./inc/fonctions.php'); ?*/}
        <input id="SWAP_MINIMUM_RECEIVED" autoComplete="off" type="hidden" defaultValue={0} />
        <input id="SWAP_BEST_ROUTE" autoComplete="off" type="hidden" defaultValue={0} />
        <input id="SWAP_INPUT_DECIMALS" autoComplete="off" type="hidden" defaultValue={0} />
        <input id="SWAP_OUTPUT_DECIMALS" autoComplete="off" type="hidden" defaultValue={0} />
        <input id="isBloaded" type="hidden" autoComplete="off" defaultValue={0} />
        <Popup />
        <Header />
        <Info />
        <div id="RIGHT_SIDE" style={{ position: "absolute", width: "30%", right: 0, backgroundColor: "black" }}>
          <div
            style={{
              width: "100%",
              height: "17px",
              fontSize: "14px",
              padding: "10px",
              paddingTop: "13px",
              backgroundColor: "white",
              color: "black",
            }}
          >
            <span
              id="CONF_LANG_MARKET_FEES"
              style={{
                position: "absolute",
                right: "10px",
                backgroundColor: "#1e59b1ab",
                color: "white",
                padding: "3px",
                marginTop: "0px",
                fontSize: "10px",
              }}
            >
              Fees: 0.3% per hop
            </span>
            <b>SWAP //</b>{" "}
            <span style={{ fontSize: "12px" }} id="CONF_LANG_MARKET_ORDER">
              market order
            </span>{" "}
            <i className="fas fa-info-circle" style={{ fontSize: "12px", color: "grey" }} />
          </div>
          <br />
          <table border={0} style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td style={{ width: "50%", fontSize: "12px" }} id="CONF_LANG_FROM">
                  From
                </td>
                <td style={{ paddingLeft: "10px", width: "50%", fontSize: "12px" }} id="CONF_LANG_TO">
                  To ( estimated )
                </td>
              </tr>
              <tr>
                <td style={{ width: "50%", fontSize: "12px" }}>
                  <input
                    autoComplete="off"
                    id="SWAP_INPUT_TOKEN_AMOUNT"
                    inputMode="decimal"
                    type="text"
                    defaultValue
                    placeholder={"00.00"}
                    style={{
                      float: "left",
                      height: "20px",
                      backgroundColor: "transparent",
                      padding: "5px",
                      border: "1px solid white",
                      outline: "none",
                      color: "white",
                      width: "50%",
                    }}
                  />
                  <select
                    onchange="getPriceAndRoute();"
                    id="SWAP_INPUT_TOKEN"
                    style={{
                      cursor: "pointer",
                      fontSize: "12px",
                      height: "32px",
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                      backgroundColor: "white",
                      padding: "5px",
                      width: "40%",
                      border: "0px",
                      outline: "none",
                      marginLeft: "-3px",
                    }}
                  >
                    <option name="FROM_ETH" value="FROM_ETH">
                      ETH
                    </option>
                  </select>
                </td>
                <td style={{ paddingLeft: "10px", width: "50%", fontSize: "12px" }}>
                  <div
                    id="OUTPUT_WAITING"
                    style={{
                      display: "none",
                      position: "absolute",
                      zIndex: 999,
                      opacity: "0.5",
                      paddingTop: "8px",
                      fontSize: "14px",
                      color: "white",
                      backgroundColor: "black",
                      width: "98px",
                      height: "24px",
                    }}
                  >
                    <center>
                      <i className="fas fa-spinner fa-spin" />
                    </center>
                  </div>
                  <input
                    autoComplete="off"
                    id="SWAP_OUTPUT_TOKEN_AMOUNT"
                    type="text"
                    disabled
                    placeholder={0.0}
                    style={{
                      float: "left",
                      height: "20px",
                      backgroundColor: "transparent",
                      padding: "5px",
                      border: "1px solid white",
                      outline: "none",
                      color: "white",
                      width: "50%",
                    }}
                  />
                  <select
                    onchange="getPriceAndRoute();"
                    id="SWAP_OUTPUT_TOKEN"
                    style={{
                      cursor: "pointer",
                      fontSize: "12px",
                      height: "32px",
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                      backgroundColor: "white",
                      padding: "5px",
                      width: "40%",
                      border: "0px",
                      outline: "none",
                      marginLeft: "-3px",
                    }}
                  >
                    <option name="TO_ETH" value="TO_ETH">
                      ETH
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td style={{ fontSize: "10px" }}>
                  <br />
                  <table border={0} style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        <td id="CONF_LANG_MARKET_MINIMUM">Minimum</td>{" "}
                        <td dir="rtl" id="TD_MIN_RECEIVE">
                          {" "}
                        </td>
                      </tr>
                      <tr>
                        <td>Sum PI</td>{" "}
                        <td dir="rtl" id="TD_SUM_PRICE_IMPACT">
                          {" "}
                        </td>
                      </tr>
                      <tr>
                        <td>Max PI</td>{" "}
                        <td dir="rtl" id="TD_MAX_PRICE_IMPACT">
                          {" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td style={{ paddingLeft: "10px" }}>
                  <div
                    id="BUTTON_TO_SEND_SWAP"
                    onmouseout="$(this).css('opacity', '1');"
                    onmouseover="$(this).css('opacity', '0.9');"
                    onclick="getPriceAndRoute(777);"
                    style={{
                      cursor: "pointer",
                      fontSize: "12px",
                      textAlign: "center",
                      padding: "10px",
                      marginTop: "10px",
                      backgroundColor: "#1eb1aa",
                      color: "white",
                      outline: "none",
                      border: "0px",
                      width: "85%",
                    }}
                  >
                    SWAP NOW
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <div
            style={{
              width: "100%",
              height: "17px",
              fontSize: "14px",
              padding: "10px",
              paddingTop: "13px",
              backgroundColor: "white",
              color: "black",
            }}
          >
            <b>MARKET //</b>{" "}
            <span style={{ fontSize: "12px" }} id="CONF_LANG_LAST_TRADE">
              last trades on sushiswap
            </span>{" "}
            <i className="fas fa-info-circle" style={{ fontSize: "12px", color: "grey" }} />
          </div>
          <div
            id="the_table_last_transactions"
            style={{ height: "360px", overflowY: "scroll", padding: "2px", backgroundColor: "black" }}
          >
            <table id="all_last_transactions" border={0} style={{ width: "100%", fontSize: "11px" }}></table>
          </div>
          {/* START Wallet bloc !*/}
          <div id="WALLET_BLOC" style={{ display: "none" }}>
            <div
              style={{
                width: "100%",
                height: "17px",
                fontSize: "14px",
                padding: "10px",
                paddingTop: "13px",
                backgroundColor: "white",
                color: "black",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  right: "10px",
                  backgroundColor: "#1e59b1ab",
                  color: "white",
                  padding: "3px",
                  marginTop: "0px",
                  fontSize: "10px",
                  cursor: "pointer",
                  borderRadius: "2px",
                }}
                onclick="updateBalanceERC20();"
                onmouseover="$(this).css('opacity', '1').css('background-color', '#1e59b1');"
                onmouseout="$(this).css('opacity', '0.7');"
              >
                <i className="fas fa-sync" /> Click to refresh{" "}
              </span>
              <b>WALLET //</b>{" "}
              <span style={{ fontSize: "12px" }} id="CONF_LANG_PORTFOLIO">
                portfolio &amp; last transactions
              </span>{" "}
              <i className="fas fa-info-circle" style={{ fontSize: "12px", color: "grey" }} />
            </div>
            <div
              id="Notif_pending"
              style={{
                display: "none",
                fontSize: "12px",
                width: "384px",
                backgroundColor: "#84af95bd",
                padding: "5px",
              }}
            ></div>
            <style
              type="text/css"
              dangerouslySetInnerHTML={{
                __html:
                  "\n\t\t\t\t.dd-option-image { vertical-align: middle; float: left; margin-right: 10px; max-width: 40px; }\n\t\t\t\t.dd-selected-image { vertical-align: middle; float: left; margin-right: 10px; max-width: 40px; }\n\t\t\t\t.dd-select { border:0px; }\n\t\t\t\t\n\t\t\t\t",
              }}
            />
            <div id="LOAD_BALANCE" style={{ width: "100%", opacity: "0.8" }}>
              <div id="loadedERC20Bal" style={{ display: "none" }} />
              <div style={{ position: "absolute", right: "10px", fontSize: "25px", zIndex: 999, marginTop: "17px" }}>
                <i style={{ color: "white" }} className="fas fa-spinner fa-spin" />
              </div>
              <select id="viewErc20BalanceLOADING" style={{ height: "20px", backgroundColor: "black" }}>
                <option
                  value={0}
                  data-imagesrc="https://tokens.1inch.exchange/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png"
                  id="CONF_LANG_SELECT_WALLET"
                  data-description="loading..."
                >
                  My wallet
                </option>
              </select>
            </div>
            <div id="Wallet_erc20_balance" style={{ width: "100%", display: "none" }}>
              <select id="viewErc20Balance" style={{ height: "20px", backgroundColor: "black" }}>
                <option
                  value={0}
                  data-imagesrc="https://tokens.1inch.exchange/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png"
                  id="CONF_LANG_SELECT_WALLET_2"
                  data-description="Click here to view your tokens"
                >
                  My wallet
                </option>
              </select>
            </div>
            <div
              id="Transactions_list"
              style={{ width: "100%", backgroundColor: "black", height: "120px", overflowY: "scroll" }}
            >
              <table
                id="table_transactions_wallet"
                style={{ width: "100%", fontSize: "11px", padding: "2px", backgroundColor: "black" }}
              >
                <tbody>
                  <tr>
                    <td style={{ height: "90px" }}>
                      <center>
                        <span style={{ color: "red" }}>
                          <i className="fas fa-spinner fa-spin" />
                        </span>
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* END Wallet bloc !*/}
        </div>
        <div
          id="LEFT_CHARTS_ARBITRAGE"
          style={{
            display: "none",
            height: "600px",
            width: "70%",
            backgroundColor: "#071419",
            borderTop: "1px solid white",
          }}
        >
          <div
            onmouseout="$(this).css('opacity', '1');"
            onmouseover="$(this).css('opacity', '0.6');"
            onclick="backToTV();"
            style={{
              position: "absolute",
              cursor: "pointer",
              fontSize: "12px",
              textAlign: "center",
              padding: "10px",
              backgroundColor: "rgba(30, 89, 177, 0.26)",
              color: "white",
              borderRadius: "10px",
              outline: "none",
              border: "0px",
              width: "150px",
              marginTop: "22px",
              marginLeft: "10px",
              opacity: 1,
            }}
          >
            <i className="fas fa-home" /> &nbsp; Back to TradingView
          </div>
          <br />
          <center>
            <span style={{ color: "#5ae6da" }}>Arbitrage opportunities</span>
            <br />
            <span style={{ fontSize: "12px" }}>Spread between the price in SushiSwap &amp; Exchanges</span>
          </center>
          <br />
          <div style={{ width: "98%", height: "590px", padding: "10px", fontSize: "12px" }}>
            <table border={0} style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td></td>
                  <td style={{ padding: "5px", backgroundColor: "#1E2026" }}>WETH / USDT</td>
                  <td style={{ padding: "5px", backgroundColor: "#1E2026" }}>WETH / USDC</td>
                  <td style={{ padding: "5px", backgroundColor: "#1E2026" }}>WETH / DAI</td>
                  <td style={{ padding: "5px", backgroundColor: "#1E2026" }}>WETH / LINK</td>
                  <td style={{ padding: "5px", backgroundColor: "#1E2026" }}>WETH / WBTC</td>
                </tr>
                <tr>
                  <td style={{ width: "100px", padding: "10px", backgroundColor: "#1E2026" }}>
                    <img src="./img/newlogo.png" style={{ width: "15px", float: "left" }} /> &nbsp;sushiPRO
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      id="SUSHIPRO_ETHUSDT"
                      type="text"
                      style={{
                        color: "white",
                        fontSize: "10px",
                        border: "0px",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      defaultValue="loading..."
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      id="SUSHIPRO_ETHUSDC"
                      type="text"
                      style={{
                        color: "white",
                        fontSize: "10px",
                        border: "0px",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      defaultValue="loading..."
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      id="SUSHIPRO_ETHDAI"
                      type="text"
                      style={{
                        color: "white",
                        fontSize: "10px",
                        border: "0px",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      defaultValue="loading..."
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      id="SUSHIPRO_LINKETH"
                      type="text"
                      style={{
                        color: "white",
                        fontSize: "10px",
                        border: "0px",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      defaultValue="loading..."
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      id="SUSHIPRO_WBTCETH"
                      type="text"
                      style={{
                        width: "100%",
                        color: "white",
                        fontSize: "10px",
                        border: "0px",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      defaultValue="loading..."
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "100px", padding: "10px", color: "#F0B90B", backgroundColor: "#1E2026" }}>
                    <img src="./img/bnb.png" style={{ width: "15px", float: "left" }} />
                    &nbsp;Binance
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      id="BINANCE_ETHUSDT"
                      type="text"
                      style={{
                        width: "100%",
                        color: "white",
                        fontSize: "10px",
                        border: "0px",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      defaultValue="waiting..."
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      id="BINANCE_ETHUSDC"
                      type="text"
                      style={{
                        width: "100%",
                        color: "white",
                        fontSize: "10px",
                        border: "0px",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      defaultValue="waiting..."
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      id="BINANCE_ETHDAI"
                      type="text"
                      style={{
                        width: "100%",
                        color: "white",
                        fontSize: "10px",
                        border: "0px",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      defaultValue="waiting..."
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      id="BINANCE_LINKETH"
                      type="text"
                      style={{
                        width: "100%",
                        color: "white",
                        fontSize: "10px",
                        border: "0px",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      defaultValue="waiting..."
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      id="BINANCE_WBTCETH"
                      type="text"
                      style={{
                        width: "100%",
                        color: "white",
                        fontSize: "10px",
                        border: "0px",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      defaultValue="waiting..."
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "100px", padding: "10px", color: "#5ae6da", backgroundColor: "#1E2026" }}>
                    <i className="fas fa-expand-alt" />
                    &nbsp; Spread
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      id="SPREAD_BINANCE_ETHUSDT"
                      type="text"
                      style={{
                        width: "100%",
                        color: "white",
                        fontSize: "10px",
                        border: "0px",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      defaultValue
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      id="SPREAD_BINANCE_ETHUSDC"
                      type="text"
                      style={{
                        width: "100%",
                        color: "white",
                        fontSize: "10px",
                        border: "0px",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      defaultValue
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      id="SPREAD_BINANCE_ETHDAI"
                      type="text"
                      style={{
                        width: "100%",
                        color: "white",
                        fontSize: "10px",
                        border: "0px",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      defaultValue
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      id="SPREAD_BINANCE_LINKETH"
                      type="text"
                      style={{
                        width: "100%",
                        color: "white",
                        fontSize: "10px",
                        border: "0px",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      defaultValue
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      id="SPREAD_BINANCE_WBTCETH"
                      type="text"
                      style={{
                        width: "100%",
                        color: "white",
                        fontSize: "10px",
                        border: "0px",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      defaultValue
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="ARBITRAGE_PRICE" style={{ display: "none" }} />
        </div>
        <div
          id="ARBITRAGE_LINK"
          onclick="viewArbitrage();"
          onmouseover="$(this).css('color', 'rgb(30, 89, 177)')"
          onmouseout="$(this).css('color', '#7b7b7d');"
          style={{
            display: "none",
            cursor: "pointer",
            position: "absolute",
            zIndex: 9,
            color: "#7b7b7d",
            fontSize: "12px",
            marginLeft: "513px",
            marginTop: "1px",
            borderRight: "1px solid #353538",
            height: "24px",
            paddingTop: "13px",
            paddingRight: "10px",
          }}
        >
          ARBITRAGE OPPORTUNITIES
        </div>
        <div id="LEFT_CHARTS" style={{ height: "600px", width: "70%" }}></div>
        <div
          className="BAR_LI"
          id="QUANT_BAR"
          style={{ zIndex: 10, position: "relative", borderTop: "1px solid white" }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "white",
              paddingTop: "5px",
              color: "black",
              marginTop: "-5px",
              height: "45px",
              width: "200px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <center
              id="CONF_LANG_QUANT"
              style={{ fontWeight: "bold", fontSize: "14px", fontFamily: '"Arial",sans-serif' }}
            >
              QUANT AREA
            </center>
            <center id="CONF_LANG_DESC_QUANT" style={{ fontSize: "10px" }}>
              Farming APY, state of the network, Sushiswap data...
            </center>
          </div>
        </div>
        <div id="QUANT_AREA" style={{ width: "100%", background: "linear-gradient(to bottom, #243B55, #141E30)" }}>
          <div id="QUANT_RIGHT" style={{ position: "absolute", right: 0, width: "50%", height: "600px" }}>
            <div style={{ position: "absolute", right: "20px", marginTop: "20px", width: "95%", zIndex: 3 }} dir="rtl">
              <span style={{ color: "white" }}>
                <span id="CONF_LANG_QUANT_LIQ">Liquidity by pairs</span>
                <br />
                <span id="CONF_LANG_QUANT_RIGHT_DESC" style={{ fontSize: "10px" }}>
                  Check the reserve of each pairs available, data collected in real time
                </span>
              </span>
              <br />
              <br />
              <div
                style={{
                  border: "1px solid #ffffff30",
                  width: "90%",
                  height: "25px",
                  padding: "5px",
                  marginTop: "6px",
                }}
                dir="ltr"
              >
                <div style={{ position: "absolute", marginLeft: "110px", width: "80%", fontSize: "11px" }}>
                  <select
                    onmouseout="$(this).css('opacity', '1');"
                    onmouseover="$(this).css('opacity', '0.6');"
                    id="QUANT_RESERVE_PAIR"
                    onchange="viewQuantPairs();"
                    style={{
                      outline: "none",
                      cursor: "pointer",
                      border: "0px",
                      color: "white",
                      width: "85%",
                      padding: "5px",
                      backgroundColor: "transparent",
                    }}
                  ></select>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ffffff30",
                    padding: "7px",
                    color: "white",
                    fontSize: "11px",
                    width: "15%",
                  }}
                >
                  Select a pair
                </div>
              </div>
              <br />
              <div id="TABLE_QUANT_PAIRS">
                <center>
                  {" "}
                  <i style={{ fontSize: "20px" }} className="fas fa-spinner fa-spin" />
                </center>
              </div>
              <br />
              <br />
              <span style={{ color: "white" }}>
                <span id="CONF_LANG_ETH_NET">Ethereum network</span>
                <br />
                <span id="CONF_LANG_AVERAGE_GAS" style={{ fontSize: "10px" }}>
                  Average Gas price
                </span>
              </span>
              <br />
              <br />
              <div id="QUANT_ETH_GAS" dir="ltr">
                <center>
                  {" "}
                  <i style={{ fontSize: "20px" }} className="fas fa-spinner fa-spin" />
                </center>
              </div>
            </div>
          </div>
          <div id="QUANT_LEFT" style={{ width: "50%", height: "650px", borderRight: "0.5px dashed #071419" }}>
            <div style={{ position: "absolute", marginLeft: "20px", marginTop: "20px", width: "100%" }}>
              <span style={{ color: "white" }}>
                <span id="CONF_LANG_QUANT_LEFT_TITLE">Farming : Annual Percentage Yield</span>
                <br />
                <span id="CONF_LANG_QUANT_LEFT_DESC" style={{ fontSize: "10px" }}>
                  Sorted by APY DESC, data collected in real-time
                </span>
              </span>
              <br />
              <br />
              <table border={0} id="MASTER_APY" style={{ width: "48%" }}>
                <tbody>
                  <tr>
                    <td valign="top" style={{ width: "50%" }}>
                      <table border={0} id="TABLE_APY_LEFT" style={{ width: "100%" }}>
                        <tbody>
                          <tr style={{ fontSize: "11px" }}>
                            <td />
                            <td style={{ backgroundColor: "#ffffff30" }} id="CONF_LANG_RESERVE">
                              Reserve
                            </td>
                            <td style={{ backgroundColor: "#ffffff30" }} id="CONF_LANG_DAILY">
                              Daily
                            </td>
                            <td style={{ backgroundColor: "#ffffff30" }} id="CONF_LANG_MONTHLY">
                              Monthly
                            </td>
                            <td style={{ backgroundColor: "#ffffff30" }} id="CONF_LANG_YEARLY">
                              Yearly
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td valign="top" style={{ width: "50%", paddingLeft: "10px" }}>
                      <table border={0} id="TABLE_APY_RIGHT" style={{ width: "100%" }}>
                        <tbody>
                          <tr style={{ fontSize: "11px" }}>
                            <td />
                            <td style={{ backgroundColor: "#ffffff30" }} id="CONF_LANG_RESERVE_2">
                              Reserve
                            </td>
                            <td style={{ backgroundColor: "#ffffff30" }} id="CONF_LANG_DAILY_2">
                              Daily
                            </td>
                            <td style={{ backgroundColor: "#ffffff30" }} id="CONF_LANG_MONTHLY_2">
                              Monthly
                            </td>
                            <td style={{ backgroundColor: "#ffffff30" }} id="CONF_LANG_YEARLY_2">
                              Yearly
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="BAR_LI" id="FAQ_BAR" style={{ zIndex: 10, position: "relative" }}>
          <div
            style={{
              position: "relative",
              backgroundColor: "white",
              paddingTop: "5px",
              color: "black",
              marginTop: "-5px",
              height: "45px",
              width: "200px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <center
              id="CONF_LANG_FAQ"
              style={{ fontWeight: "bold", fontSize: "14px", fontFamily: '"Arial",sans-serif', marginTop: "5px" }}
            >
              FAQ
            </center>
            <center id="CONF_LANG_FAQ_DESC" style={{ fontSize: "10px" }}>
              What you read is what you know
            </center>
          </div>
        </div>
        <div
          id="FAQ_AREA"
          style={{ height: "auto", width: "100%", background: "linear-gradient(to bottom, #141E30, #314755)" }}
        >
          <div style={{ position: "absolute", marginTop: "10px", marginLeft: "20px", width: "50%" }}>
            <span style={{ color: "white" }}>
              API : Routes, Reserve &amp; APY
              <br />
              <span style={{ fontSize: "10px" }} id="CONF_LANG_EASIEST">
                The easiest way to get sushiswap data
              </span>
            </span>
            <br />
            <br />
            <span style={{ fontSize: "12px" }} id="CONF_LANG_FAQ_DISCORD">
              Contact us on Discord to obtain an API key and the full documentation
            </span>
            <br />
            <br />
            <div
              style={{ backgroundColor: "#3f474e", color: "white", width: "90%", padding: "10px", fontSize: "12px" }}
            >
              Get routes
            </div>
            <div
              style={{
                width: "90%",
                border: "0px solid white",
                backgroundColor: "black",
                padding: "10px",
                fontSize: "11px",
                color: "#dada49",
              }}
            >
              curl -XPOST -d 'quantity=10&amp;token_input=SUSHI&amp;token_output=WETH&amp;api_key=XnQNSUInd913'
              'https://api.sushipro.io/get_route'
            </div>
            <br />
            <br />
            <div
              style={{ backgroundColor: "#3f474e", color: "white", width: "90%", padding: "10px", fontSize: "12px" }}
            >
              Get APY
            </div>
            <div
              style={{
                width: "90%",
                border: "0px solid white",
                backgroundColor: "black",
                padding: "10px",
                fontSize: "11px",
                color: "#dada49",
              }}
            >
              curl -XPOST -d 'api_key=XnQNSUInd913' 'https://api.sushipro.io/get_apy'
            </div>
            <br />
            <br />
            <div
              style={{ backgroundColor: "#3f474e", color: "white", width: "90%", padding: "10px", fontSize: "12px" }}
            >
              Get reserve
            </div>
            <div
              style={{
                width: "90%",
                border: "0px solid white",
                backgroundColor: "black",
                padding: "10px",
                fontSize: "11px",
                color: "#dada49",
              }}
            >
              curl -XPOST -d 'pair_id=0x795065dcc9f64b5614c407a6efdc400da6221fb0&amp;api_key=XnQNSUInd913'
              'https://api.sushipro.io/get_reserve'
            </div>
          </div>
          <div style={{ position: "relative", marginTop: "20px", marginLeft: "52%", width: "47%" }}>
            <div style={{ width: "100%" }} dir="rtl">
              <span style={{ color: "white" }}>
                <span id="CONF_LANG_FREQUENTLY">Frequently Asked Questions</span>
                <br />
                <span id="CONF_LANG_FREQUENTLY_DESC" style={{ fontSize: "10px" }}>
                  Feel free to contact us to have more details
                </span>
              </span>
            </div>
            <br />
            <table border={0} style={{ cursor: "pointer", fontSize: "12px", width: "100%" }}>
              <tbody>
                <tr>
                  <td
                    onmouseover="$(this).css('opacity', '1');"
                    onmouseout="$(this).css('opacity', '0.8');"
                    onclick="$('#F_1').fadeIn();"
                    style={{ opacity: "0.8", backgroundColor: "white", padding: "10px", color: "black" }}
                  >
                    What is sushiPRO ?
                  </td>
                </tr>
                <tr>
                  <td id="F_1" style={{ display: "none", padding: "10px", color: "white" }}>
                    sushiPRO is a simple and intuitive UI allowing you to interact with sushiswap.
                  </td>
                </tr>
                <tr>
                  <td
                    onmouseover="$(this).css('opacity', '1');"
                    onmouseout="$(this).css('opacity', '0.8');"
                    onclick="$('#F_2').fadeIn();"
                    style={{ opacity: "0.8", backgroundColor: "white", padding: "10px", color: "black" }}
                  >
                    Why am I being asked to authorize sushiPRO to spend my tokens ?
                  </td>
                </tr>
                <tr>
                  <td id="F_2" style={{ display: "none", padding: "10px", color: "white" }}>
                    If a contract want to interact with a token, an authorization <b>must be</b> registered by this
                    token. <br />
                    Without this, the contract would be technically unable to interact with the token you wish to
                    exchange.
                    <br />
                    This authorization is <b>only required once.</b>
                  </td>
                </tr>
                <tr>
                  <td
                    onmouseover="$(this).css('opacity', '1');"
                    onmouseout="$(this).css('opacity', '0.8');"
                    onclick="$('#F_3').fadeIn();"
                    style={{ opacity: "0.8", backgroundColor: "white", padding: "10px", color: "black" }}
                  >
                    How does a transaction take place ?
                  </td>
                </tr>
                <tr>
                  <td id="F_3" style={{ display: "none", padding: "10px", color: "white" }}>
                    First, you need to authorize sushiswap to be able to spend your token.
                    <br />
                    Then, you just need to authorize the transaction. Sushiswap takes care of the rest!
                    <br />
                    You are always guaranteed to receive at least the quantity displayed.
                    <br />
                    In the event that the swap cannot be carried out, as is often the case during strong price
                    movements, you are <b>automatically, immediately and fully reimbursed.</b>
                  </td>
                </tr>
                <tr>
                  <td
                    onmouseover="$(this).css('opacity', '1');"
                    onmouseout="$(this).css('opacity', '0.8');"
                    onclick="$('#F_4').fadeIn();"
                    style={{ opacity: "0.8", backgroundColor: "white", padding: "10px", color: "black" }}
                  >
                    What are the fees per transaction ?
                  </td>
                </tr>
                <tr>
                  <td id="F_4" style={{ display: "none", padding: "10px", color: "white" }}>
                    There are two types of fees:
                    <br />
                    The first is the Gas used for the transaction. Be careful, during certain periods, the price of gas
                    to be able to validate a transaction can very quickly rise.
                    <br />
                    The second, is generated by sushiswap, and represents <b>0.3% per hop.</b>
                  </td>
                </tr>
                <tr>
                  <td
                    onmouseover="$(this).css('opacity', '1');"
                    onmouseout="$(this).css('opacity', '0.8');"
                    onclick="$('#F_5').fadeIn();"
                    style={{ opacity: "0.8", backgroundColor: "white", padding: "10px", color: "black" }}
                  >
                    What is a hop?
                  </td>
                </tr>
                <tr>
                  <td id="F_5" style={{ display: "none", padding: "10px", color: "white" }}>
                    To be able to make a swap, it is necessary on the one hand that the pair exists, and on the other
                    hand that there is enough liquidity.
                    <br />
                    Fictitious example: you want to exchange AMP for SUSHI.
                    <br />
                    AMP -&gt; SUSHI represents one hop. But if this pair doesn't exist, our algorithm will search for
                    other routes, and can suggest: AMP -&gt; WETH -&gt; SUSHI.
                    <br />
                    In this case, the number of hops will be two.
                  </td>
                </tr>
                <tr>
                  <td
                    onmouseover="$(this).css('opacity', '1');"
                    onmouseout="$(this).css('opacity', '0.8');"
                    onclick="$('#F_6').fadeIn();"
                    style={{ opacity: "0.8", backgroundColor: "white", padding: "10px", color: "black" }}
                  >
                    Why is my transaction rejected ?
                  </td>
                </tr>
                <tr>
                  <td id="F_6" style={{ display: "none", padding: "10px", color: "white" }}>
                    Your transaction can be rejected for various reasons, such as too low gas price, a sudden decrease
                    in liquidity, or even because the deadline has expired.
                  </td>
                </tr>
                <tr>
                  <td
                    onmouseover="$(this).css('opacity', '1');"
                    onmouseout="$(this).css('opacity', '0.8');"
                    onclick="$('#F_7').fadeIn();"
                    style={{ opacity: "0.8", backgroundColor: "white", padding: "10px", color: "black" }}
                  >
                    What is the deadline ?
                  </td>
                </tr>
                <tr>
                  <td id="F_7" style={{ display: "none", padding: "10px", color: "white" }}>
                    The deadline, as its name suggests, represents the maximum time before your order is expired.
                    <br />
                    If the deadline is exceeded, you are fully and automatically reimbursed.
                  </td>
                </tr>
                <tr>
                  <td
                    onmouseover="$(this).css('opacity', '1');"
                    onmouseout="$(this).css('opacity', '0.8');"
                    onclick="$('#F_8').fadeIn();"
                    style={{ opacity: "0.8", backgroundColor: "white", padding: "10px", color: "black" }}
                  >
                    What is the price impact ?
                  </td>
                </tr>
                <tr>
                  <td id="F_8" style={{ display: "none", padding: "10px", color: "white" }}>
                    The price impact is{" "}
                    <b>
                      the percentage change between the original price and <u>the price after your order</u>.
                    </b>
                    <br />
                    The larger is your order, the higher the price impact will be.
                    <br />
                    As with a centralized exchange, if you place a market order of $1,000,000, there is a high
                    probability that the price will increase, thus decreasing the final quantity.
                  </td>
                </tr>
                <tr>
                  <td
                    onmouseover="$(this).css('opacity', '1');"
                    onmouseout="$(this).css('opacity', '0.8');"
                    onclick="$('#F_9').fadeIn();"
                    style={{ opacity: "0.8", backgroundColor: "white", padding: "10px", color: "black" }}
                  >
                    What is the difference between max price impact and sum price impact ?
                  </td>
                </tr>
                <tr>
                  <td id="F_9" style={{ display: "none", padding: "10px", color: "white" }}>
                    The max price impact represents the maximum percentage change in price generated by your order.
                    <br />
                    The sum price impact is this same percentage divided by two.
                  </td>
                </tr>
                <tr>
                  <td
                    onmouseover="$(this).css('opacity', '1');"
                    onmouseout="$(this).css('opacity', '0.8');"
                    onclick="$('#F_10').fadeIn();"
                    style={{ opacity: "0.8", backgroundColor: "white", padding: "10px", color: "black" }}
                  >
                    What is the difference between max output and sum output ?
                  </td>
                </tr>
                <tr>
                  <td id="F_10" style={{ display: "none", padding: "10px", color: "white" }}>
                    The max output represents the quantity received by applying the max price impact.
                    <br />
                    The sum output represents the quantity received by applying the sum price impact.
                  </td>
                </tr>
                <tr>
                  <td
                    onmouseover="$(this).css('opacity', '1');"
                    onmouseout="$(this).css('opacity', '0.8');"
                    onclick="$('#F_11').fadeIn();"
                    style={{ opacity: "0.8", backgroundColor: "white", padding: "10px", color: "black" }}
                  >
                    What is slippage ?
                  </td>
                </tr>
                <tr>
                  <td id="F_11" style={{ display: "none", padding: "10px", color: "white" }}>
                    The slippage represents the maximum percentage decrease in the quantity received.
                    <br />
                    Example: you want to exchange a SUSHI for 10 USDT but the price moves sharply downwards, with a
                    slippage of 1%, <b>you agree to receive at least</b> 10-1% = 9.9 USDC
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <br />
        </div>
        <div className="BAR_LI" id="BOTTOM" style={{ height: "30px", zIndex: 10, position: "relative" }}>
          <div style={{ position: "absolute", right: "20px", marginTop: "5px", fontSize: "12px", color: "white" }}>
            © sushipro.io 2020
          </div>
          <div style={{ position: "relative", marginLeft: "20px", marginTop: "5px", fontSize: "12px", color: "white" }}>
            <a href="https://docs.sushiswap.fi/" style={{ color: "white", textDecoration: "none" }}>
              Docs
            </a>
            -{" "}
            <a href="https://lite.sushiswap.fi/" style={{ color: "white", textDecoration: "none" }}>
              SushiSwap Lite
            </a>
            -{" "}
            <a href="https://www.sushiswapclassic.org/" style={{ color: "white", textDecoration: "none" }}>
              SushiSwap Classic
            </a>
            -{" "}
            <a href="https://discord.gg/NVPXN4e" style={{ color: "white", textDecoration: "none" }}>
              Discord
            </a>
            -{" "}
            <a href="https://twitter.com/sushiswap" style={{ color: "white", textDecoration: "none" }}>
              Twitter
            </a>
          </div>
        </div>
        <input autoComplete="off" type="hidden" id="isUserConnected" defaultValue={0} />
      </div>
    </>
  );
};

export default Original;
