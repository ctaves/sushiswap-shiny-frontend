import Numeral from "numeral";
import { ethers } from "ethers";

export const isAddress = (value) => {
  try {
    return ethers.utils.getAddress(value.toLowerCase());
  } catch {
    return false;
  }
};

var priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export const toK = (num) => {
  return Numeral(num).format("0.[00]a");
};

export function rawPercent(percentRaw) {
  let percent = parseFloat(percentRaw * 100);
  if (!percent || percent === 0) {
    return "0%";
  }
  if (percent < 1 && percent > 0) {
    return "< 1%";
  }
  return percent.toFixed(0) + "%";
}

export const formattedNum = (number, usd = false, acceptNegatives = false) => {
  if (isNaN(number) || number === "" || number === undefined) {
    return usd ? "$0" : 0;
  }
  let num = parseFloat(number);

  if (num > 500000000) {
    return (usd ? "$" : "") + toK(num.toFixed(0), true);
  }

  if (num === 0) {
    if (usd) {
      return "$0";
    }
    return 0;
  }

  if (num < 0.0001 && num > 0) {
    return usd ? "< $0.0001" : "< 0.0001";
  }

  if (num > 1000) {
    return usd
      ? "$" + Number(parseFloat(num).toFixed(0)).toLocaleString()
      : "" + Number(parseFloat(num).toFixed(0)).toLocaleString();
  }

  if (usd) {
    if (num < 0.1) {
      return "$" + Number(parseFloat(num).toFixed(4));
    } else {
      let usdString = priceFormatter.format(num);
      return "$" + usdString.slice(1, usdString.length);
    }
  }

  return Number(parseFloat(num).toFixed(5));
};
