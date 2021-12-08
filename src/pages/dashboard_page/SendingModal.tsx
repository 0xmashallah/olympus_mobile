import React, {PropsWithChildren} from 'react';
import {ActivityIndicator, Button, Linking, Modal, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useOhmPrice} from '../../BalanceUtility';
import {SuccessMessage} from './SuccessMessage';
import {OmText} from '../../components/OmText';

export const SendingModalBackground = (p: PropsWithChildren<{}>) => (
  <LinearGradient
    useAngle={true}
    angle={87}
    angleCenter={{
      x: 0.6,
      y: 0.5,
    }}
    colors={[
      'rgba(180,255,217,0.1)',
      'rgba(153,207,255,0.15)',
      'rgba(180,255,217,0.3)',
      'rgba(153,207,255,0.3)',
    ]}
    style={{
      flex: 1,
    }}>
    <LinearGradient
      colors={['rgba(0,0,0,0)', 'rgba(0,0,10,0.95)']}
      style={{
        flex: 1,
      }}>
      {p.children}
    </LinearGradient>
  </LinearGradient>
);

export const SendingMessage = ({txHash}: {txHash?: string}) => (
  <View>
    <OmText
      style={{
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16,
      }}>
      Transaction in progress...
    </OmText>
    <ActivityIndicator
      style={{
        marginBottom: 10,
      }}
    />
    {txHash && (
      <View>
        <View
          style={{
            marginHorizontal: 30,
            flexDirection: 'row',
          }}>
          <OmText
            style={{
              fontSize: 16,
            }}>
            Tx:{' '}
          </OmText>
          <OmText
            numberOfLines={1}
            ellipsizeMode={'middle'}
            style={{
              flexShrink: 1,
              fontSize: 16,
              textAlign: 'center',
            }}>
            {txHash}
          </OmText>
        </View>
        <Button
          title={'View on Snowtrace'}
          onPress={() => Linking.openURL(`https://snowtrace.io/tx/${txHash}`)}
        />
      </View>
    )}
  </View>
);
export interface SendingInfo {
  amountOhm: number;
  toAddress: string;
  sending: boolean;
  txHash?: string;
}

export const SendingModal = ({
  modalVisible,
  setModalVisible,
  sendingInfo: {amountOhm, toAddress, sending, txHash},
}: {
  modalVisible: boolean;
  setModalVisible: (v: boolean) => void;
  sendingInfo: SendingInfo;
}) => {
  const ohmPrice = useOhmPrice();
  const amountUsd = amountOhm * ohmPrice;

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={{flex: 1, backgroundColor: '#080F35'}}>
        <SendingModalBackground>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            {sending ? (
              <SendingMessage txHash={txHash} />
            ) : (
              <SuccessMessage
                setModalVisible={setModalVisible}
                amountOhm={amountOhm}
                amountUsd={amountUsd}
                address={toAddress}
              />
            )}
          </View>
        </SendingModalBackground>
      </View>
    </Modal>
  );
};
