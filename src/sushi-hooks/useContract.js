import { ChainId } from "@sushiswap/sdk";
import { useMemo } from "react";
import ERC20_ABI from "./constants/abis/erc20.json";
import MASTERCHEF_ABI from "./constants/abis/masterchef.json";
import { getContract } from "./utils";
import { useActiveWeb3React } from "../services/exchange/hooks/index";

// returns null on errors
function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useActiveWeb3React();
  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useMasterChefContract() {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId === ChainId.MAINNET ? "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd" : undefined,
    MASTERCHEF_ABI,
    false
  );
}
