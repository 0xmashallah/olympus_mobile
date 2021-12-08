import { ButtonProps, ImageSourcePropType, Text, TextStyle, View, ViewStyle } from "react-native";
import { OmIcon } from "./OmIcon";
import React from "react";
import { ButtonShell } from "./ButtonShell";

export interface OmButtonProps extends ButtonProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
}

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
