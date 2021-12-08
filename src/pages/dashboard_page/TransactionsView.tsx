import {ScrollView, Text, View, ViewProps, ViewStyle} from 'react-native';
import {useAddress} from '../../WalletUtility';
import React, {useEffect, useState} from 'react';
import {useOhmIndex} from '../../BalanceUtility';
import {loadToken} from '../../Erc20Token';
import {ContractId} from '../../AddressBook';
import {BigNumber} from 'ethers';
import {Icon} from '../../../ScaffoldPage';
// @ts-ignore
import ohmIcon from '../../assets/icons/ohm-icon-empty-transactions.png';
import {grayTranslucent, ohmGold} from '../../Styles';
import {OmText} from '../../components/OmText';
import {Lookup} from '../../GenericTypes';

enum Direction {
  SEND,
  RECEIVE,
}

interface Transaction {
  date: Date;
  direction: Direction;
  amountOhm: number;
}

export const TransactionsView = ({style}: ViewProps) => {
  const address = useAddress();
  const API_KEY = 'HTJ758E7D9K6DIJP9WK73W42XTYF89JUGP';
  const url = `https://api.snowtrace.io/api?module=account&action=tokentx&address=${address}&sort=asc&apikey=${API_KEY}`;
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const ohmIndex = useOhmIndex();

  useEffect(() => {
    const load = async () => {
      const txRequest = await fetch(url);
      const txJson = await txRequest.json();
      const _transactions = txJson.result;
      const gOhm = await loadToken(ContractId.GOHM);
      setTransactions(
        _transactions
          .filter((t: any) => t.tokenSymbol === gOhm.symbol)
          .map((t: any) => {
            const date = new Date(parseInt(t.timeStamp) * 1e3);
            const direction =
              t.to.toLowerCase() === address.toLowerCase()
                ? Direction.RECEIVE
                : Direction.SEND;
            const amount = gOhm.fromBigNumber(BigNumber.from(t.value));
            const amountOhm = amount * ohmIndex;
            return {
              date,
              direction,
              amountOhm,
            };
          }),
      );
    };
    load().then(() => null);
  }, [ohmIndex]);

  const EmptyTransactionView = () => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
      }}>
      <Icon source={ohmIcon} size={75} />
      <Text
        style={{
          textAlign: 'center',
          marginTop: 15,
          width: '50%',
          color: '#595C67',
        }}>
        You haven't made any transactions yet
      </Text>
    </View>
  );

  return (
    <View
      style={{
        ...(style as ViewStyle),
        flex: 1,
        backgroundColor: grayTranslucent,
        paddingVertical: 18,
        borderRadius: 12,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}>
      <View
        style={{
          paddingHorizontal: 18,
          flexDirection: 'row',
          marginBottom: 20,
        }}>
        <OmText>Transactions</OmText>
      </View>
      <ScrollView
        style={{
          paddingHorizontal: 18,
          flex: 1,
        }}>
        {transactions.length > 0 ? (
          transactions.map((t, i) => {
            const labelLookup: Lookup<string> = {
              [Direction.SEND]: 'Send',
              [Direction.RECEIVE]: 'Receive',
            };
            const {date, amountOhm, direction} = t;
            const format = (s: number) => (s < 10 ? '0' + s : s);
            const dateText = `${date.getUTCFullYear()}-${format(
              date.getUTCMonth(),
            )}-${format(date.getUTCDay())}`;
            const timeText = `${format(date.getUTCHours())}:${format(
              date.getUTCMinutes(),
            )}:${format(date.getUTCSeconds())}`;
            const label = labelLookup[direction];
            return (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'rgb(68, 78, 93)',
                  paddingHorizontal: 15,
                  paddingVertical: 12,
                  marginTop: i === 0 ? 0 : 15,
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '45%',
                  }}>
                  <OmText>{dateText}</OmText>
                  <Text
                    style={{
                      color: '#C2C2C2',
                    }}>
                    {timeText}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}>
                  <OmText>{amountOhm.toFixed(5)} Ω</OmText>
                  <Text
                    style={{
                      color: ohmGold,
                    }}>
                    {label}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <EmptyTransactionView />
        )}
      </ScrollView>
    </View>
  );
};
