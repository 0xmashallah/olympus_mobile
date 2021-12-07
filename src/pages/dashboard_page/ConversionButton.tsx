import {View, ViewStyle} from 'react-native';
import {ohmGold} from '../../Styles';
import {Icon} from '../../../ScaffoldPage';
import React from 'react';

// @ts-ignore
import conversionIcon from '../../assets/icons/conversion.png';

export const ConversionButton = ({
  onPress,
  style,
}: {
  onPress?: () => void;
  style?: ViewStyle;
}) => (
  <View
    style={{
      backgroundColor: ohmGold,
      width: 30,
      height: 25,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      ...style,
    }}>
    <Icon
      source={conversionIcon}
      size={18}
      resizeMode={'contain'}
      onPress={onPress}
    />
  </View>
);
