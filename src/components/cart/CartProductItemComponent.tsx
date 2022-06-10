import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {useAppDispatch} from '../../app/hook';
import {
  calculateHeight,
  calculateWidth,
  normalize,
} from '../../constants/dimension';
import {removeItem} from '../../features/cart/cartSlice';
import {formatNumber} from '../../utilities';

interface Props {
  item: {
    image: string;
    price: number;
    name: string;
    pid: string;
    qty: number;
  };
}

export default function CartProductItemComponent(props: Props) {
  const dispatch = useAppDispatch();

  const onRemove = () => {
    dispatch(
      removeItem({
        pid: props.item.pid,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Image source={{uri: props.item.image}} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Text style={styles.title}>{props.item.name}</Text>
        <Text style={styles.price}>{formatNumber(props.item.price)}</Text>
        <Text style={styles.price}>Số lượng: {props.item.qty}</Text>
        <Text style={styles.price}>
          Tổng: {formatNumber(props.item.qty * props.item.price)}
        </Text>
        <Button icon="delete" mode="contained" onPress={onRemove}>
          Xóa
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    height: calculateHeight(23),
    paddingHorizontal: calculateWidth(4),
    marginVertical: calculateHeight(1),
  },
  column: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: normalize(15),
    fontWeight: 'bold',
  },
  price: {
    fontSize: normalize(15),
    fontWeight: 'bold',
  },
});
