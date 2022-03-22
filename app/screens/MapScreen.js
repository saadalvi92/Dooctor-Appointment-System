import React, {useState, useEffect, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
// import * as Location from 'expo-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import dr1 from '../assets/images/dr1.jpg';
import dr2 from '../assets/images/dr2.jpg';
import dr3 from '../assets/images/dr3.jpg';
import dr4 from '../assets/images/dr4.jpg';
import AppText from '../components/Text';
import colors from '../config/colors';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from '../utils/baseUrl';
export default function MapScreen({navigation, route}) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [therapiDetail, setTherapiDetail] = useState('');
  const [userLocation, setUserLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const requestLocationPermission = async () => {
    try {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
      granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
      const sessionString = await AsyncStorage.getItem('session');
      const session = JSON.parse(sessionString);
      console.log('granted', granted);

      if (granted) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setRegion({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
              longitudeDelta: 0.0922,
              latitudeDelta: 0.0421,
            });
            setUserLocation({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
              longitudeDelta: 0.0922,
              latitudeDelta: 0.0421,
            });
            var config = {
              method: 'get',
              url: `${baseUrl}search?q=pr&lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
              headers: {
                app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
                session_token: session.session_key,
              },
            };

            axios(config).then(function (response) {
              console.log(
                'The response from the server is as follows',
                response.data,
              );
            });
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('ACCESS_FINE_LOCATION permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const [therapist] = useState([
    {
      id: 1,
      name: 'Dr.Alexandro Smith',
      title: 'Therapist',
      address: 'Temple Hills, MD 20748',
      rating: '4.8',
      review: '141',
      location: {
        longitude: 74.2630356,
        latitude: 31.4594594,
      },
      imageURI: dr1,
    },
    {
      id: 2,
      name: 'Dr.Bob',
      title: 'Therapist',
      address: 'Calefornia, NM 2141',
      rating: '4.2',
      review: '100',

      location: {
        longitude: 74.3680356,
        latitude: 31.4594594,
      },
      imageURI: dr2,
    },
    {
      id: 3,
      name: 'Dr.Alex',
      title: 'Therapist',
      address: 'Razot JK, 3434',
      rating: '4.5',
      review: '90',
      location: {
        longitude: 74.3680356,
        latitude: 31.5594594,
      },
      imageURI: dr3,
    },
    {
      id: 4,
      name: 'Dr.Smith',
      title: 'Therapist',
      address: 'Island Hk, 103',
      rating: '3.9',
      review: '170',
      location: {
        longitude: 74.3780356,
        latitude: 31.4994594,
      },
      imageURI: dr4,
    },
  ]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 0,
            left: 20,
            marginVertical: 50,
          }}>
          <MaterialCommunityIcons
            style={styles.back_btn}
            name="arrow-left"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 120,
            width: '90%',
          }}>
          {/* Search Icon */}
          <View style={styles.icon}>
            <Image source={require('../assets/images/Search.png')} />
          </View>
          {/* Search Map */}
          <View>
            <GooglePlacesAutocomplete
              placeholder="Search"
              fetchDetails={true}
              GooglePlacesSearchQuery={{
                rankby: 'distance',
              }}
              onPress={(data, details = null) => {
                console.log(data, details);
                setRegion({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                });
              }}
              query={{
                key: process.env.GOOGLE_PLACE_KEYs,
                language: 'en',
                components: 'country:us',
                types: 'establishment',
                radius: 30000,
                location: `${region.latitude}, ${region.longitude}`,
              }}
              styles={{
                container: {
                  flex: 0,
                  width: '100%',
                  zIndex: 1,
                  borderWidth: 2,
                  borderColor: colors.primary,
                },
                textInput: {paddingLeft: 45, height: '100%', color: 'black'},
                listView: {backgroundColor: 'white'},
              }}
              // placeholder="Search Therapist, Practice"
            />
          </View>
        </View>
        {/* Map */}
        <MapView
          followsUserLocation
          showsUserLocation={true}
          initialRegion={userLocation}
          region={region}
          onRegionChangeComplete={({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          }) => setRegion({latitude, longitude, latitudeDelta, longitudeDelta})}
          style={styles.map}>
          {therapist.map(therapi => (
            <Marker
              key={therapi.id}
              coordinate={{
                latitude: therapi.location.latitude,
                longitude: therapi.location.longitude,
              }}
              title={therapi.title}
              description={therapi.description}
              onPress={() => {
                setTherapiDetail(therapi);
                setShowModal(true);
              }}>
              <Image
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 15,
                  backgroundColor: 'red',
                }}
                source={therapi.imageURI}
              />
            </Marker>
          ))}
        </MapView>
        {/* Loction btn */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 230,
            right: 18,
          }}>
          <Ionicons
            style={styles.back_btn}
            name="md-locate"
            size={24}
            color="black"
            onPress={() => setRegion(userLocation)}
          />
        </TouchableOpacity>

        {/* Detail Modal */}
        {showModal && (
          <TouchableOpacity
            style={styles.modal}
            onPress={() => {
              // navigation.navigate('AppointmentScreen');
            }}>
            <>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'cover',
                  borderRadius: 30,
                  marginHorizontal: 20,
                }}
                source={therapiDetail.imageURI}
              />

              <View>
                <AppText style={{fontWeight: 'bold'}}>
                  {therapiDetail.name}
                </AppText>
                <AppText>{therapiDetail.title}</AppText>
                <AppText>
                  <MaterialCommunityIcons
                    name="star"
                    size={20}
                    color="#FFD700"
                  />{' '}
                  {therapiDetail.rating} ({therapiDetail.review} reviews)
                </AppText>
                <AppText>{therapiDetail.address}</AppText>
              </View>

              {/* <TouchableOpacity
                style={{
                  backgroundColor: '#f23535',
                  borderRadius: 10,
                  alignSelf: 'flex-start',
                  marginVertical: 10,
                  position: 'absolute',
                  top: 1,
                  right: 10,
                }}
                onPress={() => setShowModal(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color={'white'}
                />
              </TouchableOpacity> */}
            </>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  map: {
    // position: "relative",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  //   Css
  input: {
    position: 'relative',
    flex: 1,
    padding: 10,
    borderRadius: 2,
    borderColor: colors.secondary,
    borderWidth: 1,
    paddingLeft: 50,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  icon: {
    position: 'absolute',
    // height: "100%",
    marginHorizontal: 10,
    marginVertical: 12,
    justifyContent: 'center',
    zIndex: 2,
  },
  back_btn: {
    marginVertical: 7,
    width: 50,
    height: 50,
    borderRadius: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    backgroundColor: '#fff',
    elevation: 20,
  },
  modal: {
    position: 'absolute',
    width: '90%',
    overflow: 'hidden',
    height: 160,
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: colors.secondary,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    backgroundColor: '#fff',
    elevation: 6,
  },
});
