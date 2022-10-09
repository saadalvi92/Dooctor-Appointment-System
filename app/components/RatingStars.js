import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
const RatingStars = props => {
  return (
    <View style={styles.container}>
      {props.number >= 1 ? (
        <Image
          style={[styles.stars, {height: props.height}, {width: props.height}]}
          source={require('../assets/images/ActiveStar.png')}
        />
      ) : (
        <Image
          style={styles.stars}
          source={require('../assets/images/InActiveStar.png')}
        />
      )}
      {props.number >= 2 ? (
        <Image
          style={styles.stars}
          source={require('../assets/images/ActiveStar.png')}
        />
      ) : (
        <Image
          style={styles.stars}
          source={require('../assets/images/InActiveStar.png')}
        />
      )}
      {props.number >= 3 ? (
        <Image
          style={styles.stars}
          source={require('../assets/images/ActiveStar.png')}
        />
      ) : (
        <Image
          style={styles.stars}
          source={require('../assets/images/InActiveStar.png')}
        />
      )}
      {props.number >= 4 ? (
        <Image
          style={styles.stars}
          source={require('../assets/images/ActiveStar.png')}
        />
      ) : (
        <Image
          style={styles.stars}
          source={require('../assets/images/InActiveStar.png')}
        />
      )}
      {props.number >= 5 ? (
        <Image
          style={styles.stars}
          source={require('../assets/images/ActiveStar.png')}
        />
      ) : (
        <Image
          style={styles.stars}
          source={require('../assets/images/InActiveStar.png')}
        />
      )}
    </View>
  );
};

export default RatingStars;
const styles = StyleSheet.create({
  stars: {
    height: 11,
    width: 11,
    marginRight: 2,
  },
  container: {
    flexDirection: 'row',
    marginRight: 5,
    backgroundColor: 'transparent',
  },
});
