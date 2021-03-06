import React from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
// @ts-ignore
import ohmLogo from '../assets/icons/ohm-landing.png';
// @ts-ignore
import bank from '../assets/images/bank.png';
// @ts-ignore
import gradient from '../assets/images/gradient.png';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp} from '@react-navigation/native';
import {DashboardPage} from './dashboard_page/DashboardPage';
import {OlympusButton} from '../components/OlympusButton';

export const HomePage = ({
  navigation: {navigate},
}: {
  navigation: NavigationProp<any>;
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#3A424F',
      }}>
      <LinearGradient colors={['#647384', '#3A424F']}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            source={gradient}
            resizeMode={'contain'}
            style={{
              width: '60%',
              height: 600,
              position: 'absolute',
              top: -165,
              left: 0,
            }}
          />
          <Image
            style={{
              marginTop: 100,
              width: '50%',
              height: 120,
            }}
            source={ohmLogo}
          />
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              marginTop: 16,
            }}>
            The Decentralized Reserve Currency
          </Text>
        </View>
        <ImageBackground
          source={bank}
          style={{
            width: '100%',
            height: 355,
            marginTop: 50,
            alignItems: 'center',
          }}>
          <OlympusButton
            title={'Start Now'}
            style={{
              position: 'absolute',
              bottom: 40,
            }}
            onPress={() => navigate(DashboardPage.routeName)}
          />
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

HomePage.routeName = 'HomePage';
