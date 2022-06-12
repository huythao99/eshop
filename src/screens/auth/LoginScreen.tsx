import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';
import {
  calculateHeight,
  calculateWidth,
  HEIGHT,
} from '../../constants/dimension';
import {Button} from 'react-native-paper';
import {RootStackParamList} from '../../interface/Navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

export default function LoginScreen({navigation}: Props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const {colors} = useTheme();

  const onPress = () => {
    navigation.navigate('SignupScreen');
  };

  const onLogin = () => {
    auth().signInWithEmailAndPassword(email, password);
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
        <TextInput
          value={email}
          mode="outlined"
          label="Email"
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text: string) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
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
        <Button mode="contained" onPress={onLogin}>
          Đăng nhập
        </Button>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={{color: colors.primary, textAlign: 'center'}}>
            Bạn chưa có tài khoản? Đăng ký ngay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: HEIGHT,
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
    marginVertical: calculateHeight(4),
  },
  btn: {
    marginVertical: calculateHeight(4),
  },
});
