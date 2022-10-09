import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../config/colors';
function ModalView({title, isModalVisible, onPressok, onPresscancel}) {
  return (
    <View>
      <Modal isVisible={isModalVisible} onBackdropPress={onPresscancel}>
        <View
          style={{
            backgroundColor: '#ccc',
            height: '28%',
            width: '95%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: '#000',
              marginBottom: '5%',
              fontSize: 18,
              fontWeight: '400',
            }}>
            {title}
          </Text>
          <View style={{flexDirection: 'row', width: '100%', marginTop: '5%'}}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: colors.green,
                justifyContent: 'center',
                alignItems: 'center',
                height: '65%',
                marginLeft: '2%',
                marginRight: '2%',
                borderRadius: 5,
              }}
              onPress={onPressok}>
              <Text style={{fontSize: 20, color: '#fff'}}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                height: '65%',
                marginLeft: '2%',
                marginRight: '2%',
                borderRadius: 5,
              }}
              onPress={onPresscancel}>
              <Text style={{fontSize: 20, color: '#fff'}}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ModalView;
