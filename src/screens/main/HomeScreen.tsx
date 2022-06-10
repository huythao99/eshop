import * as React from 'react';
import {View, StyleSheet, PixelRatio, FlatList} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {calculateHeight, calculateWidth} from '../../constants/dimension';
import firestore from '@react-native-firebase/firestore';
import PrimaryProductItemComponent from '../../components/product/PrimaryProductItemComponent';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [products, setProducts] = React.useState<any[]>([]);
  const [searchProducts, setSearchProducts] = React.useState<any[]>([]);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const onSearch = () => {
    const newData = [...products];
    const newSearchProducts = newData.filter((item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setSearchProducts(newSearchProducts);
  };

  const getData = async () => {
    const response = await firestore().collection('Products').get();
    const newData: any[] = [];
    response.forEach(document => {
      newData.push({
        ...document.data(),
        id: document.id,
      });
    });
    setProducts(newData);
    setSearchProducts(newData);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.search}
        onSubmitEditing={onSearch}
      />
      <FlatList
        numColumns={2}
        data={searchProducts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return <PrimaryProductItemComponent item={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  search: {
    marginHorizontal: calculateWidth(4),
    marginVertical: calculateHeight(1),
  },
});
