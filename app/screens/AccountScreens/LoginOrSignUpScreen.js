import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableHighlight,
} from 'react-native';
import AppButton from '../../components/Button';
import AppText from '../../components/Text';
import colors from '../../config/colors';
import {SliderBox} from 'react-native-image-slider-box';
import Screen from '../../components/Screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const images = [
  require('../../assets/images/Discussion-cuate.png'),
  require('../../assets/images/Discussion-pana.png'),
  require('../../assets/images/Discussion-pana.png'),
];
function LoginOrSignUpScreen({navigation, route}) {
  const [BtnColor1, setBtnColor1] = useState('black');
  const [borderColor1, setBorderColor1] = useState('black');

  const [BtnColor2, setBtnColor2] = useState('black');
  const [borderColor2, setBorderColor2] = useState('black');

  return (
    <Screen style={styles.container}>
      <View style={{flex: 2}}>
        <ImageSlider images={images} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          {/* <AppButton
            title="Log In"
            onPress={() =>
              navigation.navigate('LoginScreen', {data: route.params})
            }
          /> */}
          <TouchableHighlight
            underlayColor="#40AE49"
            style={{
              width: wp('37%'),
              height: hp('7%'),
              borderColor: borderColor1,
              borderWidth: 1,
              borderRadius: 4,
              textAlign: 'center',
              justifyContent: 'center',
            }}
            onPressIn={() => {
              setBorderColor1('#40AE49');
              setBtnColor1('white');
            }}
            onPressOut={() => {
              setBtnColor1('black');
              setBorderColor1('black');
            }}
            onPress={() =>
              navigation.navigate('LoginScreen', {data: route.params})
            }>
            <Text
              style={{
                color: BtnColor1,
                fontWeight: '600',
                textAlign: 'center',
              }}>
              Login
            </Text>
          </TouchableHighlight>
          <View style={{marginHorizontal: 15}} />
          {/* <AppButton
            title="Sign Up"
            color={colors.white}
            textColor="#fff"
            onPress={() =>
              navigation.navigate('SignUpScreen', {data: route.params})
            }
            background={false}
          /> */}
          <TouchableHighlight
            underlayColor="#40AE49"
            style={{
              width: wp('37%'),
              height: hp('7%'),
              borderColor: borderColor2,
              borderWidth: 1,
              borderRadius: 4,
              textAlign: 'center',
              justifyContent: 'center',
            }}
            onPressIn={() => {
              setBorderColor2('#40AE49');
              setBtnColor2('white');
            }}
            onPressOut={() => {
              setBtnColor2('black');
              setBorderColor2('black');
            }}
            onPress={() =>
              navigation.navigate('SignUpScreen', {data: route.params})
            }>
            <Text
              style={{
                color: BtnColor2,
                fontWeight: '600',
                textAlign: 'center',
              }}>
              Sign Up
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </Screen>
  );
}

const ImageSlider = ({images}) => (
  <SliderBox
    resizeMode={'contain'}
    ImageComponentStyle={{
      backgroundColor: '#c1e1ec',
      // aspectRatio: 0.7,
    }}
    images={images}
    autoplay={true}
    disableOnPress={true}
    circleLoop
    sliderBoxHeight={'100%'}
    dotStyle={{
      display: 'none',
    }}
  />
);

const styles = StyleSheet.create({
  container: {flex: 1},
  button: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.secondary,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default LoginOrSignUpScreen;
