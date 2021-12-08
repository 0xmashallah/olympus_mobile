import {AddressBookType} from './GenericTypes';

export enum Network {
  ETHEREUM,
  AVAX,
  MOONRIVER,
}

export type GlobalContext = {
  network: Network;
};

export const globalContext: GlobalContext = {
  network: Network.AVAX,
};

export const setNetwork = (network: Network) => {
  globalContext.network = network;
};

export const RPCAddressBook: AddressBookType = {
  [Network.ETHEREUM]:
    'https://eth-mainnet.alchemyapi.io/v2/DffrXz5NVV-fpp3-rLybLeftbmzZQFFW',
  [Network.AVAX]: 'https://api.avax.network/ext/bc/C/rpc',
  [Network.MOONRIVER]: 'https://rpc.moonriver.moonbeam.network',
};
