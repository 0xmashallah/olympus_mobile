import {Text, TextInput, View} from 'react-native';
import {Spacer} from '../../components/Spacer';
import {grayTranslucent} from '../../Styles';
import {addressIsValid} from '../../Web3Helpers';
import {OmPillButton} from '../../components/OmPillButton';
import React from 'react';
import {AmountScreen} from './AmountScreen';

export const AddressScreen = ({
  setScreen,
  setToAddress,
  toAddress,
}: {
  setScreen: (name: string) => void;
  setToAddress: (name: string) => void;
  toAddress: string;
}) => (
  <View
    style={{
      flex: 1,
    }}>
    <Spacer />
    <TextInput
      style={{
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 4,
        fontSize: 16,
      }}
      placeholder={'Long press to paste'}
      placeholderTextColor={'rgba(0,0,0,0.5)'}
      onChangeText={setToAddress}
    />
    <Text
      style={{
        marginTop: 8,
        color: grayTranslucent,
      }}>
      The address should start with 0x.
    </Text>
    <Spacer />
    {addressIsValid(toAddress) && (
      <OmPillButton
        style={{
          marginBottom: 25,
        }}
        title={'Continue'}
        onPress={() => setScreen(AmountScreen.routeName)}
      />
    )}
  </View>
);

AddressScreen.routeName = 'AddressScreen';
