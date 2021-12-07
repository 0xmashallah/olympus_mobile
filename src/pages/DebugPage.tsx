import React, {useState} from 'react';
import {Button, View} from 'react-native';
import {OmButton} from '../components/OmIconButton';
import Keychain, {ACCESS_CONTROL} from 'react-native-keychain';
import { useWallet } from "../WalletProvider";

export const DebugPage = () => {
  const wallet = useWallet();
  console.log('mnemonic', wallet?.mnemonic);
  return (
    <View>
      <OmButton
        style={{
          marginTop: 100,
        }}
        title={'reset private key'}
        onPress={async () => {
          const privateKey =
            '0x11788e29bd1047ededdeeb6bf95e371eae5854189887ea5be083e257d32dc90b';
          await Keychain.setGenericPassword('olympus-app', privateKey, {
            accessControl: ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
          });
        }}
      />
    </View>
  );
};
