import React from 'react';
import {View, Text} from 'react-native';
import Screen from '../components/Screen';
function PaymentPage(props) {
  return (
    <Screen>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <Text style={{color: '#000', fontSize: 24, fontWeight: 'bold'}}>
          Payment page
        </Text>
      </View>
    </Screen>
  );
}

export default PaymentPage;
