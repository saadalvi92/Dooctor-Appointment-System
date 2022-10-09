import React from 'react';
import colors from '../config/colors';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';
function NotificationCard(props) {
  return (
    <TouchableOpacity
      style={{flex: 1, marginBottom: '5%', flexDirection: 'row'}}
      onPress={() => {
        props.goto();
        // console.log('the details color is', props.details);
      }}>
      <View
        style={{
          height: 40,
          width: 40,
          backgroundColor: props.details.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
        <Image source={props.details.icon} />
      </View>
      <View
        style={{
          width: '70%',
          margin: 10,
          marginTop: 0,
        }}>
        <Text style={{color: '#000', fontSize: RFValue(15)}}>
          {props.details.message}
        </Text>
        <Text
          style={{
            color: '#9393aa',
            fontSize: RFValue(13),
          }}>
          {props.details.time}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default NotificationCard;
const styles = StyleSheet.create({
  profileCard: {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
