import React, {useState} from 'react';
import {Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
// import {MaterialCommunityIcons} from 'react-native-vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from '../config/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
function AppButton({
  title,
  onPress,
  color = 'White',
  textColor = '#fff',
  borderWidth,
  borderColor = '#000',
  width,
  fontWeight,
  background = true,
  arrowIcon,
  plus = false,
  styles = {
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      borderRadius: 4,
      paddingHorizontal: 30,
      marginVertical: '2%',
    },
    text: {
      color: colors.white,
      fontSize: RFValue(15),
      fontWeight: 'bold',
    },
  },
}) {
  const [btnColor, setBtnColor] = useState('black');
  return (
    <TouchableHighlight
      activeOpacity={0.9}
      // onPressIn={() => {
      //   setBtnColor('white');
      // }}
      // onPressOut={() => {
      //   setBtnColor('black');
      // }}
      // underlayColor={colors.green}
      style={[
        styles.button,
        {
          backgroundColor: background ? colors.green : colors[color],
          borderWidth: borderWidth ? borderWidth : 0,
          borderColor: borderColor,
          width: width && width,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        },
      ]}
      onPress={onPress}>
      <>
        {plus ? (
          <Image
            source={require('../assets/images/Plus.png')}
            style={{marginRight: '2%'}}
          />
        ) : null}
        <Text
          style={[
            styles.text,
            {
              color: textColor,
              fontWeight: fontWeight ? fontWeight : 'normal',
              marginRight: '2%',
            },
          ]}>
          {title}
        </Text>
        {arrowIcon && (
          <MaterialCommunityIcons
            name="arrow-right"
            size={RFValue(20)}
            color={colors.white}
          />
        )}
      </>
    </TouchableHighlight>
  );
}

export default AppButton;
