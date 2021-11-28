import '@ethersproject/shims';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageProps,
  ImageStyle,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
} from 'react-native';
import { ContractId, getErcContract } from './src/AddressBook';
import { setup } from './src/Web3Setup';
import { useEthBalance } from './src/Web3Hooks';
import { BetterImage } from './src/components/BetterImage';
import { addressIsValid } from './src/Web3Helpers';
import ethIcon from './src/icons/eth-icon.png';
import ohmIcon from './src/icons/ohm-icon.png';
import sOhmIcon from './src/icons/sohm-icon.png';

setup();

export const Icon = (p: ImageProps & { size: number }) => (
  <Image
    {...p}
    style={{
      ...(p.style as ImageStyle),
      width: p.size,
      height: p.size,
    }}
  />
);

const App = () => {
  const [address, setAddress] = useState<string>('');
  const [ohmBalance, setOhmBalance] = useState<number>(0);
  const [sOhmBalance, setSOhmBalance] = useState<number>(0);
  const ethBalance = useEthBalance(address);

  useEffect(() => {
    const load = async () => {
      if (!addressIsValid(address)) {
        setOhmBalance(0);
        setSOhmBalance(0);
        return;
      }
      console.log('getting balance n shit');
      const ohm = getErcContract(ContractId.OHM);
      const sOhm = getErcContract(ContractId.SOHM);
      const base = 1e9;
      const _ohmBal = (await ohm.balanceOf(address)) / base;
      const _sohmBal = (await sOhm.balanceOf(address)) / base;
      setOhmBalance(_ohmBal);
      setSOhmBalance(_sohmBal);
    };
    load().then(() => null);
  }, [address]);

  return (
    <ScrollView>
      <BetterImage
        resizeMode="contain"
        source={{
          uri: 'https://miro.medium.com/max/1400/0*CN4HxAvfH1r5JyAc.png',
        }}
      />
      <View
        style={{
          padding: 25
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          WAGMI Labs Presents
        </Text>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
          }}>
          THE OHM BUYOOOR
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#aaa',
            padding: 10,
            borderRadius: 4,
            marginVertical: 10,
            fontSize: 20,
          }}
          placeholder={'Paste your address here'}
          onChangeText={setAddress}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginVertical: 10,
          }}>
          Your Balances
        </Text>
        {[
          ['ETH', ethBalance, ethIcon],
          ['OHM', ohmBalance, ohmIcon],
          ['sOHM', sOhmBalance, sOhmIcon],
        ].map(([symbol, balance, iconSrc]) => (
          <View
            key={symbol}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Icon
              source={iconSrc}
              size={40}
              style={{
                marginRight: 15,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {symbol}:{' '}
            </Text>
            <Text
              style={{
                fontSize: 20,
              }}>
              {balance.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default App;
