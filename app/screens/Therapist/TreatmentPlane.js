import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AppButton from '../../components/Button';
import Screen from '../../components/Screen';
import AppText from '../../components/Text';
import colors from '../../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NotAvailableCard from '../../components/NotAvailableCard';
import PlanCare from '../../components/planCare';
function TreatmentPlane(props) {
  const [data, setData] = useState([]);
  return (
    <Screen>
      <ScrollView>
        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            color: '#000',
            fontSize: 24,
            fontWeight: '400',
          }}>
          Becoming a patient
        </Text>
        <View style={styles.container}>
          <View style={{marginTop: '5%', flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <AppText style={styles.textTitle}>FullName</AppText>
              <TextInput
                style={{
                  backgroundColor: colors.backGrey,
                  borderRadius: 10,
                  padding: 10,
                  flex: 1,
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <AppText style={styles.textTitle}>D.O.B</AppText>

              <TextInput
                style={{
                  backgroundColor: colors.backGrey,
                  borderRadius: 10,
                  padding: 10,
                  marginLeft: 5,
                  flex: 1,
                }}
                placeholderTextColor={'#000'}
              />
            </View>
          </View>
          <View style={styles.marginTop}>
            <AppText style={styles.textTitle}>PRIMARY CARE PHYSICIAN</AppText>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.marginTop}>
            <AppText style={styles.textTitle}>PHONE</AppText>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.marginTop}>
            <AppText style={styles.textTitle}>PSYCHIATRIST</AppText>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.marginTop}>
            <AppText style={styles.textTitle}>PHONE</AppText>
            <TextInput style={styles.input} />
          </View>
          <View
            style={{
              width: '90%',
              backgroundColor: '#ccc',
              height: 1,
              marginVertical: '10%',
              alignSelf: 'center',
            }}></View>
          <View style={{marginVertical: '5%'}}>
            <AppText style={styles.textTitle}>TREATMENT INFORMATION</AppText>
          </View>
          <View style={styles.marginTop}>
            <AppText style={styles.textTitle}>DIAGNOSIS</AppText>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.marginTop}>
            <AppText style={styles.textTitle}> MEDICAL</AppText>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.marginTop}>
            <AppText style={styles.textTitle}>
              NUMBER OF VISITS FOR INITIAL CARE
            </AppText>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.marginTop}>
            <AppText style={styles.textTitle}>FREQUENCY</AppText>
            <TextInput style={styles.input} />
          </View>
          <View
            style={{
              width: '90%',
              backgroundColor: '#ccc',
              height: 1,
              marginVertical: '10%',
              alignSelf: 'center',
            }}></View>
          <View style={{marginVertical: '5%'}}>
            <AppText style={styles.textTitle}>GOALS</AppText>
          </View>
          <View style={styles.marginTop}>
            <AppText style={styles.textTitle}>SHORT TERM</AppText>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.marginTop}>
            <AppText style={styles.textTitle}>LONG TERM</AppText>
            <TextInput style={styles.input} />
          </View>
        </View>

        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            color: '#000',
            fontSize: 24,
            fontWeight: '300',
            marginVertical: '5%',
          }}>
          TREATMENT PLAN PAGE 2
        </Text>
        <View style={styles.containerBottom}>
          <View style={styles.marginTop}>
            <AppText style={styles.textTitle}>SHORT TERM</AppText>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.marginTop}>
            <AppText style={[styles.textTitle, {fontSize: 14}]}>
              Indicate if 10 is the “Best” or “Worst”
            </AppText>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              setData([...data, {}]);
            }}>
            <Icon
              name={'add-circle-outline'}
              size={35}
              color="black"
              style={{backgroundColor: '#fff', borderRadius: 25}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerBottom}>
          {data.map((item, index) => {
            return (
              <PlanCare
                setState={setData}
                state={data}
                index={index}
                item={item}
              />
            );
          })}
        </View>
        <View style={{width: '90%', alignSelf: 'center', marginBottom: '2%'}}>
          <AppButton
            title={'Done'}
            onPress={() => {
              console.log('Done is pressed');
            }}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

export default TreatmentPlane;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dee2e5c2',
    margin: 10,
    marginTop: 0,
    padding: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  containerBottom: {
    flex: 1,
    backgroundColor: 'transparent',
    margin: 10,
    marginTop: 0,
    padding: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '300',
    marginVertical: '2%',
    marginLeft: '2%',
  },
  input: {backgroundColor: colors.backGrey, borderRadius: 10, padding: 10},
  marginTop: {marginTop: '2%'},
});
