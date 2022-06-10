import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {
  calculateHeight,
  calculateWidth,
  normalize,
  WIDTH,
} from '../../../constants/dimension';
import {RootStackParamList} from '../../../interface/Navigation';
import firestore from '@react-native-firebase/firestore';
import {formatNumber} from '../../../utilities';
import {Button, Snackbar} from 'react-native-paper';
import {useAppDispatch} from '../../../app/hook';
import {addToCart} from '../../../features/cart/cartSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'DetailProductScreen'>;

export default function DetailProductScreen({navigation, route}: Props) {
  const dispatch = useAppDispatch();

  const [data, setData] = React.useState<any>(null);
  const [visible, setVisible] = React.useState(false);
  const [timer, setTimer] = React.useState<any>(null);

  const onDismissSnackBar = () => setVisible(false);

  const onGoBack = navigation.goBack;

  const onClick = () => {
    dispatch(
      addToCart({
        item: {
          ...data,
          pid: route.params.pid,
        },
      }),
    );
    setVisible(true);
    let newTimer = setTimeout(() => {
      onDismissSnackBar();
    }, 2500);
    setTimer(newTimer);
  };

  const getData = async () => {
    const response = await firestore()
      .collection('Products')
      .doc(route.params.pid)
      .get();
    setData(response.data());
  };

  React.useEffect(() => {
    getData();
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!data) {
    return <></>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground source={{uri: data.image}} style={styles.image}>
        <View style={styles.buttonBack}>
          <Button icon="arrow-left" mode="contained" onPress={onGoBack}>
            Back
          </Button>
        </View>
      </ImageBackground>
      <Text style={styles.name}>{data.name}</Text>
      <View style={styles.row}>
        <Text style={styles.price}>{formatNumber(data.price)}</Text>
        <Button icon="plus" mode="contained" onPress={onClick}>
          {'1'}
        </Button>
      </View>
      <Text style={styles.detail}>{data.detail}</Text>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'OK',
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        Đã thêm sản phẩm vào giỏ hàng
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  image: {
    width: WIDTH,
    height: (WIDTH / 3) * 2,
    resizeMode: 'contain',
  },
  name: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: calculateWidth(4),
    marginVertical: calculateHeight(1),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: calculateWidth(4),
    marginVertical: calculateHeight(1),
  },
  price: {
    fontWeight: 'bold',
    fontSize: normalize(17),
    marginTop: calculateHeight(0.5),
    color: '#000000',
    marginRight: calculateWidth(4),
  },
  detail: {
    fontSize: normalize(15),
    marginTop: calculateHeight(0.5),
    color: '#000000',
    marginHorizontal: calculateWidth(4),
    textAlign: 'justify',
  },
  buttonBack: {
    width: calculateWidth(25),
    height: calculateWidth(25),
    marginTop: calculateHeight(1),
    marginLeft: calculateWidth(4),
  },
});
