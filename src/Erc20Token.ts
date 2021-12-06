import {BigNumber, Contract} from 'ethers';
import {Lookup} from './GenericTypes';
import {ContractIsh, getAddress, getErcContract} from './AddressBook';

const SIGNIFICANT_DIGITS = 5;
const pow = (n: number) => `1${'0'.repeat(n)}`;

export class Erc20Token {
  name: string;
  symbol: string;
  decimals: number;
  address: string;
  contract: Contract;

  constructor(
    address: string,
    decimals: number,
    name: string,
    symbol: string,
    contract: Contract,
  ) {
    this.name = name;
    this.symbol = symbol;
    this.decimals = decimals;
    this.address = address;
    this.contract = contract;
  }

  fromBigNumber(b: BigNumber): number {
    return (
      b.mul(pow(SIGNIFICANT_DIGITS)).div(pow(this.decimals)).toNumber() /
      Math.pow(10, SIGNIFICANT_DIGITS)
    );
  }

  toBigNumber(n: number): BigNumber {
    return BigNumber.from(n * Math.pow(10, SIGNIFICANT_DIGITS))
      .mul(pow(this.decimals))
      .div(pow(SIGNIFICANT_DIGITS));
  }
}

const tokenLookup: Lookup<Erc20Token> = {};

export const loadToken = async (id: ContractIsh): Promise<Erc20Token> => {
  const address = typeof id === 'string' ? id : getAddress(id);
  if (tokenLookup[address] !== undefined) {
    return tokenLookup[address];
  }
  const ercContract = getErcContract(id);
  const token = new Erc20Token(
    address,
    await ercContract.decimals(),
    await ercContract.name(),
    await ercContract.symbol(),
    ercContract,
  );
  tokenLookup[address] = token;
  return token;
};
