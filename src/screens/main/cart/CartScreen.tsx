import * as React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../app/hook';
import CartProductItemComponent from '../../../components/cart/CartProductItemComponent';
import LottieView from 'lottie-react-native';
import {
  calculateHeight,
  calculateWidth,
  normalize,
} from '../../../constants/dimension';
import {formatNumber, showAlert} from '../../../utilities';
import {Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {resetCart} from '../../../features/cart/cartSlice';

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.cart.items);

  const onPress = async () => {
    await firestore()
      .collection('Orders')
      .add({
        items: products.map(item => ({
          pid: item.pid,
          name: item.name,
          price: item.price,
          image: item.image,
          qty: item.qty,
        })),
        uid: auth().currentUser?.uid,
      });
    dispatch(resetCart());
    showAlert('Đặt hàng thành công');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return <CartProductItemComponent item={item} />;
        }}
        contentContainerStyle={styles.scroll}
        ListEmptyComponent={
          <LottieView
            style={styles.anim}
            autoPlay
            loop
            source={require('../../../constants/lottie/empty_cart.json')}
          />
        }
        ListFooterComponent={
          products.length === 0 ? (
            <></>
          ) : (
            <View style={styles.bottom}>
              <Text style={styles.title}>
                Tổng tiền:{' '}
                {formatNumber(
                  products.reduce(
                    (prev, item) => item.qty * item.price + prev,
                    0,
                  ),
                )}{' '}
                VNĐ
              </Text>
              <Button
                onPress={onPress}
                icon="check-outline"
                style={styles.button}
                mode="contained">
                Đặt hàng
              </Button>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  anim: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  bottom: {
    paddingVertical: calculateHeight(1),
    paddingHorizontal: calculateWidth(6),
  },
  title: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: normalize(16),
  },
  button: {
    marginVertical: calculateHeight(2),
  },
});
