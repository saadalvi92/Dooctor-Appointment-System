import React, {useEffect, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';

// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import {MaterialCommunityIcons} from 'react-native-vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../config/colors';
import {fontSize} from '../../config/fonts';

const DropDownField = ({
  data,
  width = '100%',
  Select,
  value = data[0],
  styles,
  Text = {fontSize: 16},
}) => {
  const [menuData, setMenuData] = useState(data);
  useEffect(() => {
    setMenuData(data);
  }, [data]);
  return (
    <SelectDropdown
      data={menuData}
      onSelect={(selectedItem, index) => {
        Select(selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
      renderDropdownIcon={() => (
        <MaterialCommunityIcons name="chevron-down" size={25} color={'#000'} />
      )}
      defaultButtonText={value}
      buttonTextStyle={{
        fontSize: 15,
      }}
      buttonStyle={
        styles
          ? styles
          : {
              flex: 1,
              width: width,
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: '#A4C8D5',
              marginBottom: 20,
              borderRadius: 5,
            }
      }
      buttonTextStyle={Text}
    />
  );
};
export default DropDownField;
