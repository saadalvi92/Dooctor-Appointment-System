import axios from 'axios';
import {envConfig} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Api = async (method, route, data) => {
  const promise = axios({
    method: method,
    url: `${envConfig.baseApiUrl}/${route}`,
    headers: {
      Authorization: 'Bearer ' + AsyncStorage.getItem('soar-auth-token'),
      'content-type': 'application/json',
    },
    data: data,
  });
  const response = await promise
    .then(resp => {
      return resp;
    })
    .catch(err => {
      return err.response;
    });

  return response;
};
