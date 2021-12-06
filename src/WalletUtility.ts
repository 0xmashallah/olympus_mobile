import {Wallet} from 'ethers';
import Keychain, {ACCESS_CONTROL} from 'react-native-keychain';
import {useEffect, useState} from 'react';

export const createNewKeyAndSave = async () => {
  const wallet = Wallet.createRandom();
  const privateKey = wallet.privateKey;
  await Keychain.setGenericPassword('olympus-app', privateKey, {
    accessControl: ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
  });
  return privateKey;
};

export const getPrivateKey = async () => {
  let _key = null;
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    _key = credentials.password;
  }
  return _key;
};

export const loadPrivateKey = async () => {
  let _key = await getPrivateKey();
  if (!_key) {
    _key = await createNewKeyAndSave();
  }
  return _key;
};

export const usePrivateKey = () => {
  const [privateKey, setPrivateKey] = useState<string>('');
  useEffect(() => {
    const load = async () => {
      const _key = await loadPrivateKey();
      setPrivateKey(_key);
    };
    load().then(() => null);
  }, []);
  return privateKey;
};

export const useWallet = () => {
  const privateKey = usePrivateKey();
  if (!privateKey) {
    return null;
  }
  return new Wallet(privateKey);
};

export const useAddress = (): string => {
  const wallet = useWallet();
  return wallet?.address ?? '';
};
