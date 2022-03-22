import React from 'react';
import AppText from './Text';
import colors from '../config/colors';
import RatingStars from './RatingStars';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {baseUrl, imageUrl} from '../utils/baseUrl';
function ListingTherapist({details, goto, status}) {
  return (
    <TouchableOpacity
      style={{
        borderBottomColor: '#a0c2cf',
        borderBottomWidth: 1,
        flex: 1,
      }}
      onPress={() => {
        goto();
      }}>
      <View style={styles.profileCard}>
        <View
          style={{
            flex: 0.8,
            marginRight: '3%',
          }}>
          {details.image == null ? (
            <Image
              source={require('../assets/images/User.png')}
              resizeMode="cover"
              style={{height: hp('10%'), width: wp('20%'), borderRadius: 4}}
            />
          ) : (
            <Image
              source={{
                uri: `${imageUrl}${details.image}`,
              }}
              resizeMode="cover"
              style={{height: hp('12%'), width: wp('23%'), borderRadius: 4}}
            />
          )}
        </View>
        <View
          style={{
            flex: 3,
            height: hp('14%'),
            marginLeft: '5%',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: colors.dark,
              fontSize: RFValue(14),
              fontWeight: 'bold',
              marginBottom: '1%',
            }}>
            {details.name}
          </Text>
          <Text
            style={{
              color: colors.textGray,
              fontSize: RFValue(12),
              marginBottom: '0.5%',
            }}>
            {details.designation}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
              <RatingStars number={details.rating} />
              <AppText style={{color: colors.textGray, fontSize: 12}}>
                ({details.reviews})
              </AppText>
            </View>
            {status ? (
              <View style={{flexDirection: 'row'}}>
                {details.status == 'friend' ? (
                  <AppText
                    style={{
                      color: colors.green,
                      fontSize: RFValue(14),
                      textDecorationLine: 'underline',
                    }}>
                    Message
                  </AppText>
                ) : (
                  <AppText
                    style={{
                      color: colors.green,
                      fontSize: RFValue(14),
                      textDecorationLine: 'underline',
                    }}>
                    Request
                  </AppText>
                )}
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ListingTherapist;
const styles = StyleSheet.create({
  profileCard: {
    height: hp('16%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
