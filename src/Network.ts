import {AddressBookType} from './GenericTypes';

export enum Network {
  ETHEREUM,
  AVAX,
  FANTOM,
  POLYGON,
  MOONRIVER,
}

export type GlobalContext = {
  network: Network;
};

export const globalContext: GlobalContext = {
  network: Network.ETHEREUM,
};

export const setNetwork = (network: Network) => {
  globalContext.network = network;
};

export const RPCAddressBook: AddressBookType = {
  [Network.ETHEREUM]:
    'https://mainnet.infura.io/v3/6ee202fa79b044de91a589ff621228ed',
  [Network.AVAX]: 'https://api.avax.network/ext/bc/C/rpc',
  [Network.MOONRIVER]: 'https://rpc.moonriver.moonbeam.network',
};
