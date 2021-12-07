import {
  ButtonProps,
  GestureResponderEvent,
  ImageSourcePropType,
  Text,
  TextStyle,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {ohmGold} from '../Styles';
import {OmIcon} from './OmIcon';
import React, {PropsWithChildren} from 'react';

const ButtonShell = (
  b: PropsWithChildren<{
    style?: ViewStyle;
    onPress?: (event: GestureResponderEvent) => void;
  }>,
) => (
  <View
    style={{
      paddingHorizontal: 24,
      paddingVertical: 8,
      backgroundColor: ohmGold,
      borderRadius: 4,
      ...b.style,
    }}>
    <TouchableNativeFeedback onPress={b.onPress}>
      {b.children}
    </TouchableNativeFeedback>
  </View>
);

export interface OmButtonProps extends ButtonProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const OmButton = (b: OmButtonProps) => (
  <ButtonShell onPress={b.onPress} style={b.style}>
    <Text
      style={{
        fontSize: 14,
        ...b.textStyle,
      }}>
      {b.title}
    </Text>
  </ButtonShell>
);

export const OmIconButton = (
  b: ButtonProps & {
    style?: ViewStyle;
    source: ImageSourcePropType;
    size: number;
  },
) => (
  <ButtonShell onPress={b.onPress} style={b.style}>
    <View
      style={{
        flexDirection: 'row',
      }}>
      <OmIcon
        source={b.source}
        size={b.size}
        style={{
          marginRight: 5,
        }}
      />
      <Text
        style={{
          fontSize: 14,
        }}>
        {b.title}
      </Text>
    </View>
  </ButtonShell>
);
