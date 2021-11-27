import {globalContext, Network} from './Network';
import {Contract, Wallet} from 'ethers';
import {Erc20ABI} from './abi/ERC20';
import {UniswapV2Pair} from './abi/UniswapV2Pair';
import {NetworkAddressBookType} from './GenericTypes';
import {UniswapV2Router} from './abi/UniswapV2Router';
import {getProvider} from './Web3Helpers';

export enum ContractId {
  MIM,
  SDOG,
  MIM_SDOG,
  JOE_ROUTER,
  WAVAX,
  AROME,
  FRAX,
  AROME_FRAX,
  ETH,
  OHM,
  SOHM,
}

const NetworkAddressBook: NetworkAddressBookType = {
  [Network.ETHEREUM]: {
    [ContractId.OHM]: '0x383518188c0c6d7730d91b2c03a03c837814a899',
    [ContractId.SOHM]: '0x04f2694c8fcee23e8fd0dfea1d4f5bb8c352111f',
  },
  [Network.MOONRIVER]: {
    [ContractId.AROME]: '0x3D2D044E8C6dAd46b4F7896418d3d4DFaAD902bE',
    [ContractId.FRAX]: '0x1A93B23281CC1CDE4C4741353F3064709A16197d',
    [ContractId.AROME_FRAX]: '0xcf06cFB361615C49403B45a5E56E3B7da3462EEA',
  },
  [Network.AVAX]: {
    [ContractId.MIM]: '0x130966628846bfd36ff31a822705796e8cb8c18d',
    [ContractId.SDOG]: '0xde9e52f1838951e4d2bb6c59723b003c353979b6',
    [ContractId.MIM_SDOG]: '0xa3F1F5076499EC37D5BB095551f85ab5a344BB58',
    [ContractId.JOE_ROUTER]: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
    [ContractId.WAVAX]: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
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
export const getPairContract = (id: ContractIsh) =>
  getReadOnlyContract(id, UniswapV2Pair);

export const getReadOnlyContract = (id: ContractIsh, abi: any) => {
  const address = typeof id === 'string' ? id : getAddress(id);
  const provider = getProvider();
  console.log('provider is', provider);
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
