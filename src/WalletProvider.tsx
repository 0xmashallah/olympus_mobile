import React, {createContext, PropsWithChildren, useContext} from 'react';
import {Wallet} from 'ethers';
import {usePrivateKey} from './WalletUtility';
import {getProvider} from './Web3Helpers';

const WalletContext = createContext<Wallet>(null!);

export const useWallet = () => {
  const privateKey = usePrivateKey();
  if (!privateKey) {
    return null;
  }
  return new Wallet(privateKey, getProvider());
};

export const useWalletContext = () => {
  return useContext<Wallet>(WalletContext);
};

export const WalletProvider = ({children}: PropsWithChildren<{}>) => {
  const wallet = useWallet();
  return (
    <WalletContext.Provider value={wallet!}>
      {wallet && children}
    </WalletContext.Provider>
  );
};
