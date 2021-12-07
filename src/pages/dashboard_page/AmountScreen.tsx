import React, {useState} from 'react';
import {useOhmPrice} from '../../BalanceUtility';
import {Text, TextInput, View} from 'react-native';
import {Spacer} from '../../components/Spacer';
import {grayTranslucent} from '../../Styles';
import {OmPillButton} from '../../components/OmPillButton';
import {ConversionButton} from './ConversionButton';

export const AmountScreen = ({onSend}: {onSend: (amount: number) => void}) => {
  const [isDollar, setIsDollar] = useState<boolean>(true);
  const ohmPrice = useOhmPrice();
  const conversionFunction = (input: number) =>
    input === 0 ? 0 : isDollar ? input / ohmPrice : input * ohmPrice;
  const [sendAmount, setSendAmount] = useState<string>('0');
  const amountFloat = sendAmount ? parseFloat(sendAmount) : 0;
  const validateText = (t: string): boolean => {
    return t.split('.').length < 3;
  };

  return (
    <View style={{flex: 1}}>
      <Spacer />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ConversionButton
          onPress={() => {
            setSendAmount(
              conversionFunction(
                sendAmount ? parseFloat(sendAmount) : 0,
              ).toFixed(isDollar ? 5 : 2),
            );
            setIsDollar(!isDollar);
          }}
          style={{
            marginRight: 10,
          }}
        />
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            {isDollar && (
              <Text
                style={{
                  fontSize: 34,
                  fontWeight: 'bold',
                }}>
                $
              </Text>
            )}
            <TextInput
              returnKeyType={'done'}
              style={{
                fontSize: 34,
                fontWeight: 'bold',
              }}
              value={sendAmount}
              keyboardType={'numeric'}
              defaultValue={'0.00'}
              onChangeText={t => validateText(t) && setSendAmount(t)}
            />
            {!isDollar && (
              <Text
                style={{
                  fontSize: 34,
                  fontWeight: 'bold',
                  marginLeft: 5,
                }}>
                Ω
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {!isDollar && (
              <Text
                style={{
                  fontSize: 16,
                  color: grayTranslucent,
                  fontWeight: '500',
                }}>
                $
              </Text>
            )}
            <Text
              style={{
                fontSize: 16,
                color: grayTranslucent,
                fontWeight: '500',
                marginRight: 4,
              }}>
              {conversionFunction(
                sendAmount ? parseFloat(sendAmount) : 0,
              ).toFixed(isDollar ? 5 : 2)}
            </Text>
            {isDollar && (
              <Text
                style={{
                  fontSize: 16,
                  color: grayTranslucent,
                  fontWeight: '500',
                }}>
                Ω
              </Text>
            )}
          </View>
        </View>
      </View>
      <Spacer />
      <OmPillButton
        style={{
          marginBottom: 20,
        }}
        title={'Send'}
        onPress={() =>
          onSend(isDollar ? conversionFunction(amountFloat) : amountFloat)
        }
      />
    </View>
  );
};

AmountScreen.routeName = 'AmountScreen';
