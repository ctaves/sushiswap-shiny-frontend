import { useState, useEffect } from "react";
import { useWeb3React } from "@sushi-web3-react/core";

// TODO: Cache
export default (eventFilter, fromBlock) => {
  const { library: web3 } = useWeb3React();
  const [eventLogs, setEventLogs] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const filter = Object.assign(Object.assign({}, eventFilter), { fromBlock });
    try {
      web3.getLogs(filter).then((l) => setEventLogs(l));
      setError(null);
    } catch (e) {
      setError(e.code || -1);
    }
    const eventCb = (l) => {
      setEventLogs([...eventLogs, l]);
    };
    try {
      web3.on(filter, eventCb);
      setError(null);
    } catch (e) {
      setError(e.code || -1);
    }
    return () => web3.removeListener(filter, eventCb);
  }, [eventFilter, fromBlock]);
  return { eventLogs, error };
};
