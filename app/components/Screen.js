import React from 'react';
// import Constants from 'expo-constants';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
function Screen({children, style, top = false, details = false}) {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#00AEEF']}
      style={styles.linearGradient}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 3}}>
      <SafeAreaView
        style={
          top
            ? [styles.screen, style, {marginTop: '20%'}]
            : details
            ? [styles.screen, style, {marginTop: '10%'}]
            : [styles.screen, style]
        }>
        <View style={[styles.view, style]}>{children}</View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
});

export default Screen;
