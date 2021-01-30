import React from "react";

import { Link } from "react-router-dom";
import { Linker } from "../Linker";

import { useTokenData } from "../../services/vision/contexts/TokenData";
import { formattedNum, formattedPercent, formattedPercentArrow } from "../../services/vision/utils";

import { articles } from "../../constants/articles";

const Articles = () => {
  return (
    <>
      <div className="pt-4 pb-4 mx-4 flex justify-between border-b border-gray-200">
        <h3 className="text-2xl leading-6 font-medium text-gray-900">News</h3>
        <Linker to="https://forum.sushiswapclassic.org/" external>
          View More
        </Linker>
        {/* <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Personal details and application.</p> */}
      </div>
      {articles.map((article) => {
        return (
          <>
            <Article
              key={"article_" + article.title}
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
      <div className="hover:bg-gray-100">
        <div className="pt-6 flex mx-4">
          <div className="pr-4">
            <h4 className="text-sm font-semibold">{title}</h4>
          </div>
        </div>
        <div className="pb-6 flex mx-4 border-b border-gray-100">
          <div className="pr-4">
            <p className="mt-1">{description}</p>
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
          <div className="ml-4 flex items-start">
            {image && (
              <div
                className="h-20 w-32 rounded bg-gray-300"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}
            {/* {image && <div src={image} className="h-16 w-16 rounded" />} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Articles;
