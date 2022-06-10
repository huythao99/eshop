import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, Card, Paragraph, Title} from 'react-native-paper';
import {
  calculateHeight,
  calculateWidth,
  WIDTH,
} from '../../constants/dimension';
import {RootStackParamList} from '../../interface/Navigation';
import {formatNumber} from '../../utilities';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  item: {
    image: string;
    price: number;
    name: string;
    id: string;
  };
}

type PropsNavigator = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

export default function PrimaryProductItemComponent(props: Props) {
  const navigation = useNavigation<PropsNavigator>();

  const onPress = () => {
    navigation.navigate('DetailProductScreen', {
      pid: props.item.id,
    });
  };

  return (
    <Card style={styles.container} mode={'outlined'} onPress={onPress}>
      <Card.Cover source={{uri: props.item.image}} />
      <Card.Content>
        <Title>{props.item.name}</Title>
        <Paragraph>{formatNumber(props.item.price)}</Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: calculateWidth(2),
    marginVertical: calculateHeight(1),
    maxWidth: WIDTH / 2,
  },
});
