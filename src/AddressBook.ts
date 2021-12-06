import {globalContext, Network} from './Network';
import {Contract, Wallet} from 'ethers';
import {Erc20ABI} from './abi/ERC20';
import {UniswapV2Pair} from './abi/UniswapV2Pair';
import {NetworkAddressBookType} from './GenericTypes';
import {UniswapV2Router} from './abi/UniswapV2Router';
import {getProvider} from './Web3Helpers';
import {RebasingERC20ABI} from './abi/RebasingERC20';

export enum ContractId {
  WETH,
  OHM,
  DAI,
  OHM_DAI,
  SOHM,
  GOHM,
  WAVAX,
  GOHM_WAVAX,
  MIM,
  WAVAX_MIM,
}

const NetworkAddressBook: NetworkAddressBookType = {
  [Network.ETHEREUM]: {
    [ContractId.OHM]: '0x383518188c0c6d7730d91b2c03a03c837814a899',
    [ContractId.DAI]: '0x6b175474e89094c44da98b954eedeac495271d0f',
    [ContractId.SOHM]: '0x04f2694c8fcee23e8fd0dfea1d4f5bb8c352111f',
    [ContractId.GOHM]: '0x0ab87046fBb341D058F17CBC4c1133F25a20a52f',
    [ContractId.OHM_DAI]: '0x34d7d7aaf50ad4944b70b320acb24c95fa2def7c',
  },
  [Network.AVAX]: {
    [ContractId.GOHM]: '0x321e7092a180bb43555132ec53aaa65a5bf84251',
    [ContractId.GOHM_WAVAX]: '0xB674f93952F02F2538214D4572Aa47F262e990Ff',
    [ContractId.WAVAX]: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
    [ContractId.MIM]: '0x130966628846bfd36ff31a822705796e8cb8c18d',
    [ContractId.WAVAX_MIM]: '0x781655d802670bbA3c89aeBaaEa59D3182fD755D',
  },
};

const getAddressBook = () => {
  return NetworkAddressBook[globalContext.network];
};

export const getAddress = (id: ContractId) => {
  return getAddressBook()[id];
};

export type ContractIsh = ContractId | string;

export const getRouterContract = (id: ContractIsh) =>
  getContract(id, UniswapV2Router);
export const getErcContract = (id: ContractIsh) =>
  getReadOnlyContract(id, Erc20ABI);
export const getRebasingTokenContract = (id: ContractIsh, network?: Network) =>
  getReadOnlyContract(id, RebasingERC20ABI, network);
export const getPairContract = (id: ContractIsh) =>
  getReadOnlyContract(id, UniswapV2Pair);

export const getReadOnlyContract = (
  id: ContractIsh,
  abi: any,
  network?: Network,
) => {
  const address = typeof id === 'string' ? id : getAddress(id);
  const provider = getProvider(network);
  return new Contract(address, abi, provider);
};

export const getContract = (id: ContractIsh, abi: any) => {
  const address = typeof id === 'string' ? id : getAddress(id);
  const signer = getSigner();
  return new Contract(address, abi, signer);
};

export const getSigner = () => {
  const {PRIVATE_KEY} = process.env;
  if (!PRIVATE_KEY) {
    throw Error('No private key found');
  }
  return new Wallet(PRIVATE_KEY, getProvider());
};
