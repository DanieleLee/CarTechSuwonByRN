import {Dimensions} from 'react-native';
import {atom} from 'recoil';

export const screenWState = atom({
  key: 'screenWState',
  default: Dimensions.get('window').width,
});

export const screenHState = atom({
  key: 'screenHState',
  default: Dimensions.get('window').height,
});
