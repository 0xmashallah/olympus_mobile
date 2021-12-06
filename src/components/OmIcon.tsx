import {Image, ImageProps, ImageStyle} from 'react-native';
import React from 'react';

export const OmIcon = (p: ImageProps & {size: number}) => (
  <Image
    resizeMode={'contain'}
    {...p}
    style={{
      width: p.size,
      height: p.size,
      ...(p.style as ImageStyle),
    }}
  />
);
