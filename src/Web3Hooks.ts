import {useEffect, useMemo, useState} from 'react';
import {addressIsValid, getProvider} from './Web3Helpers';
import {globalContext} from './Network';

export const useProvider = () =>
  useMemo(() => getProvider(), [globalContext.network]);

export const useEthBalance = (address: string) => {
  const provider = useProvider();
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    if (!addressIsValid(address)) {
      return setBalance(0);
    }
    provider.getBalance(address).then(bal => {
      setBalance(bal.div(1e9).toNumber() / 1e9);
    });
  }, [provider, address]);
  return balance;
};
