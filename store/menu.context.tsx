import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

type WithMenuContext = {
  children: React.ReactNode;
};

type FeatchContextDefaultState = {
  isOpenBurger: boolean;
  setIsOpenBurger: React.Dispatch<React.SetStateAction<boolean>>;
  burgerRef: HTMLDivElement | null;
  setBurgerRef: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
};

const FeatchContextDefaultState: FeatchContextDefaultState = {
  isOpenBurger: false,
  setIsOpenBurger: () => undefined,
  burgerRef: null,
  setBurgerRef: () => undefined,
};

const featchContext = createContext(FeatchContextDefaultState);

const WithMenuContext = ({ children }: WithMenuContext) => {
  const router = useRouter();
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const [burgerRef, setBurgerRef] = useState(null);

  useEffect(() => {
    if (!burgerRef) return;
    if (isOpenBurger) {
      disableBodyScroll(burgerRef);
    } else {
      enableBodyScroll(burgerRef);
    }
  }, [isOpenBurger]);

  const handleRouteChange = () => {
    setIsOpenBurger(false);
    clearAllBodyScrollLocks();
  };

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  });

  return (
    <featchContext.Provider
      value={{
        isOpenBurger,
        setIsOpenBurger,
        burgerRef,
        // @ts-ignore
        setBurgerRef,
      }}
    >
      {children}
    </featchContext.Provider>
  );
};

const useMenuContext = () => useContext(featchContext);

export { WithMenuContext, useMenuContext };
