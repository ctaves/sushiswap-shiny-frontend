import { useCallback, useContext } from "react";
import { Context } from "../contexts/ModalsContext";

const useModal = (modal, key, data, history) => {
  const { onDismiss, onPresent } = useContext(Context);
  const handlePresent = useCallback(() => {
    console.log("DATA:", data, history);
    onPresent(modal, key, data, history);
  }, [key, modal, onPresent]);
  return [handlePresent, onDismiss];
};

export default useModal;
