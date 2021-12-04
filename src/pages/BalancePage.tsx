import React from 'react';
import {View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ohmLogoTop from '../assets/icons/ohm-logo-top.png';

export const BalancePage = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <LinearGradient
        colors={['#253449', '#000000']}
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Image
          resizeMode={'contain'}
          style={{
            marginTop: 40,
            width: 29,
            height: 26,
          }}
          source={ohmLogoTop}
        />
      </LinearGradient>
    </View>
  );
};

BalancePage.routeName = 'BalancePage';
