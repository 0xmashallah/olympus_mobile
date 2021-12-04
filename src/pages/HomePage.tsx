import React from 'react';
import {
  ButtonProps,
  Image,
  ImageBackground,
  Text,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import ohmLogo from '../assets/icons/ohm-landing.png';
import bank from '../assets/images/bank.png';
import gradient from '../assets/images/gradient.png';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp} from '@react-navigation/native';
import {BalancePage} from './BalancePage';

const OlympusButton = (props: ButtonProps & {style: ViewStyle}) => (
  <View
    style={{
      backgroundColor: '#FFC768',
      paddingHorizontal: 42,
      paddingVertical: 20,
      width: 230,
      alignItems: 'center',
      borderRadius: 33.5,
      ...props.style,
    }}>
    <TouchableNativeFeedback onPress={props.onPress}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        {props.title}
      </Text>
    </TouchableNativeFeedback>
  </View>
);

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
            onPress={() => navigate(BalancePage.routeName)}
          />
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

HomePage.routeName = 'HomePage';
