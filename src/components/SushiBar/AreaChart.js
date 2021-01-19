import React from "react";
import styled from "styled-components";
import { Area, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart } from "recharts";
//import { AutoRow, RowBetween } from "../../services/vision/components/Row";

import { toK, toNiceDate, toNiceDateYear, formattedNum, getTimeframe } from "../../services/vision/utils";
import { darken } from "polished";
import { useMedia } from "react-use";
import LocalLoader from "../../services/vision/components/LocalLoader";
//import { useColor } from "../../services/vision/hooks";
//import { useDarkModeManager } from "../../contexts/LocalStorage";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const ChartWrapper = styled.div`
  max-height: 420px;

  @media screen and (max-width: 600px) {
    min-height: 200px;
  }
`;

const PairReturnsChart = ({ data, field }) => {
  const below600 = useMedia("(max-width: 600px)");
  const color = "#fec465";
  const aspect = below600 ? 60 / 42 : 60 / 35;

  //const [darkMode] = useDarkModeManager();
  //const textColor = darkMode ? "white" : "black";
  const textColor = "black";

  const formattedData = data?.map((entry) => {
    return {
      date: entry.date / 1000,
      //   date: dayjs
      //     .unix(entry.date / 1000)
      //     .utc()
      //     .format("YYYY-MM-DD"),
      value: parseFloat(entry[field]),
    };
  });

  return (
    <ChartWrapper>
      <ResponsiveContainer aspect={aspect}>
        {data ? (
          <AreaChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barCategoryGap={1} data={formattedData}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              tickLine={false}
              axisLine={false}
              interval="preserveEnd"
              tickMargin={5}
              minTickGap={0}
              tickFormatter={(tick) => toNiceDate(tick)}
              dataKey="date"
              tick={{ fill: textColor, fontSize: 10 }}
              type={"number"}
              domain={["dataMin", "dataMax"]}
            />
            {/* <YAxis
              type="number"
              orientation="right"
              tickFormatter={(tick) => tick + "%"}
              axisLine={false}
              tickLine={false}
              interval="preserveEnd"
              minTickGap={10}
              yAxisId={0}
              tickMargin={0}
              tick={{ fill: textColor, fontSize: 10 }}
            /> */}
            <Tooltip
              cursor={true}
              formatter={(val) => formattedNum(val, false) + " %"}
              labelFormatter={(label) => toNiceDateYear(label)}
              labelStyle={{ paddingTop: 4 }}
              contentStyle={{
                padding: "10px 14px",
                borderRadius: 10,
                borderColor: color,
                color: "black",
              }}
              wrapperStyle={{ top: -70, left: -10 }}
            />
            <Area
              strokeWidth={2}
              dot={false}
              type="monotone"
              name={" (APY)"}
              dataKey={field}
              yAxisId={0}
              stroke={darken(0.12, color)}
              fill={"url(#colorUv)"}
            />
          </AreaChart>
        ) : (
          <LocalLoader />
        )}
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default PairReturnsChart;
