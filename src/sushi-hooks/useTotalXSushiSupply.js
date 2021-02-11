import { useCallback, useEffect, useState } from "react";
import useSushi from "../../../services/frontend/hooks/useSushi";
import { getXSushiSupply } from "../../../services/frontend/sushi/utils";

const useTotalSupply = () => {
  const [totalSupply, setTotalSupply] = useState();
  const sushi = useSushi();

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getXSushiSupply(sushi);
      setTotalSupply(supply);
    }
    if (sushi) {
      fetchTotalSupply();
    }
  }, [sushi, setTotalSupply]);

  return totalSupply;
};

export default useTotalSupply;
