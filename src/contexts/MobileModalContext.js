import { createContext, useContext, useState } from 'react';

export const MobileModalContext = createContext({});

export function MobileModalProvider({ children }) {
  const [isOpenned, setIsOpenned] = useState(false);
  const [showContent, setShowContent] = useState('');

  if (isOpenned === true) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  function handleModalIsOpenned() {
    setIsOpenned((prevState) => (
      prevState === true ? false : true
    ));
  }

  return (
    <MobileModalContext.Provider
      value={{
        handleModalIsOpenned,
        setShowContent,
        isOpenned,
        showContent,
      }}
    >
      {children}
    </MobileModalContext.Provider>
  );
}

export function useMobileModal() {
  return useContext(MobileModalContext);
}
