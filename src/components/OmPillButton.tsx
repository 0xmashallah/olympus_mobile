import {OmButton, OmButtonProps} from './OmIconButton';
import React from 'react';

export const OmPillButton = (b: OmButtonProps) => (
  <OmButton
    {...b}
    style={{
      borderRadius: 30,
      alignItems: 'center',
      paddingVertical: 15,
      ...b.style,
    }}
    textStyle={{
      fontSize: 18,
      fontWeight: '500',
    }}
  />
);
