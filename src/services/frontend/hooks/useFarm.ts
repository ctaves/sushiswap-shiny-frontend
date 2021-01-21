import { Farm, Context as FarmsContext } from "../contexts/Farms";

import { useContext } from "react";

const useFarm = (id: string): Farm | undefined => {
  const { farms } = useContext(FarmsContext);
  const farm = farms.find((farm) => farm.id === id);
  //console.log("FARMS:", farms);
  return farm;
};

export default useFarm;
