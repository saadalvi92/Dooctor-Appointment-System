import React from 'react';

import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
const starImageFilled =
  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
// Empty Star. You can also give the path from local
const starImageCorner =
  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
const CustomRatingBar = props => {
  return (
    <View style={styles.customRatingBarStyle}>
      {props.maxRating.map((item, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => props.setDefaultRating(item)}>
            <Image
              style={styles.starImageStyle}
              source={
                item <= props.defaultRating
                  ? {uri: starImageFilled}
                  : {uri: starImageCorner}
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomRatingBar;
const styles = StyleSheet.create({
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
});
