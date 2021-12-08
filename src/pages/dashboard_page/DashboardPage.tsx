import React, { useState } from "react";
import { Switch, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { OmText } from "../../components/OmText";
import { ohmGold } from "../../Styles";
import { getOhmIndex, useOhmPrice, useTotalUsdBalance } from "../../BalanceUtility";
import { OmIconButton } from "../../components/OmIconButton";
import { useNetworkCurrencyBalance } from "../../Web3Hooks";
import { ReceiveModal } from "./ReceiveModal";
import { SendModal } from "./SendModal";
import { SendingInfo, SendingModal } from "./SendingModal";
import { loadToken } from "../../Erc20Token";
import { ContractId, useErcContract } from "../../AddressBook";
// @ts-ignore
import downArrow from "../../assets/icons/down-arrow.png";
// @ts-ignore
import rightArrow from "../../assets/icons/right-arrow.png";
// @ts-ignore
import keyIcon from "../../assets/icons/key.png";
import { Icon } from "../../../ScaffoldPage";
import { getPrivateKey } from "../../WalletUtility";
import { TransactionsView } from "./TransactionsView";
import { PrivateKeyModal } from "./PrivateKeyModal";

export const ExportPrivateKeyButton = ({
  setShowPrivateKey,
}: {
  setShowPrivateKey: (show: boolean) => void;
}) => (
  <View
    style={{
      position: 'absolute',
      right: 30,
      bottom: 30,
    }}>
    <Icon
      source={keyIcon}
      size={30}
      onPress={async () => {
        try {
          await getPrivateKey();
          setShowPrivateKey(true);
        } catch (e) {
          console.log('error: could not authenticate', e);
        }
      }}
    />
  </View>
);

export const DashboardPage = () => {
  const [isOhm, setIsOhm] = useState<boolean>(false);
  const [forceUpdate, setForceUpdate] = useState<number>(0);
  const totalUsdBalance = useTotalUsdBalance(forceUpdate);
  const ohmPrice = useOhmPrice();
  const totalOhmBalance = totalUsdBalance / ohmPrice;
  const [receiveModalVisible, setReceiveModalVisible] = useState(false);
  const [sendModalVisible, setSendModalVisible] = useState(false);
  const [sendingModalVisible, setSendingModalVisible] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const balance = useNetworkCurrencyBalance();
  const gOhmContract = useErcContract(ContractId.GOHM);
  const [sendingInfo, setSendingInfo] = useState<SendingInfo>({
    amountOhm: 0,
    toAddress: '',
    sending: false,
    txHash: '',
  });
  const onSend = async (toAddress: string, amountOhm: number) => {
    setSendModalVisible(false);
    let info: SendingInfo = {
      amountOhm,
      toAddress,
      sending: true,
    };
    setSendingInfo(info);
    setSendingModalVisible(true);
    const index = await getOhmIndex();
    const gOhm = await loadToken(ContractId.GOHM);
    const bnAmount = gOhm.toBigNumber(amountOhm / index);
    const tx = await gOhmContract.transfer(toAddress, bnAmount);
    info = {...info, txHash: tx.hash};
    setSendingInfo(info);
    console.log(`https://snowtrace.io/tx/${tx.hash}`);
    await tx.wait();
    info = {...info, sending: false};
    setForceUpdate(forceUpdate + 1);
    setSendingInfo(info);
  };

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
        <ReceiveModal
          modalVisible={receiveModalVisible}
          setModalVisible={setReceiveModalVisible}
        />
        <SendModal
          onSend={onSend}
          modalVisible={sendModalVisible}
          setModalVisible={setSendModalVisible}
        />
        <SendingModal
          sendingInfo={sendingInfo}
          modalVisible={sendingModalVisible}
          setModalVisible={setSendingModalVisible}
        />
        <PrivateKeyModal
          modalVisible={showPrivateKey}
          setModalVisible={setShowPrivateKey}
        />
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
              ? `${totalOhmBalance.toFixed(5)} Ω`
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
        <OmText
          style={{
            fontSize: 11,
            opacity: 0.5,
          }}>
          {balance.toFixed(3)} AVAX available
        </OmText>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
          }}>
          {[
            [
              'Send',
              rightArrow,
              () => {
                setSendModalVisible(true);
              },
            ],
            [
              'Receive',
              downArrow,
              () => {
                setReceiveModalVisible(true);
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

        <TransactionsView
          style={{
            marginTop: 30,
          }}
        />

        <ExportPrivateKeyButton setShowPrivateKey={setShowPrivateKey} />
      </LinearGradient>
    </View>
  );
};

DashboardPage.routeName = 'DashboardPage';
