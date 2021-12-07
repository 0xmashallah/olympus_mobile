import {useEffect, useState} from 'react';
import {useWalletContext} from './WalletProvider';

export const useNetworkCurrencyBalance = () => {
  const wallet = useWalletContext();
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    wallet.getBalance().then(bal => {
      setBalance(bal.div(1e9).toNumber() / 1e9);
    });
  }, [wallet]);
  return balance;
};
