import React from 'react';
import {useWalletContext} from '../../WalletProvider';
import {Alert, Modal, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {grayTranslucent} from '../../Styles';
import Clipboard from '@react-native-clipboard/clipboard';
import {ModalShell} from '../../components/ModalShell';
import {ModalHeader} from '../../components/ModalHeader';
import {OmButton} from '../../components/OmButton';

export const ReceiveModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (v: boolean) => void;
}) => {
  const wallet = useWalletContext();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <ModalShell>
        <ModalHeader setModalVisible={setModalVisible} title={'Request'} />
        <View
          style={{
            marginTop: 100,
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 15,
              borderRadius: 15,
            }}>
            <QRCode size={240} value={wallet?.address ?? ''} />
          </View>
          <Text style={{marginTop: 13, color: grayTranslucent}}>
            Send only gOHM on the AVAX network
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 4,
              borderColor: grayTranslucent,
              padding: 5,
              width: '90%',
              marginTop: 25,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'middle'}
              style={{
                flexShrink: 1,
                color: '#595C67',
                fontWeight: '500',
              }}>
              {wallet?.address}
            </Text>
            <OmButton
              onPress={() => {
                Clipboard.setString(wallet.address);
                Alert.alert('Your key has been copied!');
              }}
              title={'COPY'}
              textStyle={{
                fontSize: 12,
              }}
              style={{
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 15,
              }}
            />
          </View>
        </View>
      </ModalShell>
    </Modal>
  );
};
