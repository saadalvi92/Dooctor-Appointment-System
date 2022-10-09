import React, { useCallback, memo, useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import {
  Platform,
  StyleSheet,
  Alert,
  View,
  Text,
  Touchable,
} from "react-native";
import {
  CalendarProvider,
  WeekCalendar,
  AgendaList,
} from "react-native-calendars";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from "../config/colors";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
const testIDs = {
  menu: {
    CONTAINER: "menu",
    CALENDARS: "calendars_btn",
    CALENDAR_LIST: "calendar_list_btn",
    HORIZONTAL_LIST: "horizontal_list_btn",
    AGENDA: "agenda_btn",
    EXPANDABLE_CALENDAR: "expandable_calendar_btn",
    WEEK_CALENDAR: "week_calendar_btn",
  },
  calendars: {
    CONTAINER: "calendars",
    FIRST: "first_calendar",
    LAST: "last_calendar",
  },
  calendarList: { CONTAINER: "calendarList" },
  horizontalList: { CONTAINER: "horizontalList" },
  agenda: {
    CONTAINER: "agenda",
    ITEM: "item",
  },
  expandableCalendar: { CONTAINER: "expandableCalendar" },
  weekCalendar: { CONTAINER: "weekCalendar" },
};

const lightThemeColor = "#EBF9F9";

var slots = [];
var bookedUncheckedslots = [];
export default function ExpandableCalendarScreen(props) {
  const today = new Date().toISOString().split("T")[0];
  function getFutureDates(numberOfDays) {
    const array = [];
    for (let index = 1; index <= numberOfDays; index++) {
      const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
      const dateString = date.toISOString().split("T")[0];
      array.push(dateString);
    }
    return array;
  }

  function getMarkedDates(items) {
    const marked = {};
    items.forEach((item) => {
      if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
        marked[item.title] = { marked: true };
      } else {
        marked[item.title] = { disabled: true };
      }
    });
    return marked;
  }
  const futureDates = getFutureDates(9);
  const dates = [today].concat(futureDates);
  const { bookings, unavailable, type, doc } = props?.route.params;
  let [Data, setData] = useState(() => {
    const detailsData = [
      {
        hour: "00:00",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "00:30",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "01:00",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "01:30",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "02:00",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "02:30",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "03:00",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "03:30",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "04:00",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "04:30",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "05:00",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "05:30",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "06:00",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "06:30",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "07:00",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "07:30",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "08:00",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "08:30",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "09:00",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "09:30",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "10:00",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "10:30",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "11:00",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "11:30",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "12:00",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "12:30",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "13:00",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "13:30",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "14:00",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "14:30",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "15:00",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "15:30",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "16:00",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "16:30",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "17:00",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "17:30",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "18:00",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "18:30",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "19:00",

        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "19:30",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "20:00",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "20:30",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "21:00",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "21:30",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "22:00",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "22:30",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "23:00",
        title: "Available",
        date: dates[0],
        checked: false,
      },
      {
        hour: "23:30",
        title: "Available",
        date: dates[0],
        checked: false,
      },
    ];
    const newDetailsData = detailsData.filter((item, index) => {
      if (item.hour > moment(Date.now()).format("HH:mm")) return item;
    });
    return [
      {
        title: dates[0],
        data: [...newDetailsData],
      },
    ];
  });
  const [ITEMS, setITEMS] = useState([Data[0]]);
  const [currentDate, setCurrentDate] = useState(
    props.route.params.today
      ? props.route.params.today
      : new Date().toISOString().split("T")[0]
  );
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  var unchecked = 0;
  useEffect(() => {
    slots = [];
    bookedUncheckedslots = [];
    console.log("The new date is here", new Date().toISOString().split("T")[0]);
    if (props.route.params.today) {
      onDateChanged(props.route.params.today);
    } else {
      console.log("current date of today is null");
    }
  }, []);
  useEffect(() => {
    setLoading(true);
    getData();
  }, [refresh]);
  const getData = async () => {
    const stingUser = await AsyncStorage.getItem("user");
    const currentUser = JSON.parse(stingUser);
    setUser(currentUser);
    bookings.map((booking, b_index) => {
      Data.map((Dat, Da_index) => {
        var newDates = [];
        console.log(
          "the date is here",
          moment(booking.start_time).format("YYYY-MM-DD"),
          moment(booking.start_time).format("HH:mm")
        );
        if (moment(booking.start_time).format("YYYY-MM-DD") == Dat.title) {
          Dat.data.map((dates, d_index) => {
            if (moment(booking.start_time).format("HH:mm") == dates.hour) {
              newDates.push({
                hour: dates.hour,
                title: "Booked",
                date: dates.date,
                checked: true,
                type: booking.type,
                practiceId: booking.doc_id,
                userId: booking.client_id,
                amount: booking.amount,
                id: booking.id,
                DataDatesIndex: d_index,
              });
            }
          });
          newDates.map((date, index) => {
            Data[Da_index].data[date.DataDatesIndex] = date;
          });
        }
      });
    });
    setData([...Data]);
    setLoading(false);
  };
  const marked = getMarkedDates(Data);
  const onDateChanged = (date, updateSource) => {
    setLoading(true);
    var detailsData = [
      {
        hour: "00:00",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "00:30",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "01:00",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "01:30",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "02:00",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "02:30",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "03:00",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "03:30",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "04:00",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "04:30",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "05:00",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "05:30",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "06:00",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "06:30",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "07:00",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "07:30",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "08:00",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "08:30",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "09:00",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "09:30",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "10:00",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "10:30",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "11:00",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "11:30",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "12:00",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "12:30",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "13:00",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "13:30",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "14:00",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "14:30",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "15:00",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "15:30",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "16:00",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "16:30",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "17:00",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "17:30",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "18:00",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "18:30",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "19:00",

        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "19:30",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "20:00",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "20:30",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "21:00",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "21:30",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "22:00",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "22:30",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "23:00",
        title: "Available",
        date: date,
        checked: false,
      },
      {
        hour: "23:30",
        title: "Available",
        date: date,
        checked: false,
      },
    ];

    if (date > Data[0].title) {
      Data.push({
        title: date,
        data: detailsData,
      });
      const newITEMS = Data.filter((item, index) => {
        if (item.title === date) {
          return item;
        }
      });

      setITEMS([newITEMS[0]]);
      if (date <= Data[Data.length - 1].title) {
        setCurrentDate(date);
      }
      setRefresh(!refresh);
    } else if (date == moment(Date.now()).format("YYYY-MM-DD")) {
      Data.push({
        title: date,
        data: detailsData,
      });
      const newITEMS = Data.filter((item, index) => {
        if (item.title === date) {
          return item;
        }
      });

      setITEMS([newITEMS[0]]);
      if (date <= Data[Data.length - 1].title) {
        setCurrentDate(date);
      }
      setRefresh(!refresh);
    }
  };
  const onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };
  const renderItem = ({ item, index }) => {
    return <AgendaItem item={item} />;
  };
  const AgendaItem = memo(function AgendaItem({ item }) {
    const buttonPressed = useCallback(() => {
      Alert.alert("Show me more");
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
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "80%",
                paddingTop: 0,
              }}
            >
              <Text style={styles.itemHourText}>{item.hour}</Text>
            </View>
          </View>
          <View
            style={[
              styles.item,
              {
                backgroundColor:
                  item.title == "Available"
                    ? "transparent"
                    : item.checked ||
                      item.title == "Booked" ||
                      item.title == "My Booking" ||
                      item.title == `Booked by ${item.userName}`
                    ? "#ccc"
                    : "transparent",
              },
            ]}
            testID={testIDs.agenda.ITEM}
          >
            <Text style={styles.itemTitleText}>{item.title}</Text>
            <View style={styles.itemButtonContainer}>
              {props?.route.params.details?.doc_id == item?.practiceId &&
              user.id == item.userId ? (
                props.route?.params?.navigate == false ? null : (
                  <BouncyCheckbox
                    size={25}
                    fillColor={colors.primary}
                    unfillColor="#FFFFFF"
                    iconStyle={{ borderColor: colors.primary }}
                    isChecked={item.checked}
                    disabled={false}
                    onPress={(e) => {
                      if (e) {
                        unchecked = unchecked - 1;
                        item.checked = false;
                        if (
                          item.title == "Booked" ||
                          item.title == "My Booking"
                        ) {
                          bookedUncheckedslots = bookedUncheckedslots.filter(
                            (newItem, index) => {
                              if (item.hour != newItem.hour) {
                                return newItem;
                              }
                            }
                          );
                        } else {
                          slots = [...slots, item];
                        }
                      }
                      if (!e) {
                        item.checked = true;
                        if (
                          item.title == "Booked" ||
                          item.title == "My Booking"
                        ) {
                          bookedUncheckedslots = [
                            ...bookedUncheckedslots,
                            item,
                          ];
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
                )
              ) : item.title == "Available" ? (
                <BouncyCheckbox
                  size={25}
                  fillColor={colors.primary}
                  unfillColor="#FFFFFF"
                  iconStyle={{ borderColor: colors.primary }}
                  isChecked={item.checked}
                  disabled={
                    props?.route.params.details?.doc_id == item?.practiceId
                      ? props?.navigate == false ||
                        props.route?.params?.navigate == false
                        ? true
                        : false
                      : item.checked
                  }
                  onPress={(e) => {
                    if (e) {
                      unchecked = unchecked - 1;
                      if (
                        item.title == "Booked" ||
                        item.title == "My Booking"
                      ) {
                        bookedUncheckedslots = bookedUncheckedslots.filter(
                          (newItem, index) => {
                            if (item.hour != newItem.hour) {
                              return newItem;
                            }
                          }
                        );
                      } else {
                        slots = [...slots, item];
                      }
                    }
                    if (!e) {
                      if (
                        item.title == "Booked" ||
                        item.title == "My Booking"
                      ) {
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
              ) : null}
            </View>
          </View>
        </View>
      );
    } else return null;
  });
  return (
    <View style={{ flex: 1 }}>
      {props?.navigate == false ||
      props.route?.params?.navigate == false ? null : (
        <View
          style={{
            borderRadius: 15,
            width: 55,
            height: 55,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.27,
            shadowRadius: 2.65,
            backgroundColor: "#fff",
            elevation: 15,
            zIndex: 999999999,
            position: "absolute",
            right: 35,
            bottom: 15,
            // marginBottom: '5%',
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (
                unchecked <= 0 &&
                slots.length >= bookedUncheckedslots.length
              ) {
                if (
                  props?.navigate == false ||
                  props.route?.params?.navigate == false
                ) {
                  console.log("The data cant be sent");
                } else {
                  if (slots.length != 0) {
                    props.navigation.navigate("SlotSelectingScreen", {
                      slot: slots,
                      type: type,
                      doc: doc,
                      uncheckedslots: bookedUncheckedslots,
                    });
                  } else {
                    alert("please check a slot first");
                  }
                }
              } else {
                alert("Please select Equal or More appointments.");
              }
            }}
          >
            <Icon name="arrow-forward" size={35} color="#000" />
          </TouchableOpacity>
        </View>
      )}
      <CalendarProvider
        date={currentDate}
        onDateChanged={onDateChanged}
        onMonthChange={onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
      >
        <WeekCalendar
          testID={testIDs.weekCalendar.CONTAINER}
          firstDay={1}
          markedDates={marked}
          minDate={Data[0].title}
        />
        {/* {loading ? (
          <Spinner
            visible={true}
            textContent={''}
            textStyle={{
              color: '#FFF',
            }}
            color={colors.danger}
          />
        ) : ( */}
        <AgendaList sections={ITEMS} renderItem={renderItem} />
        {/* )} */}
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
    color: "grey",
    textTransform: "capitalize",
  },
  item: {
    flex: 5,
    paddingTop: 20,
    marginLeft: "2%",
    borderTopWidth: 1,
    borderTopColor: "black",
    alignItems: "baseline",
    flexDirection: "row",
    // marginTop: 15,
  },
  itemHourText: {
    color: "black",
    alignSelf: "flex-end",
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "baseline",
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
});
