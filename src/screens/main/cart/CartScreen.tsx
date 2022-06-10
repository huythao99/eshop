import * as React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useAppSelector} from '../../../app/hook';
import CartProductItemComponent from '../../../components/cart/CartProductItemComponent';
import LottieView from 'lottie-react-native';

export default function CartScreen() {
  const products = useAppSelector(state => state.cart.items);

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
});
