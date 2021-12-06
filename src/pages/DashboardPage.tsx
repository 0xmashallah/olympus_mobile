import React, {PropsWithChildren, useState} from 'react';
import {Alert, Modal, Switch, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {OmText} from '../components/OmText';
import {grayTranslucent, ohmGold} from '../Styles';
import {useTotalOhmBalance, useTotalUsdBalance} from '../BalanceUtility';
import {OmButton, OmIconButton} from '../components/OmIconButton';
// @ts-ignore
import downArrow from '../assets/icons/down-arrow.png';
// @ts-ignore
import rightArrow from '../assets/icons/right-arrow.png';
// @ts-ignore
import closeIcon from '../assets/icons/close.png';
import {Icon} from '../../ScaffoldPage';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import {useWallet} from '../WalletUtility';
import {Wallet} from 'ethers';

const WalletContext = React.createContext<Wallet | null>(null);

export const WalletProvider = ({children}: PropsWithChildren<{}>) => {
  const wallet = useWallet();
  return (
    <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
  );
};

export const DashboardPage = () => {
  const [isOhm, setIsOhm] = useState<boolean>(false);
  const totalUsdBalance = useTotalUsdBalance();
  const totalOhmBalance = useTotalOhmBalance();
  const [modalVisible, setModalVisible] = useState(false);
  const wallet = useWallet();

  return (
    <View
      style={{
        flex: 1,
      }}>
      <LinearGradient
        colors={['#253449', '#000000']}
        style={{
          flex: 1,
          paddingHorizontal: 16,
        }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              backgroundColor: '#F3F3F3',
              flex: 1,
              marginHorizontal: 16,
              marginTop: 50,
              marginBottom: 16,
              borderRadius: 12,
              padding: 18,
            }}>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  flex: 1,
                }}
              />
              <Text
                style={{
                  flex: 1,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                Request
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
                  onPress={() => Clipboard.setString(wallet?.address ?? '')}
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
          </View>
        </Modal>

        <View
          style={{
            marginTop: 100,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <OmText
            style={{
              fontSize: 40,
              marginRight: 10,
            }}>
            {isOhm
              ? `${totalOhmBalance.toFixed(2)} OHM`
              : `$${totalUsdBalance.toFixed(2)}`}
          </OmText>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={ohmGold}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsOhm(!isOhm)}
            value={isOhm}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
          }}>
          {[
            ['Send', rightArrow],
            [
              'Request',
              downArrow,
              () => {
                setModalVisible(true);
              },
            ],
          ].map(([t, source, onPress], i) => (
            <OmIconButton
              key={i}
              title={t}
              style={{
                marginRight: 10,
              }}
              source={source}
              size={16}
              onPress={onPress}
            />
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

DashboardPage.routeName = 'DashboardPage';
