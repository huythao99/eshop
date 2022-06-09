import * as React from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CategoryItemComponent from '../../../components/category/CategoryItemComponent';
import ProductItemComponent from '../../../components/category/ProductItemComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../interface/Navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryScreen'>;

export default function CategoryScreen({navigation}: Props) {
  const [categories, setCategories] = React.useState<any[]>([]);
  const [categoryID, setCategoryID] = React.useState('1');
  const [products, setProducts] = React.useState<any[]>([]);

  const onClickCategory = (cid: string) => {
    setCategoryID(cid);
  };

  const onClickProduct = (id: string) => {
    navigation.navigate('DetailProductScreen', {pid: id});
  };

  const getCategories = async () => {
    const response = await firestore().collection('Categories').get();
    const newData: any[] = [];
    response.forEach(document => {
      newData.push({
        ...document.data(),
        id: document.id,
      });
    });
    setCategories(newData);
  };

  const getProducts = async (cid: string) => {
    const response = await firestore()
      .collection('Products')
      .where('cid', '==', cid)
      .get();
    const newData: any[] = [];
    response.forEach(document => {
      newData.push({
        ...document.data(),
        id: document.id,
      });
    });
    setProducts(newData);
  };

  React.useEffect(() => {
    getProducts(categoryID);
  }, [categoryID]);

  React.useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {categories.map((item, index) => {
            return (
              <CategoryItemComponent
                name={item.name}
                image={item.image}
                id={item.id}
                key={index.toString()}
                onPress={onClickCategory}
              />
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.right}>
        <FlatList
          contentContainerStyle={styles.scroll}
          keyExtractor={(_, index) => index.toString()}
          data={products}
          renderItem={({item}) => {
            return (
              <ProductItemComponent onPress={onClickProduct} item={item} />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  left: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  right: {
    flex: 3,
  },
});
