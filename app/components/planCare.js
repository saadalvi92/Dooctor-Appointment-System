import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';
import AppText from './Text';
function PlanCare(props) {
  const [currentday, setCurrentDay] = useState({});
  const deleteItem = () => {
    const filtereddata = props.state.filter((item, index) => {
      if (props.index != index) {
        return item;
      }
    });
    props.setState(filtereddata);
  };
  return (
    <View style={{borderBottomWidth: 0.5, paddingBottom: 10}}>
      <View style={{marginTop: '2%'}}>
        <AppText>TARGET SYMPTOMS </AppText>
        <TextInput
          style={{backgroundColor: '#ECECEC', marginTop: '2%'}}></TextInput>
      </View>
      <View style={{marginTop: '2%'}}>
        <AppText>INITIAL</AppText>
        <TextInput
          style={{backgroundColor: '#ECECEC', marginTop: '2%'}}></TextInput>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, marginRight: '2%', marginTop: '2%'}}>
          <AppText>Date </AppText>
          <View
            style={{
              flex: 1,
              borderRadius: 5,
              backgroundColor: '#ECECEC',
              alignItems: 'flex-end',
              marginTop: '2%',
            }}>
            <TouchableOpacity>
              <MaterialIcon
                style={styles.searchIcon}
                name="clock"
                size={25}
                color="#000"
                style={{paddingVertical: 10, paddingRight: 5}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, marginRight: '2%', marginTop: '2%'}}>
          <AppText>Date </AppText>
          <View
            style={{
              flex: 1,
              borderRadius: 5,
              backgroundColor: '#ECECEC',
              alignItems: 'flex-end',
              marginTop: '2%',
            }}>
            <TouchableOpacity>
              <MaterialIcon
                style={styles.searchIcon}
                name="clock"
                size={25}
                color="#000"
                style={{paddingVertical: 10, paddingRight: 5}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: '1%',
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity onPress={deleteItem}>
          <AppText>Delete</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default PlanCare;
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
