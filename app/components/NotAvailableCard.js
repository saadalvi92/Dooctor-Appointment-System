import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import colors from '../config/colors';
import AppText from './Text';
import DropDownField from './forms/DropDownField';
import axios from 'axios';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {baseUrl} from '../utils/baseUrl';
function NotAvailableCard(props) {
  const [currentday, setCurrentDay] = useState(props.item?.day);
  const [data, setData] = useState([
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
    '24:00',
  ]);
  const deleteItem = () => {
    const filtereddata = props.state.filter((item, index) => {
      if (props.index != index) {
        return item;
      }
    });
    props.setState(filtereddata);
    if (props.item.id) {
      var config = {
        method: 'get',
        url: `${baseUrl}delete_unavailable_day/${props.item.id}`,
        headers: {
          app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
          session_token: props.session.session_key,
        },
      };
      axios(config)
        .then(function (response) {
          console.log('The Time is deleted', response.data.data);
        })
        .catch(error => {
          console.log('The error is here', error.response.data);
        });
    }
  };

  return (
    <View
      style={{
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        borderBottomColor: '#707070',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '5%',
        }}>
        <TouchableHighlight
          underlayColor={colors.primary}
          style={{
            backgroundColor: currentday == 'Sun' ? colors.primary : '#ECECEC',
            height: 40,
            width: '24%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setCurrentDay('Sun');
            props.state[props.index].day = 'Sun';
            props.setState([...props.state]);
          }}>
          <Text
            style={{
              color: currentday == 'Sun' ? '#fff' : '#000',
              fontSize: RFValue(12),
            }}>
            Sun
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={colors.primary}
          style={{
            backgroundColor: currentday == 'Mon' ? colors.primary : '#ECECEC',
            height: 40,
            width: '24%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setCurrentDay('Mon');
            props.state[props.index].day = 'Mon';
            props.setState([...props.state]);
          }}>
          <Text
            style={{
              color: currentday == 'Mon' ? '#fff' : '#000',
              fontSize: RFValue(12),
            }}>
            Mon
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={colors.primary}
          style={{
            backgroundColor: currentday == 'Tue' ? colors.primary : '#ECECEC',
            height: 40,
            width: '24%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setCurrentDay('Tue');
            props.state[props.index].day = 'Tue';
            props.setState([...props.state]);
          }}>
          <Text
            style={{
              color: currentday == 'Tue' ? '#fff' : '#000',
              fontSize: RFValue(12),
            }}>
            Tue
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={colors.primary}
          style={{
            backgroundColor: currentday == 'Wed' ? colors.primary : '#ECECEC',
            height: 40,
            width: '24%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setCurrentDay('Wed');
            props.state[props.index].day = 'Wed';
            props.setState([...props.state]);
          }}>
          <Text
            style={{
              color: currentday == 'Wed' ? '#fff' : '#000',
              fontSize: RFValue(12),
            }}>
            Wed
          </Text>
        </TouchableHighlight>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: '5%',
        }}>
        <TouchableHighlight
          underlayColor={colors.primary}
          style={{
            backgroundColor: currentday == 'Thu' ? colors.primary : '#ECECEC',
            height: 40,
            width: '24%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setCurrentDay('Thu');
            props.state[props.index].day = 'Thu';
            props.setState([...props.state]);
          }}>
          <Text
            style={{
              color: currentday == 'Thu' ? '#fff' : '#000',
              fontSize: RFValue(12),
            }}>
            Thu
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={colors.primary}
          style={{
            backgroundColor: currentday == 'Fri' ? colors.primary : '#ECECEC',
            height: 40,
            width: '24%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setCurrentDay('Fri');
            props.state[props.index].day = 'Fri';
            props.setState([...props.state]);
          }}>
          <Text
            style={{
              color: currentday == 'Fri' ? '#fff' : '#000',
              fontSize: RFValue(12),
            }}>
            Fri
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={colors.primary}
          style={{
            backgroundColor: currentday == 'Sat' ? colors.primary : '#ECECEC',
            height: 40,
            width: '24%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setCurrentDay('Sat');
            props.state[props.index].day = 'Sat';
            props.setState([...props.state]);
          }}>
          <Text
            style={{
              color: currentday == 'Sat' ? '#fff' : '#000',
              fontSize: RFValue(12),
            }}>
            Sat
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={colors.primary}
          style={{
            backgroundColor: 'transparent',
            height: 40,
            width: '24%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#000'}}></Text>
        </TouchableHighlight>
      </View>
      <View style={{flexDirection: 'row', marginTop: '3%'}}>
        <View style={{flex: 1, marginRight: '2%', marginTop: '2%'}}>
          <Text style={{fontSize: RFValue(12), marginTop: '2%'}}>
            Not Available From
          </Text>
          <DropDownField
            data={data}
            Select={e => {
              console.log('the data is', e);
              props.state[props.index].from = e;
              props.setState([...props.state]);
            }}
            value={
              props.item.from ? props.item.from.slice(0, 5) : props.item?.from
            }
            styles={{
              flex: 1,
              backgroundColor: '#ececec',
              marginBottom: 20,
              width: '100%',
            }}
          />
        </View>
        <View style={{flex: 1, marginRight: '2%', marginTop: '2%'}}>
          <Text style={{fontSize: RFValue(12), marginTop: '2%'}}>to </Text>
          <DropDownField
            data={() => {
              return data.filter(
                (item, index) => props.state[props.index].from < item,
              );
            }}
            Select={e => {
              props.state[props.index].to = e;
              props.setState([...props.state]);
            }}
            value={props.item.to ? props.item.to.slice(0, 5) : props.item?.to}
            styles={{
              flex: 1,
              backgroundColor: '#ececec',
              marginBottom: 20,
              width: '100%',
            }}
          />
        </View>
      </View>
      <View style={{marginTop: '2%'}}>
        <Text style={{fontSize: RFValue(12), marginTop: '1%'}}>Reason </Text>
        <TextInput
          style={{backgroundColor: '#ECECEC', marginTop: '2%', color: '#000'}}
          multiline={true}
          value={props.item?.reason}
          onChangeText={txt => {
            props.state[props.index].reason = txt;
            props.setState([...props.state]);
          }}></TextInput>
      </View>
      <View
        style={{
          marginTop: '1%',
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity onPress={deleteItem}>
          <Text
            style={{
              fontSize: RFValue(14),
              fontWeight: 'bold',
              textDecorationLine: 'underline',
              color: '#1e1f20',
            }}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
    paddingBottom: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default NotAvailableCard;
