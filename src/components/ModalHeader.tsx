import {Text, View} from 'react-native';
import {Icon} from '../../ScaffoldPage';
import React from 'react';
// @ts-ignore
import closeIcon from '../assets/icons/close.png';
// @ts-ignore
import backIcon from '../assets/icons/back.png';

export const ModalHeader = ({
  title,
  setModalVisible,
  goBack,
}: {
  title: string;
  setModalVisible: (v: boolean) => void;
  goBack?: () => void;
}) => (
  <View
    style={{
      justifyContent: 'center',
      flexDirection: 'row',
    }}>
    {goBack ? (
      <View
        style={{
          flex: 1,
        }}>
        <Icon source={backIcon} size={22} onPress={goBack} />
      </View>
    ) : (
      <Text
        style={{
          flex: 1,
        }}
      />
    )}
    <Text
      style={{
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
      }}>
      {title}
    </Text>
    <View
      style={{
        alignItems: 'flex-end',
        flex: 1,
      }}>
      <Icon
        source={closeIcon}
        size={22}
        onPress={() => setModalVisible(false)}
      />
    </View>
  </View>
);
