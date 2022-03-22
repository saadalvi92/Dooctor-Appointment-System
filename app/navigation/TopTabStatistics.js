import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Screen from '../components/Screen';
import TherapistStat from '../screens/Practice/TherapistStat';
import PracticeStat from '../screens/Practice/PracticeStat';
import colors from '../config/colors';
import {RFValue} from 'react-native-responsive-fontsize';
const Tab = createMaterialTopTabNavigator();
function TopTabStatistics(props) {
  return (
    <Screen style={styles.container} top={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            marginHorizontal: 10,
            marginBottom: 0,
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            zIndex: 0,
            elevation: 0,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.green,
            height: 4,
          },
          tabBarLabelStyle: {
            fontSize: RFValue(16),
            color: '#1c1c1c',
            fontWeight: '500',
          },
        }}>
        <Tab.Screen name="Practice Stats" component={PracticeStat} />
        <Tab.Screen name="Therapist Stats" component={TherapistStat} />
      </Tab.Navigator>
    </Screen>
  );
}

export default TopTabStatistics;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
    paddingBottom: 3,
  },
  header_text: {
    width: '58%',
  },
  bell_container: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
    width: 50,
    height: 50,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal: 7,
  },
  bell_icon: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#fff',
  },
});
