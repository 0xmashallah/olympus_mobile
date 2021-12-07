import React, {PropsWithChildren} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';

export const ModalShell = ({style, children}: PropsWithChildren<ViewProps>) => (
  <View
    style={{
      backgroundColor: '#F3F3F3',
      flex: 1,
      marginHorizontal: 16,
      marginTop: 50,
      marginBottom: 16,
      borderRadius: 12,
      padding: 18,
      ...(style as ViewStyle),
    }}>
    {children}
  </View>
);
