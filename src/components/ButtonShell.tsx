import React, {PropsWithChildren} from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ohmGold} from '../Styles';

export const ButtonShell = (
  b: PropsWithChildren<{
    style?: ViewStyle;
    onPress?: (event: GestureResponderEvent) => void;
  }>,
) => (
  <TouchableOpacity onPress={b.onPress}>
    <View
      style={{
        paddingHorizontal: 24,
        paddingVertical: 8,
        backgroundColor: ohmGold,
        borderRadius: 4,
        ...b.style,
      }}>
      {b.children}
    </View>
  </TouchableOpacity>
);
