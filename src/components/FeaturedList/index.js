import React from "react";
import { Link } from "react-router-dom";
import { Linker } from "../Linker";
import { featured } from "../../constants/featured";

const FeaturedList = () => {
  return (
    <>
      <div className="pt-2 mx-4 sm:pt-6 pb-1 flex justify-between">
        <h3 className="text-xl leading-6 font-medium text-gray-900">Popular Lists</h3>
        <Linker to="/tokens">View More</Linker>
        {/* <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Personal details and application.</p> */}
      </div>
      <div className="py-5">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
          <div className="col-span-2 sm:col-span-3 mx-4">
            {featured.map((token) => {
              return (
                <>
                  <List key={"featured-" + token.id} title={token.title} image={token.image} path={token.path} />
                </>
              );
            })}
          </div>
        </dl>
      </div>
    </>
  );
};

const List = ({ title, image, path }) => {
  return (
    <>
      <span className="hover:bg-gray-100 float-left border border-gray-200 rounded-full py-1 pl-1 pr-3 mr-2 mb-2">
        <Link to={path} className="flex-shrink-0 group block">
          <div className="flex items-center">
            <div>
              <img className="inline-block h-9 w-9 rounded-full" src={image} alt="" />
            </div>
            <div className="ml-3">
              <p className="text-sm leading-5 font-medium text-gray-700 group-hover:text-gray-900">{title}</p>
            </div>
          </div>
        </Link>
      </span>
    </>
  );
};

export default FeaturedList;
