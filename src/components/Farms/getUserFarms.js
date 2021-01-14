import { poolUserQuery } from "../../services/analytics/core/queries/masterchef";
import { POOL_DENY } from "../../services/analytics/core/constants";
import { getApollo } from "../../services/analytics/core/apollo";

import BigNumber from "bignumber.js";
import Web3 from "web3";
import ERC20ABI from "../../services/frontend/constants/abi/ERC20.json";
import { Sushi } from "../../services/frontend/sushi";
import { getMasterChefContract } from "../../services/frontend/sushi/utils";
import { getBalanceNumber } from "../../services/frontend/utils/formatBalance";

export async function getUserFarms(id, farms, client = getApollo()) {
  const { ethereum } = window;

  if (id && ethereum) {
    const web3 = new Web3(ethereum);
    const chainId = Number(ethereum.chainId);
    const sushi = new Sushi(ethereum, chainId, false, {
      defaultAccount: ethereum.selectedAddress,
      defaultConfirmations: 1,
      autoGasMultiplier: 1.5,
      testing: false,
      defaultGas: "6000000",
      defaultGasPrice: "1000000000000",
      accounts: [],
      ethereumNodeTimeout: 10000,
    });

    const { data } = await client.query({
      query: poolUserQuery,
      fetchPolicy: "network-only",
      variables: {
        address: id,
      },
      context: {
        clientName: "masterchef",
      },
    });

    const getAccountStat = async (pool, pairId, pid, web3, account, masterChefContract) => {
      const lpContract = new web3.eth.Contract(ERC20ABI.abi, pairId);
      //console.log("lpContract:", lpContract, pool, pairId, pid);
      const tokenBalance = getBalanceNumber(new BigNumber(await lpContract.methods.balanceOf(account).call()));
      const stakedBalance = getBalanceNumber(
        new BigNumber((await masterChefContract.methods.userInfo(pid, account).call())["amount"])
      );
      const earnings = getBalanceNumber(
        new BigNumber(await masterChefContract.methods.pendingSushi(pid, account).call())
      );
      return {
        ...pool,
        tokenBalance: tokenBalance,
        stakedBalance: stakedBalance,
        earnings: earnings,
      };
    };

    const masterChefContract = getMasterChefContract(sushi);
    //console.log(data.users, masterChefContract, sushi, chainId, web3);

    const promises = data.users?.map((balance) =>
      getAccountStat(balance, balance?.pool?.pair, balance?.pool?.id, web3, id, masterChefContract)
    );
    const userFarms = await Promise.all(promises);
    console.log("userFarms:", userFarms);

    const farmsWithBalanceDetails = farms.map((farm) => {
      console.log("farm:", farm);
      const userFarm = userFarms.find((userFarm) => userFarm.pool.pair === farm.pair);
      return {
        ...farm,
        earnings: userFarm?.earnings,
        entryUSD: userFarm?.entryUSD,
        exitUSD: userFarm?.exitUSD,
        rewardDebt: userFarm?.rewardDebt,
        stakedBalance: userFarm?.stakedBalance,
        sushiHarvested: userFarm?.sushiHarvested,
        sushiHarvestedSinceLockup: userFarm?.sushiHarvestedSinceLockup,
        sushiHarvestedSinceLockupUSD: userFarm?.sushiHarvestedSinceLockupUSD,
        sushiHarvestedUSD: userFarm?.sushiHarvestedUSD,
        tokenBalance: userFarm?.tokenBalance,
      };
    });

    //console.log("farmsWithBalanceDetails:", farmsWithBalanceDetails);
    return farmsWithBalanceDetails;
  }
}
