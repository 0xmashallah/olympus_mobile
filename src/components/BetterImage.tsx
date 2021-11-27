import {Image, ImageProps, ImageURISource} from 'react-native';
import React, {useEffect, useState} from 'react';

export const BetterImage = (p: ImageProps) => {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [ratio, setRatio] = useState<number>(0);
  const {source} = p;
  const uri = (source as ImageURISource).uri;
  if (!uri) {
    throw Error('No uri');
  }

  useEffect(() => {
    Image.getSize(uri, (_width, _height) => {
      const _ratio = _height / _width;
      setRatio(_ratio);
      setHeight(width * _ratio);
    });
  });

  return (
    <Image
      {...p}
      onLayout={event => {
        const {width: _width} = event.nativeEvent.layout;
        const _height = ratio * width;
        setWidth(_width);
        setHeight(_height);
      }}
      style={{
        width: '100%',
        height,
      }}
    />
  );
};
