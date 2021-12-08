import {useWalletContext} from '../../WalletProvider';
import {Alert, Modal, Text, TextInput, View} from 'react-native';
import {ModalShell} from '../../components/ModalShell';
import {ModalHeader} from '../../components/ModalHeader';
import {grayTranslucent} from '../../Styles';
import Clipboard from '@react-native-clipboard/clipboard';
import {OmPillButton} from '../../components/OmPillButton';
import React from 'react';

export const PrivateKeyModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (v: boolean) => void;
}) => {
  const wallet = useWalletContext();
  const privateKey = wallet.privateKey;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <ModalShell>
        <ModalHeader
          setModalVisible={setModalVisible}
          title={'🔐Show Private Key'}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <View>
            <Text
              style={{
                color: grayTranslucent,
                fontWeight: 'bold',
              }}>
              This is your private key (press to copy)
            </Text>
            <TextInput
              editable={false}
              onPressIn={() => {
                Clipboard.setString(privateKey);
                Alert.alert('Your key has been copied!');
              }}
              style={{
                backgroundColor: 'white',
                padding: 15,
                borderRadius: 5,
                marginTop: 10,
              }}>
              {privateKey}
            </TextInput>
            <Text
              style={{
                marginTop: 20,
                color: grayTranslucent,
              }}>
              ⚠️Warning⚠️: NEVER disclose this key. Anyone with your private
              keys can steal any assets held in your account.
            </Text>
            <OmPillButton
              style={{
                marginTop: 180,
              }}
              title={'Done'}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </ModalShell>
    </Modal>
  );
};
