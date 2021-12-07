import {View} from 'react-native';
import {Icon} from '../../../ScaffoldPage';
import successIcon from '../../assets/icons/success.png';
import {OmText} from '../../components/OmText';
import ohmLogo from '../../assets/icons/ohm-logo-white.png';
import {OmPillButton} from '../../components/OmPillButton';
import React from 'react';

export const SuccessMessage = ({
  amountUsd,
  amountOhm,
  address,
  setModalVisible,
}: {
  amountUsd: number;
  amountOhm: number;
  address: string;
  setModalVisible: (v: boolean) => void;
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        width: '100%',
      }}>
      <Icon source={successIcon} size={91} />
      <OmText
        style={{
          marginTop: 45,
          fontSize: 16,
          textAlign: 'center',
          fontWeight: '500',
        }}>
        You sent ${amountUsd.toFixed(2)}({amountOhm.toFixed(5)} OHM) to{' '}
      </OmText>
      <View
        style={{
          marginTop: 6,
          width: '80%',
        }}>
        <OmText
          ellipsizeMode={'middle'}
          numberOfLines={1}
          style={{
            fontSize: 16,
            textAlign: 'center',
            fontWeight: '500',
          }}>
          {address}
        </OmText>
      </View>

      <View
        style={{
          marginTop: 16,
          flexDirection: 'row',
        }}>
        <OmText
          style={{
            marginRight: 8,
          }}>
          Thanks for being an Ohmie!
        </OmText>
        <Icon source={ohmLogo} size={14} />
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 15,
          marginTop: 60,
        }}>
        <OmPillButton title={'Done'} onPress={() => setModalVisible(false)} />
      </View>
    </View>
  );
};
