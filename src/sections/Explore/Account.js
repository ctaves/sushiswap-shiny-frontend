import React, { useEffect, useCallback } from "react";
import sushiData from "@sushiswap/sushi-data";
import dayjs from "dayjs";
import { fetchTokens, fetchTokenWithValue } from "../utils/fetch-utils";

export const useAccountBalances = () => {
  const userAddress = String("0xb900Ee43397Bc2829e565DECe3518A02F712Ec33").toLowerCase();

  const fetchData = useCallback(async () => {
    const range = (count) => {
      const current = dayjs();
      const days = [...Array(count).keys()];
      const timestamps = [];
      days.map((day) => {
        timestamps.push(
          dayjs()
            .subtract(day, "day")
            .startOf("day")
            .unix()
        );
      });
      return timestamps;
    };

    const timestamps = range(30);

    const series = await sushiData.timeseries(
      { timestamps: timestamps, target: sushiData.masterchef.user },
      { user_address: userAddress }
    );

    console.log("series:", series);
    const queries = await Promise.all(
      timestamps.map(async (timestamp) => {
        const positions = await sushiData.exchange_v1.userPositions({
          timestamp: timestamp,
          user_address: userAddress,
        });
        const farms = await sushiData.masterchef.user({
          timestamp: timestamp,
          user_address: userAddress,
        });
        const sushiBar = await sushiData.bar.user({
          timestamp: timestamp,
          user_address: userAddress,
        });
        return {
          timestamp: timestamp,
          positions: positions,
          farms: farms,
          sushiBar: sushiBar,
        };
      })
    );

    console.log("results:", queries, userAddress);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
};

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

    console.log("results:", queries, userAddress);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
};

export const useTokenBalance = () => {
  const userAddress = String("0xb900Ee43397Bc2829e565DECe3518A02F712Ec33").toLowerCase();

  const fetchData = useCallback(async () => {
    if (userAddress) {
      try {
        const list = await fetchTokens(address);
        const weth = list.find((t) => isWETH(t));
        if (list?.length > 0 && weth && provider) {
          const wethPriceUSD = Fraction.parse(String(await sushiData.weth.price()));
          return await Promise.all(
            list.map(async (token) => await fetchTokenWithValue(token, weth, wethPriceUSD, getPair, provider))
          );
        }
      } finally {
        console.log("done");
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
};
