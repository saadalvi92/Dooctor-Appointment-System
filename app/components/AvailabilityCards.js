import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import AppText from './Text';
import {fontSize} from '../config/fonts';
import Calendar from './Calendar';
function AvailabilityCards({Data}) {
  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <FlatList
          style={styles.description}
          data={Data}
          numColumns={4}
          renderItem={({item}) => <Card detail={item} />}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
}

const Card = ({detail}) => {
  return (
    <TouchableOpacity
      key={detail.id}
      style={[styles.card, {backgroundColor: detail.backgroundColor}]}
      onPress={() => console.log(detail)}>
      <AppText
        style={{
          color: '#fff',
          fontSize: fontSize.regular,
        }}>
        {detail.title.toUpperCase()}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {marginVertical: 10},
  description: {},
  card: {
    flex: 1,
    marginRight: 2,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 7,
    borderRadius: 5,
  },
});

export default AvailabilityCards;
