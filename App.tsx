import * as React from 'react';
import {StatusBar} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import AppNavigator from './AppNavigator';
import store from './src/app/store';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200EA',
  },
};

export default function Main() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
        <AppNavigator />
      </PaperProvider>
    </StoreProvider>
  );
}
