import {
  ContractId,
  ContractIsh,
  getAddress,
  getPairContract,
} from './AddressBook';
import {loadToken} from './Erc20Token';

export const getRelativePriceInPair = async (
  pair: ContractIsh,
  base: ContractIsh,
) => {
  base = typeof base === 'string' ? base : getAddress(base);
  const pairContract = getPairContract(pair);
  const token0Address = await pairContract.token0();
  const token1Address = await pairContract.token1();
  const token0 = await loadToken(token0Address);
  const token1 = await loadToken(token1Address);
  const [reserves0, reserves1] = await pairContract.getReserves();
  const total0 = token0.fromBigNumber(reserves0);
  const total1 = token1.fromBigNumber(reserves1);

  return base.toLowerCase() === token1Address.toLowerCase()
    ? total1 / total0
    : total0 / total1;
};
