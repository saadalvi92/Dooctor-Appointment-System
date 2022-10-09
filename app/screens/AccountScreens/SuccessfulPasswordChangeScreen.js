import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {Dimensions} from 'react-native';
import AppButton from '../../components/Button';
import AppText from '../../components/Text';
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Screen from '../../components/Screen';
const win = Dimensions.get('window');
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
function SuccessfulPasswordChangeScreen({navigation, route}) {
  return (
    <Screen style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{
            position: 'relative',
            width: win.width / 2,
            height: win.width / 2,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginVertical: 40,
          }}
          source={require('../../assets/images/ForgotPassword.png')}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <AppText
          style={{
            fontWeight: '700',
            paddingVertical: 15,
            fontSize: RFValue(20),
          }}>
          Congrats!
        </AppText>
        <View
          style={{
            marginLeft: '10%',
            marginRight: '9%',
            marginBottom: '40%',
            alignItems: 'center',
          }}>
          <AppText style={{fontSize: RFValue(15)}}>
            You have successfully changed the password.{' '}
          </AppText>
          <AppText style={{fontSize: RFValue(15)}}>
            Please use the new password when logging in.{' '}
          </AppText>
          {/* <AppButton title={'Log In Now'} onPress={() => navigation.goBack()}  /> */}
          <TouchableOpacity
            style={{
              width: wp('40%'),
              height: hp('7%'),
              backgroundColor: '#40AE49',
              borderRadius: 4,
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: '10%',
            }}
            onPress={() =>
              navigation.navigate('LoginScreen', {data: route.params.data})
            }>
            <Text
              style={{color: '#fff', fontWeight: '600', textAlign: 'center'}}>
              Log in Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default SuccessfulPasswordChangeScreen;
