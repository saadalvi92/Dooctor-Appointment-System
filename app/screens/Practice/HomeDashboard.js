import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import SearchField from '../../components/SearchField';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import colors from '../../config/colors';
import AppointmentsCard from '../../components/AppointmentsCard';
import AppButton from '../../components/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
function HomeDashboard({navigation}) {
  return (
    <Screen style={styles.container}>
      <ScrollView style={{paddingTop: 10}} showsVerticalScrollIndicator={false}>
        <Header navigation={navigation} />
        <SearchField
          navigation={navigation}
          TouchNavigate={false}
          showMap={false}
          onPress={true}
        />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: '#ffffff',
            height: 120,
            width: '95%',
            alignSelf: 'center',
            padding: '5%',
            borderRadius: 16,
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.navigate('ScheduleCalendarScreen', {
              navigate: false,
              unavailable: [],
              bookings: [],
              type: 'online',
              doc: {},
            });
          }}>
          <Text
            style={{
              color: '#9393aa',
              fontSize: RFValue(13),
              fontWeight: '500',
            }}>
            View Client Appointment
          </Text>
          <View style={{flexDirection: 'row', margin: 10}}>
            {/* <Icon
              style={styles.searchIcon}
              name="calendar-alt"
              size={20}
              color={colors.primary}
            /> */}
            <Image source={require('../../assets/images/Calendarr.png')} />
            <Text
              style={{
                borderBottomWidth: 1,
                marginLeft: 12,
                fontSize: RFValue(16),
                color: '#304659',
                fontWeight: '500',
              }}>
              {moment(Date.now()).format('DD MMMM YYYY')}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{marginTop: '5%', marginHorizontal: '3%'}}>
          <AppButton
            title="Add Therapist"
            onPress={() => {
              navigation.navigate('SearchListing', {type: 'AllTherapists'});
            }}
            background={true}
            color={'green'}
            plus={true}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

export default HomeDashboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
    paddingBottom: 3,
  },
});
