import {ethers} from 'ethers';
import {globalContext, RPCAddressBook} from './Network';

export const getProvider = () =>
  ethers.getDefaultProvider(RPCAddressBook[globalContext.network]);

export const web3Provider = () =>
  new ethers.providers.JsonRpcProvider(RPCAddressBook[globalContext.network]);

export const addressIsValid = (address: string) => {
  try {
    ethers.utils.getAddress(address);
    return true;
  } catch (e) {
    return false;
  }
};
