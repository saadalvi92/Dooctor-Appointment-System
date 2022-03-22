import React from 'react';
import {useFormikContext} from 'formik';

import AppTextInput from '../TextInput';
import ErrorMessage from './ErrorMessage';
import {View} from 'react-native';

function AppFormField({name, width, styles, ...otherProps}) {
  const {setFieldTouched, handleChange, errors, touched} = useFormikContext();

  return (
    <View style={{marginBottom: 20}}>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        width={width}
        styles={styles}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

export default AppFormField;
