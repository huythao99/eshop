import {Alert} from 'react-native';

export const showAlert = (message: string) => {
  Alert.alert('Thông báo', message);
};

export const formatNumber = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
