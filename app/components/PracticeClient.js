import React from 'react';
import AppText from './Text';
import colors from '../config/colors';
import RatingStars from './RatingStars';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {imageUrl} from '../utils/baseUrl';
function PracticeClient(props) {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 20,
        paddingBottom: 0,
        flex: 1,
        marginBottom: '5%',
      }}
      onPress={() => {
        props.goto();
      }}>
      <View style={styles.profileCard}>
        <View
          style={{
            flex: 0.5,
            marginRight: '10%',
            paddingBottom: 0,
          }}>
          {props.details.image == null ? (
            <Image
              source={require('../assets/images/User.png')}
              resizeMode="cover"
              style={{
                height: hp('7.5%'),
                width: wp('14%'),
                borderRadius: 12,
              }}
            />
          ) : (
            <Image
              source={{uri: `${imageUrl}${props.details.image}`}}
              resizeMode="cover"
              style={{
                height: hp('7.5%'),
                width: wp('14%'),
                borderRadius: 12,
              }}
            />
          )}
        </View>
        <View
          style={{
            flex: 3.5,
            height: 60,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: colors.dark,
              fontSize: RFValue(15),
              fontWeight: 'bold',
              flex: 2,
            }}>
            {props.details.name}
          </Text>
          <Text
            style={{
              color: '#9393aa',
              fontSize: RFValue(13),
              textAlign: 'center',
              flex: 1,
              textDecorationLine: 'underline',
            }}>
            View
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default PracticeClient;
const styles = StyleSheet.create({
  profileCard: {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
