import {
  ButtonProps,
  Text,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

export const OlympusButton = (props: ButtonProps & {style: ViewStyle}) => (
  <View
    style={{
      backgroundColor: '#FFC768',
      paddingHorizontal: 42,
      paddingVertical: 20,
      width: 230,
      alignItems: 'center',
      borderRadius: 33.5,
      ...props.style,
    }}>
    <TouchableNativeFeedback onPress={props.onPress}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        {props.title}
      </Text>
    </TouchableNativeFeedback>
  </View>
);
