import {ethers} from 'ethers';
import {globalContext, Network, RPCAddressBook} from './Network';

export const getProvider = (network: Network = globalContext.network) => {
  const rpcAddress = RPCAddressBook[network];
  return ethers.getDefaultProvider(rpcAddress);
};

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
