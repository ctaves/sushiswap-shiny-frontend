import React, { useState } from "react";
import styled from "styled-components";
import { XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line, CartesianGrid } from "recharts";
import { AutoRow, RowBetween } from "../../services/vision/components/Row";

import { toK, toNiceDate, toNiceDateYear, formattedNum, getTimeframe } from "../../services/vision/utils";
import { OptionButton } from "../../services/vision/components/ButtonStyled";
import { useMedia } from "react-use";
import { timeframeOptions } from "../../services/vision/constants";
import DropdownSelect from "../../services/vision/components/DropdownSelect";
import { useUserPositionChart } from "../../services/vision/contexts/User";
import { useTimeframe } from "../../services/vision/contexts/Application";
import LocalLoader from "../../services/vision/components/LocalLoader";
import { useColor } from "../../services/vision/hooks";
//import { useDarkModeManager } from "../../contexts/LocalStorage";

const ChartWrapper = styled.div`
  max-height: 420px;

  @media screen and (max-width: 600px) {
    min-height: 200px;
  }
`;

const OptionsRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 40px;
`;

const CHART_VIEW = {
  VALUE: "Value",
  FEES: "Fees",
};

const PairReturnsChart = ({ account, position, data }) => {
  //let data = useUserPositionChart(position, account);

  const [timeWindow, setTimeWindow] = useTimeframe();

  const below600 = useMedia("(max-width: 600px)");
  //const color = useColor(position?.pair.token0.id);
  const color = "#1f222d";
  const [chartView, setChartView] = useState(CHART_VIEW.VALUE);

  // based on window, get starttime
  let utcStartTime = getTimeframe(timeWindow);

  console.log("chart_data:", data);
  //data = data?.filter((entry) => entry.date >= utcStartTime);

  const aspect = below600 ? 60 / 42 : 60 / 16;

  //const [darkMode] = useDarkModeManager();
  //const textColor = darkMode ? "white" : "black";
  const textColor = "black";

  return (
    <ChartWrapper>
      <ResponsiveContainer aspect={aspect}>
        {data ? (
          <LineChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barCategoryGap={1} data={data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              tickLine={false}
              axisLine={false}
              interval="preserveEnd"
              tickMargin={14}
              tickFormatter={(tick) => toNiceDate(tick)}
              dataKey="date"
              tick={{ fill: textColor }}
              type={"number"}
              domain={["dataMin", "dataMax"]}
            />
            <YAxis
              type="number"
              orientation="right"
              tickFormatter={(tick) => "$" + toK(tick)}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={0}
              yAxisId={0}
              tick={{ fill: textColor }}
            />
            <Tooltip
              cursor={true}
              formatter={(val) => formattedNum(val, true)}
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
            <Line type="monotone" dataKey="value" stroke={color} yAxisId={0} name={"Chart"} />
          </LineChart>
        ) : (
          <LocalLoader />
        )}
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default PairReturnsChart;
