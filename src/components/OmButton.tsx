import {ButtonShell} from './ButtonShell';
import {Text} from 'react-native';
import React from 'react';
import {OmButtonProps} from './OmIconButton';

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
