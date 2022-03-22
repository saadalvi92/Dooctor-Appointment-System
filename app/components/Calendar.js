import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';
import CalendarPicker from 'react-native-calendar-picker';
import {Calendar as CalendarPicker1} from 'react-native-calendars';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';
export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStartDate: null,
    };

    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    // const currentRoute = getFocusedRouteNameFromRoute(this.props.route);
    console.log('The current route is');
    this.setState({
      selectedStartDate: date,
    });
    if (
      this.props.route.name == 'MoodCalender' ||
      this.props.route.name == 'HomeScreen'
    ) {
      this.props.goto(date);
    }
  }

  render() {
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    return (
      <View style={[styles.container, this.props.style]}>
        <CalendarPicker1
          markedDates={this.props.markedDates}
          maxDate={moment(Date.now()).format('YYYY-MM-DD')}
          onDayPress={date => {
            console.log('The date is here', date.dateString);
            this.onDateChange(date.dateString);
          }}
          markingType={'custom'}
          disableAllTouchEventsForInactiveDays={true}
          style={{
            width: this.props.style ? wp('85%') : '100%',
            height: this.props.style ? '100%' : null,
            alignSelf: 'center',
          }}
        />
        {/* <CalendarPicker
          todayBackgroundColor={colors.primary}
          todayTextStyle={{color: colors.white}}
          previousComponent={
            <MaterialCommunityIcons
              name="chevron-left"
              size={20}
              color={colors.black}
            />
          }
       
          nextComponent={
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={'#000'}
            />
          }
          selectedDayColor={colors.secondary}
          selectedDayTextColor={colors.white}
          selectedDayStyle={{borderRadius: 10, backgroundColor: colors.primary}}
          selectYearTitle="Select Year"
          headerWrapperStyle={{
            justifyContent: 'space-evenly',
          }}
          onDateChange={this.onDateChange}
          dayLabelsWrapper={{borderTopWidth: 0, borderBottomWidth: 0}}
          maxDate={moment(Date.now).format('YYYY-MM-DD')}
          disabledDates={date => {
            var startDate = '2015-01-01';
            var endDate = moment(Date.now())
              .add(1, 'days')
              .format('YYYY-MM-DD');
            return !date.isBetween(startDate, endDate);
          }}
        /> */}

        <View>{/* <Text>SELECTED DATE:{startDate}</Text> */}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
  },
});
