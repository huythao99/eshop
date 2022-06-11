import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {
  calculateHeight,
  calculateWidth,
  normalize,
  WIDTH,
} from '../../../constants/dimension';
import LottieView from 'lottie-react-native';

export default function PersonalScreen() {
  const onLogout = () => {
    auth().signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.anim}>
        <LottieView
          autoPlay
          loop
          source={require('../../../constants/lottie/person.json')}
        />
      </View>
      <Text style={styles.title}>Tài khoản của tôi</Text>
      <Text style={styles.content}>
        Họ và tên: {auth().currentUser?.displayName}
      </Text>
      <Text style={styles.content}>Email: {auth().currentUser?.email}</Text>
      {/* <View style={styles.button}>
        <Button
          contentStyle={styles.buttonContent}
          compact={true}
          icon="chevron-right">
          Đơn hàng của tôi
        </Button>
      </View> */}
      <Button style={styles.button} mode="contained" onPress={onLogout}>
        Đăng xuất
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: calculateWidth(4),
  },
  title: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: '#000000',
  },
  content: {
    marginVertical: calculateHeight(0.5),
    fontSize: normalize(13),
    color: '#000000',
  },
  anim: {
    width: WIDTH,
    height: (WIDTH / 2) * 1.5,
  },
  button: {
    marginVertical: calculateHeight(1),
    // width: WIDTH / 2,
  },
  buttonContent: {
    flexDirection: 'row-reverse',
  },
});
