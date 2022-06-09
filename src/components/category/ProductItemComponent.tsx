import * as React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-paper';
import {
  calculateHeight,
  calculateWidth,
  normalize,
} from '../../constants/dimension';
import {formatNumber} from '../../utilities';

interface ProductItemComponentProps {
  item: {
    image: string;
    price: number;
    name: string;
    id: string;
  };
  onPress: (id: string) => void;
}

function ProductItemComponent(props: ProductItemComponentProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.onPress(props.item.id)}>
      <Image source={{uri: props.item.image}} style={styles.image} />
      <View style={styles.right}>
        <Text style={styles.name}>{props.item.name}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>{formatNumber(props.item.price)}</Text>
          <Button icon="plus" mode="contained">
            {'1'}
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: calculateWidth(2),
    marginVertical: calculateHeight(1),
    flexDirection: 'row',
  },
  image: {
    width: calculateWidth(25),
    height: calculateWidth(25),
    resizeMode: 'cover',
  },
  right: {
    flex: 1,
  },
  name: {
    fontSize: normalize(15),
    fontWeight: 'bold',
    color: '#000000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontWeight: 'bold',
    fontSize: normalize(15),
    marginTop: calculateHeight(0.5),
    flex: 1,
    color: '#000000',
  },
});

export default React.memo(ProductItemComponent);
