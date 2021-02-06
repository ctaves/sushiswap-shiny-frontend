import { useEffect, useCallback } from "react";
import sushiData from "@sushiswap/sushi-data";

export const useAccountBalance = () => {
  const userAddress = String("0xb900Ee43397Bc2829e565DECe3518A02F712Ec33").toLowerCase();

  const fetchData = useCallback(async () => {
    const positions = await sushiData.exchange_v1.userPositions({
      user_address: userAddress,
    });
    const farms = await sushiData.masterchef.user({
      user_address: userAddress,
    });
    const sushiBar = await sushiData.bar.user({
      user_address: userAddress,
    });

    console.log("results:", { positions: positions, farms: farms, sushiBar: sushiBar });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
};
