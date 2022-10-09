import React, {useCallback, memo, useState, useEffect} from 'react';
import isEmpty from 'lodash/isEmpty';
import {Platform, StyleSheet, Alert, View, Text, Touchable} from 'react-native';
import {
  CalendarProvider,
  WeekCalendar,
  AgendaList,
} from 'react-native-calendars';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import colors from '../config/colors';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const testIDs = {
  menu: {
    CONTAINER: 'menu',
    CALENDARS: 'calendars_btn',
    CALENDAR_LIST: 'calendar_list_btn',
    HORIZONTAL_LIST: 'horizontal_list_btn',
    AGENDA: 'agenda_btn',
    EXPANDABLE_CALENDAR: 'expandable_calendar_btn',
    WEEK_CALENDAR: 'week_calendar_btn',
  },
  calendars: {
    CONTAINER: 'calendars',
    FIRST: 'first_calendar',
    LAST: 'last_calendar',
  },
  calendarList: {CONTAINER: 'calendarList'},
  horizontalList: {CONTAINER: 'horizontalList'},
  agenda: {
    CONTAINER: 'agenda',
    ITEM: 'item',
  },
  expandableCalendar: {CONTAINER: 'expandableCalendar'},
  weekCalendar: {CONTAINER: 'weekCalendar'},
};
const today = new Date().toISOString().split('T')[0];
const futureDates = getFutureDates(9);
const dates = [today].concat(futureDates);
const lightThemeColor = '#EBF9F9';

function getFutureDates(numberOfDays) {
  const array = [];
  for (let index = 1; index <= numberOfDays; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getMarkedDates(items) {
  const marked = {};
  items.forEach(item => {
    if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
      marked[item.title] = {marked: true};
    } else {
      marked[item.title] = {disabled: true};
    }
  });
  return marked;
}
export default function ExpandableCalendarScreen(props) {
  const [Data, setData] = useState([
    {
      title: dates[0],
      data: [
        {
          hour: '00:00',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '00:30',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '01:00',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '01:30',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '02:00',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '02:30',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '03:00',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '03:30',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '04:00',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '04:30',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '05:00',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '05:30',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '06:00',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '06:30',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '07:00',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '07:30',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '08:00',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '08:30',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '09:00',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '09:30',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '10:00',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '10:30',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '11:00',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '11:30',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '12:00',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '12:30',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '13:00',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '13:30',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '14:00',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '14:30',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '15:00',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '15:30',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '16:00',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '16:30',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '17:00',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '17:30',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '18:00',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '18:30',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '19:00',

          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '19:30',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '20:00',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '20:30',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '21:00',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '21:30',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '22:00',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '22:30',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '23:00',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
        {
          hour: '23:30',
          title: 'Available',
          date: dates[0],
          checked: false,
        },
      ],
    },
  ]);

  const [bookings, setBookings] = useState([]);
  const [session, setSession] = useState({});

  const [ITEMS, setITEMS] = useState([Data[0]]);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const marked = getMarkedDates(Data);
  const onDateChanged = (date, updateSource) => {
    props.setSelectedDate(date);
  };
  const onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };
  const renderItem = ({item, index}) => {
    return <AgendaItem item={item} />;
  };
  const AgendaItem = memo(function AgendaItem({item}) {
    const buttonPressed = useCallback(() => {
      Alert.alert('Show me more');
    }, []);
    if (isEmpty(item)) {
      return (
        <View style={styles.emptyItem}>
          <Text style={styles.emptyItemText}>No Events Planned Today</Text>
        </View>
      );
    }
    if (currentDate == item.date) {
      return (
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <View style={{justifyContent: 'flex-end', marginTop: '80%'}}>
              <Text style={styles.itemHourText}>{item.hour}</Text>
            </View>
          </View>
          <View
            style={[
              styles.item,
              {backgroundColor: item.checked ? '#ccc' : 'transparent'},
            ]}
            testID={testIDs.agenda.ITEM}>
            <Text style={styles.itemTitleText}>{item.title}</Text>
            <View style={styles.itemButtonContainer}>
              {console.log('The items are here', item)}
              <BouncyCheckbox
                size={25}
                fillColor={colors.primary}
                unfillColor="#FFFFFF"
                iconStyle={{borderColor: colors.primary}}
                isChecked={item.checked}
                disabled={true}
                onPress={e => {
                  console.log('The Event is', e);
                  if (e) {
                    unchecked = unchecked - 1;
                    if (item.title == 'Booked') {
                      bookedUncheckedslots = bookedUncheckedslots.filter(
                        (newItem, index) => {
                          if (item.hour != newItem.hour) {
                            return newItem;
                          }
                        },
                      );
                    } else {
                      slots = [...slots, item];
                    }
                  }
                  if (!e) {
                    if (item.title == 'Booked') {
                      bookedUncheckedslots = [...bookedUncheckedslots, item];
                    } else {
                      slots = slots.filter((newItem, index) => {
                        if (item.hour != newItem.hour) {
                          return newItem;
                        }
                      });
                    }

                    unchecked = unchecked + 1;
                  }
                }}
              />
            </View>
          </View>
        </View>
      );
    } else return null;
  });
  return (
    <View style={{flex: 1}}>
      <CalendarProvider
        date={currentDate}
        onDateChanged={onDateChanged}
        onMonthChange={onMonthChange}
        showTodayButton
        disabledOpacity={0.6}>
        <WeekCalendar
          testID={testIDs.weekCalendar.CONTAINER}
          firstDay={1}
          markedDates={marked}
          maxDate={Data[Data.length - 1].title}
        />

        <AgendaList sections={ITEMS} renderItem={renderItem} />
      </CalendarProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize',
  },
  item: {
    flex: 5,
    paddingTop: 20,
    marginLeft: '2%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black',
    alignSelf: 'flex-end',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'baseline',
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },
});
