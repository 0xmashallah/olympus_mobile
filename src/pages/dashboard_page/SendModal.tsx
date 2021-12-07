import React, {useState} from 'react';
import {ModalShell} from '../../components/ModalShell';
import {Modal, Text} from 'react-native';
import {ModalHeader} from '../../components/ModalHeader';
import {useTotalUsdBalance} from '../../BalanceUtility';
import {grayTranslucent} from '../../Styles';
import {AddressScreen} from './AddressScreen';
import {AmountScreen} from './AmountScreen';

export const SendModal = ({
  modalVisible,
  setModalVisible,
  onSend,
}: {
  modalVisible: boolean;
  setModalVisible: (v: boolean) => void;
  onSend: (to: string, amount: number) => void;
}) => {
  const [screen, setScreen] = useState<string>(AddressScreen.routeName);
  const [toAddress, setToAddress] = useState<string>('');
  const usdBalance = useTotalUsdBalance();
  const goBack = () => setScreen(AddressScreen.routeName);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onDismiss={() => {
        setScreen(AddressScreen.routeName);
      }}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <ModalShell>
        <ModalHeader
          setModalVisible={setModalVisible}
          title={'Send'}
          goBack={screen === AddressScreen.routeName ? undefined : goBack}
        />
        <Text
          style={{
            textAlign: 'center',
            color: grayTranslucent,
          }}>
          ${usdBalance.toFixed(2)} available
        </Text>
        {screen === AddressScreen.routeName ? (
          <AddressScreen
            setScreen={setScreen}
            setToAddress={setToAddress}
            toAddress={toAddress}
          />
        ) : (
          <AmountScreen
            onSend={amount => {
              onSend(toAddress, amount);
            }}
          />
        )}
      </ModalShell>
    </Modal>
  );
};
