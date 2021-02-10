import React, { useState, useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import dayjs from "dayjs";
import { formattedNum } from "../../services/vision/utils";
import { usePrevious } from "react-use";

const AreaChart = ({
  data,
  width,
  height, //= 300,
  base,
  margin = true,
  timeKey,
  valueKey,
  valueFormatter = (val) => formattedNum(val, true),
}) => {
  //console.log("data:", data);

  // reference for DOM element to create with chart
  const ref = useRef();
  // pointer to the chart object
  const [chartCreated, setChartCreated] = useState(false);
  //const dataPrev = usePrevious(data);

  const textColor = "black";

  //   const [darkMode] = useDarkModeManager();
  //   const textColor = darkMode ? "white" : "black";
  //   const previousTheme = usePrevious(darkMode);
  //   // reset the chart if theme switches
  //   useEffect(() => {
  //     if (chartCreated && previousTheme !== darkMode) {
  //       // remove the tooltip element
  //       let tooltip = document.getElementById("tooltip-id");
  //       let node = document.getElementById("test-id");
  //       node.removeChild(tooltip);
  //       chartCreated.resize(0, 0);
  //       setChartCreated();
  //     }
  //   }, [chartCreated, darkMode, previousTheme]);

  // useEffect(() => {
  //   if (data !== dataPrev && chartCreated) {
  //     // remove the tooltip element
  //     let tooltip = document.getElementById("tooltip-id");
  //     let node = document.getElementById("test-id");
  //     node.removeChild(tooltip);
  //     chartCreated.resize(0, 0);
  //     setChartCreated();
  //   }
  // }, [chartCreated, data, dataPrev]);

  const formattedData = data?.map((entry) => {
    //console.log("entry:", entry[valueKey]);
    return {
      time: parseFloat(entry[timeKey]),
      value: parseFloat(entry[valueKey]),
    };
  });

  // const formattedData = [
  //   { time: "2018-10-19", value: 219.31 },
  //   { time: "2018-10-22", value: 220.65 },
  //   { time: "2018-10-23", value: 222.73 },
  //   { time: "2018-10-24", value: 215.09 },
  //   { time: "2018-10-25", value: 219.8 },
  //   { time: "2018-10-26", value: 216.3 },
  //   { time: "2018-10-29", value: 212.24 },
  //   { time: "2018-10-30", value: 213.3 },
  //   { time: "2018-10-31", value: 218.86 },
  //   { time: "2018-11-01", value: 222.22 },
  //   { time: "2018-11-02", value: 207.48 },
  //   { time: "2018-11-05", value: 201.59 },
  //   { time: "2018-11-06", value: 203.77 },
  //   { time: "2018-11-07", value: 209.95 },
  //   { time: "2018-11-08", value: 208.49 },
  //   { time: "2018-11-09", value: 204.47 },
  //   { time: "2018-11-12", value: 194.17 },
  //   { time: "2018-11-13", value: 192.23 },
  //   { time: "2018-11-14", value: 186.8 },
  //   { time: "2018-11-15", value: 191.41 },
  //   { time: "2018-11-16", value: 193.53 },
  //   { time: "2018-11-19", value: 185.86 },
  //   { time: "2018-11-20", value: 176.98 },
  //   { time: "2018-11-21", value: 176.78 },
  //   { time: "2018-11-23", value: 172.29 },
  //   { time: "2018-11-26", value: 174.62 },
  //   { time: "2018-11-27", value: 174.24 },
  //   { time: "2018-11-28", value: 180.94 },
  //   { time: "2018-11-29", value: 179.55 },
  //   { time: "2018-11-30", value: 178.58 },
  //   { time: "2018-12-03", value: 184.82 },
  //   { time: "2018-12-04", value: 176.69 },
  //   { time: "2018-12-06", value: 174.72 },
  //   { time: "2018-12-07", value: 168.49 },
  //   { time: "2018-12-10", value: 169.6 },
  //   { time: "2018-12-11", value: 168.63 },
  //   { time: "2018-12-12", value: 169.1 },
  //   { time: "2018-12-13", value: 170.95 },
  //   { time: "2018-12-14", value: 165.48 },
  //   { time: "2018-12-17", value: 163.94 },
  //   { time: "2018-12-18", value: 166.07 },
  //   { time: "2018-12-19", value: 160.89 },
  //   { time: "2018-12-20", value: 156.83 },
  //   { time: "2018-12-21", value: 150.73 },
  //   { time: "2018-12-24", value: 146.83 },
  //   { time: "2018-12-26", value: 157.17 },
  //   { time: "2018-12-27", value: 156.15 },
  //   { time: "2018-12-28", value: 156.23 },
  //   { time: "2018-12-31", value: 157.74 },
  //   { time: "2019-01-02", value: 157.92 },
  //   { time: "2019-01-03", value: 142.19 },
  //   { time: "2019-01-04", value: 148.26 },
  //   { time: "2019-01-07", value: 147.93 },
  //   { time: "2019-01-08", value: 150.75 },
  //   { time: "2019-01-09", value: 153.31 },
  //   { time: "2019-01-10", value: 153.8 },
  //   { time: "2019-01-11", value: 152.29 },
  //   { time: "2019-01-14", value: 150.0 },
  //   { time: "2019-01-15", value: 153.07 },
  //   { time: "2019-01-16", value: 154.94 },
  //   { time: "2019-01-17", value: 155.86 },
  //   { time: "2019-01-18", value: 156.82 },
  //   { time: "2019-01-22", value: 153.3 },
  //   { time: "2019-01-23", value: 153.92 },
  //   { time: "2019-01-24", value: 152.7 },
  //   { time: "2019-01-25", value: 157.76 },
  //   { time: "2019-01-28", value: 156.3 },
  //   { time: "2019-01-29", value: 154.68 },
  //   { time: "2019-01-30", value: 165.25 },
  //   { time: "2019-01-31", value: 166.44 },
  //   { time: "2019-02-01", value: 166.52 },
  //   { time: "2019-02-04", value: 171.25 },
  //   { time: "2019-02-05", value: 174.18 },
  //   { time: "2019-02-06", value: 174.24 },
  //   { time: "2019-02-07", value: 170.94 },
  //   { time: "2019-02-08", value: 170.41 },
  //   { time: "2019-02-11", value: 169.43 },
  //   { time: "2019-02-12", value: 170.89 },
  //   { time: "2019-02-13", value: 170.18 },
  //   { time: "2019-02-14", value: 170.8 },
  //   { time: "2019-02-15", value: 170.42 },
  //   { time: "2019-02-19", value: 170.93 },
  //   { time: "2019-02-20", value: 172.03 },
  //   { time: "2019-02-21", value: 171.06 },
  //   { time: "2019-02-22", value: 172.97 },
  //   { time: "2019-02-25", value: 174.23 },
  //   { time: "2019-02-26", value: 174.33 },
  //   { time: "2019-02-27", value: 174.87 },
  //   { time: "2019-02-28", value: 173.15 },
  //   { time: "2019-03-01", value: 174.97 },
  //   { time: "2019-03-04", value: 175.85 },
  //   { time: "2019-03-05", value: 175.53 },
  //   { time: "2019-03-06", value: 174.52 },
  //   { time: "2019-03-07", value: 172.5 },
  //   { time: "2019-03-08", value: 172.91 },
  //   { time: "2019-03-11", value: 178.9 },
  //   { time: "2019-03-12", value: 180.91 },
  //   { time: "2019-03-13", value: 181.71 },
  //   { time: "2019-03-14", value: 183.73 },
  //   { time: "2019-03-15", value: 186.12 },
  //   { time: "2019-03-18", value: 188.02 },
  //   { time: "2019-03-19", value: 186.53 },
  //   { time: "2019-03-20", value: 188.16 },
  //   { time: "2019-03-21", value: 195.09 },
  //   { time: "2019-03-22", value: 191.05 },
  //   { time: "2019-03-25", value: 188.74 },
  //   { time: "2019-03-26", value: 186.79 },
  //   { time: "2019-03-27", value: 188.47 },
  //   { time: "2019-03-28", value: 188.72 },
  //   { time: "2019-03-29", value: 189.95 },
  //   { time: "2019-04-01", value: 191.24 },
  //   { time: "2019-04-02", value: 194.02 },
  //   { time: "2019-04-03", value: 195.35 },
  //   { time: "2019-04-04", value: 195.69 },
  //   { time: "2019-04-05", value: 197.0 },
  //   { time: "2019-04-08", value: 200.1 },
  //   { time: "2019-04-09", value: 199.5 },
  //   { time: "2019-04-10", value: 200.62 },
  //   { time: "2019-04-11", value: 198.95 },
  //   { time: "2019-04-12", value: 198.87 },
  //   { time: "2019-04-15", value: 199.23 },
  //   { time: "2019-04-16", value: 199.25 },
  //   { time: "2019-04-17", value: 203.13 },
  //   { time: "2019-04-18", value: 203.86 },
  //   { time: "2019-04-22", value: 204.53 },
  //   { time: "2019-04-23", value: 207.48 },
  //   { time: "2019-04-24", value: 207.16 },
  //   { time: "2019-04-25", value: 205.28 },
  //   { time: "2019-04-26", value: 204.3 },
  //   { time: "2019-04-29", value: 204.61 },
  //   { time: "2019-04-30", value: 200.67 },
  //   { time: "2019-05-01", value: 210.52 },
  //   { time: "2019-05-02", value: 209.15 },
  //   { time: "2019-05-03", value: 211.75 },
  //   { time: "2019-05-06", value: 208.48 },
  //   { time: "2019-05-07", value: 202.86 },
  //   { time: "2019-05-08", value: 202.9 },
  //   { time: "2019-05-09", value: 200.72 },
  //   { time: "2019-05-10", value: 197.18 },
  //   { time: "2019-05-13", value: 185.72 },
  //   { time: "2019-05-14", value: 188.66 },
  //   { time: "2019-05-15", value: 190.92 },
  //   { time: "2019-05-16", value: 190.08 },
  //   { time: "2019-05-17", value: 189.0 },
  //   { time: "2019-05-20", value: 183.09 },
  //   { time: "2019-05-21", value: 186.6 },
  //   { time: "2019-05-22", value: 182.78 },
  //   { time: "2019-05-23", value: 179.66 },
  //   { time: "2019-05-24", value: 178.97 },
  //   { time: "2019-05-28", value: 178.67 },
  // ];

  // if no chart created yet, create one with options and add to DOM manually
  useEffect(() => {
    if (!chartCreated) {
      const chart = createChart(ref.current, {
        width: width,
        height: height,
        layout: {
          backgroundColor: "transparent",
          textColor: textColor,
        },
        rightPriceScale: {
          visible: false,
        },
        leftPriceScale: {
          visible: false,
        },
        timeScale: {
          visible: false,
        },
        crosshair: {
          vertLine: {
            width: 2,
            color: "rgba(224, 227, 235, 0.8)",
            style: 0,
          },
          horzLine: {
            visible: false,
            labelVisible: false,
          },
        },
        grid: {
          vertLines: {
            color: "#fff",
          },
          horzLines: {
            color: "#fff",
          },
        },
        localization: {
          priceFormatter: (val) => formattedNum(val),
        },
        handleScroll: {
          mouseWheel: false,
          pressedMouseMove: false,
          horzTouchDrag: false,
          vertTouchDrag: false,
        },
        handleScale: {
          mouseWheel: false,
          pressedMouseMove: false,
          horzTouchDrag: false,
          vertTouchDrag: false,
        },
      });

      var areaSeries = chart.addAreaSeries({
        topColor: "rgba(255, 255, 255, 0)", //"rgba(76, 175, 80, 0.5)",
        lineColor: "rgba(4, 200, 6, 1)",
        bottomColor: "rgba(255, 255, 255, 0)", //"rgba(76, 175, 80, 0)",
        lineWidth: 2,
        priceLineVisible: false,
        //crosshairMarkerVisible: true,
        //crosshairMarkerRadius: 0,
      });

      areaSeries.setData(formattedData);

      var toolTip = document.createElement("div");
      toolTip.setAttribute("id", "tooltip-id");
      toolTip.className = "three-line-legend";
      ref.current.appendChild(toolTip);
      toolTip.style.display = "block";
      toolTip.style.position = "absolute";
      toolTip.style.left = "0px";
      toolTip.style.top = "0px";
      toolTip.style.backgroundColor = "transparent";

      // get the title of the chart
      function setLastBarText() {
        toolTip.innerHTML = base
          ? `<div style="font-size: 33px; color: ${textColor}">` + valueFormatter(base) + "</div>"
          : "";
      }
      setLastBarText();

      // update the title when hovering on the chart
      chart.subscribeCrosshairMove(function(param) {
        if (
          param === undefined ||
          param.time === undefined ||
          param.point.x < 0 ||
          param.point.x > width ||
          param.point.y < 0 ||
          param.point.y > height
        ) {
          setLastBarText();
        } else {
          var price = param.seriesPrices.get(areaSeries);
          const time = dayjs.unix(param.time).format("MM/DD h:mm A");
          //console.log("time:", param.time, time);
          //const time = dayjs.unix(param.time).format("MM/DD h:mm A");
          toolTip.innerHTML =
            `<div style="font-size: 33px; color: ${textColor}">` +
            valueFormatter(price) +
            `<div style="font-size: 12px; color: ${textColor}">` +
            time +
            " UTC" +
            "</div>" +
            "</div>";
        }
      });

      chart.timeScale().fitContent();

      setChartCreated(chart);
    }
  }, [chartCreated, formattedData, width, height, valueFormatter, base, margin, textColor]);

  // responsiveness
  useEffect(() => {
    if (width) {
      chartCreated && chartCreated.resize(width, height);
      chartCreated && chartCreated.timeScale().scrollToPosition(0);
    }
  }, [chartCreated, height, width]);

  return (
    <div className="relative pt-16">
      <div ref={ref} id="line-chart" />
    </div>
  );
};

export default AreaChart;
