import * as React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function PersonalScreen() {
  const onLogout = () => {
    auth().signOut();
  };

  return (
    <View>
      <Text>Personal Screen</Text>
      <Button mode="contained" onPress={onLogout}>
        Đăng xuất
      </Button>
    </View>
  );
}
