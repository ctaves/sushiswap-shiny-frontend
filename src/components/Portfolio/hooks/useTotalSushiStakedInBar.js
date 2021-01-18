import { useCallback, useEffect, useState } from "react";
import useSushi from "../../../services/frontend/hooks/useSushi";
import { getTotalSushiStakedInBar } from "../../../services/frontend/sushi/utils";

const useTotalStakedInBar = () => {
  const [totalStaked, setTotalStaked] = useState();
  const sushi = useSushi();

  useEffect(() => {
    async function fetchTotalStaked() {
      const staked = await getTotalSushiStakedInBar(sushi);
      setTotalStaked(staked);
    }
    if (sushi) {
      fetchTotalStaked();
    }
  }, [sushi, setTotalStaked]);

  return totalStaked;
};

export default useTotalStakedInBar;
