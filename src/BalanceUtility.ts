import {globalContext, Network} from './Network';
import {Lookup} from './GenericTypes';
import {ContractId, getRebasingTokenContract} from './AddressBook';
import {useEffect, useState} from 'react';
import {loadToken} from './Erc20Token';
import {getRelativePriceInPair} from './PairUtility';
import {useAddress} from './WalletUtility';

export const useNetwork = () => globalContext.network;

export const useCoins = (): ContractId[] => {
  const network = useNetwork();
  const coinLookup: Lookup<ContractId[]> = {
    [Network.ETHEREUM]: [ContractId.OHM, ContractId.SOHM, ContractId.GOHM],
    [Network.AVAX]: [ContractId.GOHM],
  };
  return coinLookup[network];
};

export const getOhmPrice = async () => {
  return getRelativePriceInPair(ContractId.OHM_DAI, ContractId.DAI);
};

export const useOhmIndex = () => {
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    const load = async () => {
      setIndex(await getOhmIndex());
    };
    load().then(() => null);
  });
  return index;
};

export const getOhmIndex = async () => {
  const rebasingToken = getRebasingTokenContract(
    ContractId.SOHM,
    Network.ETHEREUM,
  );
  return (await rebasingToken.index()) / 1e9;
};

export const getGOhmPrice = async () => {
  const {network} = globalContext;
  if (network === Network.ETHEREUM) {
    const index = await getOhmIndex();
    return (await getOhmPrice()) * index;
  }
  const wAvaxPerGOhm = await getRelativePriceInPair(
    ContractId.GOHM_WAVAX,
    ContractId.WAVAX,
  );
  const mimPerWAvax = await getRelativePriceInPair(
    ContractId.WAVAX_MIM,
    ContractId.MIM,
  );
  return mimPerWAvax * wAvaxPerGOhm;
};

export const usePrices = (): Lookup<number> => {
  const coins = useCoins();
  const [prices, setPrices] = useState<Lookup<number>>(
    coins.reduce((lookup, contractId) => {
      lookup[contractId] = 0;
      return lookup;
    }, {} as Lookup<number>),
  );
  const {network} = globalContext;

  useEffect(() => {
    const load = async () => {
      if (network === Network.ETHEREUM) {
        const ohmPrice = await getOhmPrice();
        const gOhmPrice = await getGOhmPrice();
        setPrices({
          [ContractId.OHM]: ohmPrice,
          [ContractId.SOHM]: ohmPrice,
          [ContractId.GOHM]: gOhmPrice,
        });
      } else {
        const gOhmPrice = await getGOhmPrice();
        setPrices({
          [ContractId.GOHM]: gOhmPrice,
        });
      }
    };
    load().then(() => null);
  }, [network]);

  console.log('prices', prices);
  return prices;
};

export const useBalances = (): Lookup<number> => {
  const coins = useCoins();
  const address = useAddress();
  const [balances, setBalances] = useState<Lookup<number>>({});

  useEffect(() => {
    const load = async () => {
      if (!address) {
        return;
      }
      const _balances: Lookup<number> = {};
      for (const coin of coins) {
        try {
          const token = await loadToken(coin);
          const balance = await token.contract.balanceOf(address);
          console.log('balance', balance, 'address', address);
          _balances[coin] = token.fromBigNumber(balance);
        } catch (e) {
          console.error(
            'error loading coin',
            coin,
            'getting balance of ',
            address,
            e,
          );
        }
      }
      setBalances(_balances);
    };
    load().then(() => null);
  }, [address]);

  console.log('balances', balances, 'address', address);
  return balances;
};

export const useTotalUsdBalance = (): number => {
  const balances = useBalances();
  const prices = usePrices();
  return Object.entries(balances)
    .map(([coinId, amount]) => {
      return prices[coinId] * amount;
    })
    .reduce((a, b) => a + b, 0);
};

export const useTotalOhmBalance = (): number => {
  const index = useOhmIndex();
  const balances = useBalances();
  return Object.entries(balances)
    .map(([coinId, balance]) => {
      if (coinId === ContractId.GOHM.toString()) {
        return balance * index;
      }
      return balance;
    })
    .reduce((a, b) => a + b, 0);
};
