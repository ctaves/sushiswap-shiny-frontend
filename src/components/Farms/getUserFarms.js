import { poolUserQuery } from "../../services/analytics/core/queries/masterchef";
import { POOL_DENY } from "../../services/analytics/core/constants";
import { getApollo } from "../../services/analytics/core/apollo";

import BigNumber from "bignumber.js";
import Web3 from "web3";
import ERC20ABI from "../../services/frontend/constants/abi/ERC20.json";
import { Sushi } from "../../services/frontend/sushi";
import { getMasterChefContract } from "../../services/frontend/sushi/utils";
import { getBalanceNumber } from "../../services/frontend/utils/formatBalance";

import { FARM_DETAILS } from "../../constants/farms";

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
    //console.log("userFarms:", userFarms);

    const farmsWithBalanceDetails = farms.map((farm) => {
      // get name and icon
      const details = FARM_DETAILS.find((farmDetail) => String(farmDetail.pid) === farm.id);
      // get additional balance details
      const userFarm = userFarms.find((userFarm) => userFarm.pool.pair === farm.pair);

      // derive additional details
      const slp = Number(userFarm?.amount / 1e18);
      const share = slp / userFarm?.pool?.totalSupply; //userFarm?.amount / userFarm?.pool.balance;
      const token0 = farm?.liquidityPair?.reserve0 * share;
      const token1 = farm?.liquidityPair?.reserve1 * share;
      const valueUSD = farm?.liquidityPair?.reserveUSD * share;
      //const pendingSushi = ((userFarm.amount * userFarm.pool.accSushiPerShare) / 1e12 - userFarm.rewardDebt) / 1e18;
      //console.log("farm_user:", farm, data.users, slp, share, token0, token1, valueUSD);
      return {
        ...farm,
        name: details?.name,
        icon: details?.icon,
        symbol: details?.symbol,
        token0Balance: token0,
        token1Balance: token1,
        slp: slp,
        valueUSD: valueUSD ? valueUSD : 0,
        earnings: userFarm?.earnings ? userFarm?.earnings : 0,
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
