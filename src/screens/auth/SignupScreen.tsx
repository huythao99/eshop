import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import LottieView from 'lottie-react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';
import {calculateHeight, calculateWidth} from '../../constants/dimension';
import {Button} from 'react-native-paper';
import {RootStackParamList} from '../../interface/Navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {showAlert} from '../../utilities';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type Props = NativeStackScreenProps<RootStackParamList, 'SignupScreen'>;

export default function SignupScreen({navigation}: Props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const [isShowRePassword, setIsShowRePassword] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const {colors} = useTheme();

  const onPress = () => {
    navigation.navigate('LoginScreen');
  };

  const onSignup = () => {
    if (
      password.trim() === '' ||
      rePassword.trim() === '' ||
      email.trim() === '' ||
      userName.trim() === ''
    ) {
      showAlert('Vui lòng điền đầy đủ thông tin');
    } else if (password.trim() !== rePassword.trim()) {
      showAlert('Mật khẩu không khớp');
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async () => {
          await firestore().collection('Users').add({
            name: userName,
            email: email,
          });
        })
        .catch(error => {
          showAlert(error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LottieView
          style={styles.anim}
          autoPlay
          loop
          source={require('../../constants/lottie/login_anim.json')}
        />
      </View>
      <View style={styles.body}>
        <ScrollView>
          <TextInput
            autoCapitalize="words"
            value={userName}
            mode="outlined"
            label="Họ và tên"
            placeholder="Họ và tên"
            onChangeText={(text: string) => setUserName(text)}
          />
          <TextInput
            value={email}
            style={styles.input}
            mode="outlined"
            label="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={(text: string) => setEmail(text)}
          />
          <TextInput
            value={password}
            mode="outlined"
            label="Mật khẩu"
            placeholder="Mật khẩu"
            onChangeText={(text: string) => setPassword(text)}
            secureTextEntry={!isShowPassword}
            right={
              <TextInput.Icon
                name="eye"
                onPress={() => setIsShowPassword(!isShowPassword)}
              />
            }
          />
          <TextInput
            style={styles.input}
            value={rePassword}
            mode="outlined"
            label="Nhập lại mật khẩu"
            placeholder="Nhập lại mật khẩu"
            onChangeText={(text: string) => setRePassword(text)}
            secureTextEntry={!isShowRePassword}
            right={
              <TextInput.Icon
                name="eye"
                onPress={() => setIsShowRePassword(!isShowRePassword)}
              />
            }
          />
          <Button mode="contained" onPress={onSignup}>
            Đăng ký
          </Button>
          <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={{color: colors.primary, textAlign: 'center'}}>
              Bạn đã có tài khoản? Đăng nhập ngay
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  anim: {},
  body: {
    flex: 1.75,
    paddingHorizontal: calculateWidth(4),
  },
  input: {
    marginVertical: calculateHeight(2),
  },
  btn: {
    marginVertical: calculateHeight(4),
  },
});
