import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
function SearchField({
  navigation,
  showMap = true,
  TouchNavigate = true,
  onPress = false,
  search = txt => {
    console.log(txt);
  },
  Title = 'Search Therapist, Practice',
  Title2 = '',
}) {
  const [searchField, setSearchField] = useState('');
  return (
    <View style={styles.container}>
      {TouchNavigate ? (
        <TouchableOpacity
          onPress={e => {
            navigation.navigate('TherapistListingScreen');
          }}>
          <View style={styles.icon}>
            {/* <Ionicons name="search" size={30} color={colors.medium} /> */}
            <Image
              source={require('../assets/images/Search.png')}
              height={20}
              width={20}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Search Therapist, Practice"
            editable={false}
            placeholderTextColor={colors.textGray}
          />
        </TouchableOpacity>
      ) : !onPress ? (
        <>
          <View style={styles.icon}>
            <Image
              source={require('../assets/images/Search.png')}
              height={20}
              width={20}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder={Title}
            onChangeText={e => {
              setSearchField(e);
              console.log('E', e);
              search(e);
            }}
            placeholderTextColor={colors.textGray}
          />
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={e => {
              navigation.navigate('SearchListing');
            }}
            style={{flex: 1}}>
            <View style={styles.icon}>
              <Image
                source={require('../assets/images/Search.png')}
                height={20}
                width={20}
              />
            </View>
            <TextInput
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 6,
                borderWidth: 1,
                paddingLeft: 50,
                fontSize: RFValue(13),
                width: wp('95%'),
                backgroundColor: '#fff',
                borderColor: 'transparent',
              }}
              placeholder="Search Client, Therapist"
              editable={false}
              placeholderTextColor={colors.textGray}
            />
          </TouchableOpacity>
        </>
      )}
      {showMap ? (
        <>
          <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
            <Icon
              name="map-pin"
              style={styles.map_btn}
              size={25}
              color={colors.primary}
            />
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: hp('3%'),
    width: wp('88%'),
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    paddingLeft: 50,
    fontSize: RFValue(13),
    width: wp('75%'),
    backgroundColor: '#fff',
    borderColor: 'transparent',
  },
  icon: {
    position: 'absolute',
    height: '100%',
    marginHorizontal: 10,
    justifyContent: 'center',
    zIndex: 999,
    marginLeft: '6%',
  },
  map_btn: {
    backgroundColor: '#fff',
    marginLeft: 10,
    width: 50,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 6,
    borderColor: 'transparent',
    borderWidth: 1,
  },
});

export default SearchField;
