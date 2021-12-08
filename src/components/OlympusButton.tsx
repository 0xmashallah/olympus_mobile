import {
  ButtonProps,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

export const OlympusButton = (props: ButtonProps & {style: ViewStyle}) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{
      ...props.style,
    }}>
    <View
      style={{
        backgroundColor: '#FFC768',
        paddingHorizontal: 42,
        paddingVertical: 20,
        width: 230,
        alignItems: 'center',
        borderRadius: 33.5,
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        {props.title}
      </Text>
    </View>
  </TouchableOpacity>
);
