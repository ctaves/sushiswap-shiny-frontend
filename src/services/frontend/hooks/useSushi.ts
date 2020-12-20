import { useContext } from "react";
import { Context } from "../contexts/SushiProvider";

const useSushi = () => {
  const { sushi } = useContext(Context);
  //console.log("SUSHI:", sushi);
  return sushi;
};

export default useSushi;
