import React from "react";

import { Link } from "react-router-dom";
import { Linker } from "../Linker";

import { useTokenData } from "../../services/vision/contexts/TokenData";
import { formattedNum, formattedPercent, formattedPercentArrow } from "../../services/vision/utils";

import { articles } from "../../constants/articles";

const Articles = () => {
  return (
    <>
      <div className="pt-4 pb-4 px-4 flex justify-between border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">New in SushiSwap</h3>
        <Linker to="https://forum.sushiswapclassic.org/" external>
          View More
        </Linker>
        {/* <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Personal details and application.</p> */}
      </div>
      {articles.map((article) => {
        return (
          <>
            <Article
              title={article.title}
              description={article.description}
              image={article.image}
              token={article.token}
            />
          </>
        );
      })}
    </>
  );
};

const Article = ({ title, description, image, token, list }) => {
  const tokenData = useTokenData(token);
  //console.log("tokenData:", tokenData);
  return (
    <>
      <div className="py-6 px-4 hover:bg-gray-100 border-b border-gray-100">
        <div className="flex">
          <div>
            <h4 className="text-base font-bold">{title}</h4>
            <p className="mt-1">{description}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            {image && <img src={image} className="h-16 w-16 rounded" />}
            {/* <svg
            className="h-16 w-16 border border-gray-300 bg-white text-gray-300"
            preserveAspectRatio="none"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <path vectorEffect="non-scaling-stroke" strokeWidth={1} d="M0 0l200 200M0 200L200 0" />
          </svg> */}
          </div>
        </div>
        {tokenData && Object.keys(tokenData).length > 0 && (
          <Link to={"/token/" + tokenData.id}>
            <div className="flex mt-4">
              <div className="font-semibold mr-2">{tokenData?.symbol}</div>
              {/* <div> {formattedNum(tokenData.priceUSD, true)}</div> */}
              <div> {formattedPercentArrow(tokenData?.priceChangeUSD)}</div>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default Articles;
