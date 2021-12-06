import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ContractId, getRebasingTokenContract} from '../AddressBook';
import {Lookup} from '../GenericTypes';
import {globalContext, Network} from '../Network';
// @ts-ignore
import ohmIcon from '../assets/icons/ohm-icon.png';
// @ts-ignore
import sOhmIcon from '../assets/icons/sohm-icon.png';
// @ts-ignore
import ohmLogoTop from '../assets/icons/ohm-logo-top.png';
import {loadToken} from '../Erc20Token';
import {getRelativePriceInPair} from '../PairUtility';
import {OmText} from '../components/OmText';
import {OmIcon} from '../components/OmIcon';

export const BalancePage = () => {
  const coinLookup: Lookup<ContractId[]> = {
    [Network.ETHEREUM]: [ContractId.OHM, ContractId.SOHM, ContractId.GOHM],
    [Network.AVAX]: [ContractId.GOHM],
  };
  const network = globalContext.network;
  console.log('network', network);
  const coins: ContractId[] = coinLookup[network];
  const nameLookup: Lookup<string> = {
    [ContractId.OHM]: 'OHM',
    [ContractId.GOHM]: 'gOHM',
    [ContractId.SOHM]: 'sOHM',
  };
  const iconLookup: Lookup<any> = {
    [ContractId.OHM]: ohmIcon,
    [ContractId.GOHM]: ohmIcon,
    [ContractId.SOHM]: sOhmIcon,
  };
  const shownDigits: Lookup<number> = {
    [ContractId.OHM]: 2,
    [ContractId.GOHM]: 4,
    [ContractId.SOHM]: 2,
  };
  const address = '0xce01751a3b26981fe93e5682625080d214b45f00';
  const priceLookup: Lookup<() => Promise<Lookup<number>>> = {
    [Network.ETHEREUM]: async () => {
      const ohmPrice = await getRelativePriceInPair(
        ContractId.OHM_DAI,
        ContractId.DAI,
      );
      const rebasingToken = getRebasingTokenContract(ContractId.SOHM);
      const index = (await rebasingToken.index()) / 1e9;
      const gOhmPrice = ohmPrice * index;
      return {
        [ContractId.OHM]: ohmPrice,
        [ContractId.SOHM]: ohmPrice,
        [ContractId.GOHM]: gOhmPrice,
      };
    },
    [Network.AVAX]: async () => {
      const wAvaxPerGOhm = await getRelativePriceInPair(
        ContractId.GOHM_WAVAX,
        ContractId.WAVAX,
      );
      const mimPerWAvax = await getRelativePriceInPair(
        ContractId.WAVAX_MIM,
        ContractId.MIM,
      );
      const gOhmPrice = wAvaxPerGOhm * mimPerWAvax;
      return {
        [ContractId.GOHM]: gOhmPrice,
      };
    },
  };

  const [balances, setBalances] = useState<number[]>(coins.map(_ => 0));
  const [prices, setPrices] = useState<Lookup<number>>(
    coins.reduce((lookup, coin) => {
      lookup[coin] = 0;
      return lookup;
    }, {} as Lookup<number>),
  );

  useEffect(() => {
    const load = async () => {
      const _balances = [];
      for (const coin of coins) {
        const token = await loadToken(coin);
        const bal = await token.contract.balanceOf(address);
        console.log('token: ', token.name, 'balance: ', bal.toString());
        const balance = token.fromBigNumber(
          await token.contract.balanceOf(address),
        );
        _balances.push(balance);
      }
      const _prices = await priceLookup[network]();
      setPrices(_prices);
      setBalances(_balances);
    };
    load().then(() => null);
  }, [network, address]);

  const balanceInUsd = Object.entries(prices)
    .map(([coinId, price], index) => {
      return price * balances[index];
    })
    .reduce((a, b) => a + b);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <LinearGradient
        colors={['#253449', '#000000']}
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Image
          resizeMode={'contain'}
          style={{
            marginTop: 40,
            width: 29,
            height: 26,
          }}
          source={ohmLogoTop}
        />
        <View
          style={{
            marginTop: 50,
          }}>
          <OmText
            style={{
              fontSize: 30,
            }}>
            Balance: ${balanceInUsd.toFixed(2)}
          </OmText>
        </View>

        <View
          style={{
            marginTop: 50,
            width: '100%',
          }}>
          {coins.map((coinId, i) => (
            <View
              key={coinId}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 20,
                paddingHorizontal: 40,
                borderTopWidth: i === 0 ? 1 : 0,
                borderBottomWidth: 1,
                borderColor: '#6B6363',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <OmIcon
                  style={{
                    marginRight: 10,
                  }}
                  source={iconLookup[coinId]}
                  size={44}
                />
                <OmText
                  style={{
                    fontSize: 20,
                  }}>
                  {nameLookup[coinId]}
                </OmText>
              </View>
              <View
                style={{
                  alignItems: 'flex-end',
                }}>
                <OmText
                  style={{
                    fontSize: 15,
                  }}>
                  {balances[i].toFixed(shownDigits[coinId])}{' '}
                  {nameLookup[coinId]}
                </OmText>
                <OmText
                  style={{
                    marginTop: 3,
                    fontSize: 10,
                    color: '#78787A',
                  }}>
                  ${(balances[i] * prices[coinId]).toFixed(1)} USD
                </OmText>
              </View>
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

BalancePage.routeName = 'BalancePage';
