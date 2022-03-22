import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppText from './Text';
import colors from '../config/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
const Header = ({navigation, route}) => (
  <View style={styles.header}>
    <View style={styles.header_text}>
      <AppText
        style={{
          color: colors.primary,
          fontSize: RFValue(24),
          fontWeight: 'bold',
        }}>
        Quote{' '}
        <AppText style={{color: colors.secondary, fontSize: RFValue(24)}}>
          of the day
        </AppText>
      </AppText>
      <AppText style={{fontSize: RFValue(14), fontWeight: 'bold'}}>
        "We cannot change anything
      </AppText>
      <AppText style={{fontSize: RFValue(14), fontWeight: 'bold'}}>
        until we accept it."
      </AppText>
    </View>
    {/* <View style={styles.badge}>
      <Text style={styles.badgeText}>11</Text>
    </View> */}
    <TouchableOpacity
      style={styles.bell_container}
      onPress={() => {
        navigation.navigate('NotificationScreen');
      }}>
      {/* <FontAwesome
        style={styles.bell_icon}
        name="bell-o"
        size={RFValue(24)}
        color="black"
      /> */}
      <Image
        source={require('../assets/images/Bell.png')}
        height={24}
        width={24}
        style={styles.bell_icon}
      />
    </TouchableOpacity>
  </View>
);
export default Header;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header_text: {
    width: wp('65%'),
  },
  bell_container: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
    width: 40,
    height: 40,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal: 7,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_icon: {
    textAlign: 'center',
    textAlignVertical: 'center',

    backgroundColor: '#fff',
  },
  badge: {
    backgroundColor: '#b81307',
    borderRadius: 12,
    position: 'absolute',
    right: 0,
    zIndex: 999,
  },
  badgeText: {
    fontSize: 11,
    color: '#fff',
    padding: 4,
  },
});
