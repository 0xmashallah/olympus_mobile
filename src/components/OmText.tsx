import {Text, TextProps, TextStyle} from 'react-native';
import React from 'react';

export const OmText = (p: TextProps) => (
  <Text
    {...p}
    style={{
      color: 'white',
      ...(p.style as TextStyle),
    }}
  />
);
