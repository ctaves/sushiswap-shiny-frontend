import React, { createContext, useCallback, useState } from "react";
import Transition from "../../components/Transition";
export const Context = createContext({
  onPresent: () => {},
  onDismiss: () => {},
});
const Modals = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState();
  const [modalKey, setModalKey] = useState();
  const [history, setHistory] = useState();
  const [data, setData] = useState();
  const handlePresent = useCallback(
    (modalContent, key, data, history) => {
      setData(data);
      setHistory(history);
      setModalKey(key);
      setContent(modalContent);
      setIsOpen(true);
    },
    [setContent, setIsOpen, setModalKey]
  );
  const handleDismiss = useCallback(() => {
    setContent(undefined);
    setIsOpen(false);
  }, [setContent, setIsOpen, modalKey]);
  return (
    <Context.Provider
      value={{
        history,
        data,
        content,
        isOpen,
        onPresent: handlePresent,
        onDismiss: handleDismiss,
      }}
    >
      {children}
      {isOpen && (
        <>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex block pb-16 pt-14 md:pt-4 md:px-4 md:pb-20 items-end md:items-center justify-center min-h-screen text-center">
              <Transition
                show={isOpen}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={handleDismiss} />
                </div>
              </Transition>
              <Transition
                show={isOpen}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                {React.isValidElement(content) &&
                  React.cloneElement(content, {
                    onDismiss: handleDismiss,
                    history: history,
                    data: data,
                  })}
              </Transition>
            </div>
          </div>
        </>
      )}
    </Context.Provider>
  );
};

export default Modals;
