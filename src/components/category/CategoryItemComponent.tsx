import * as React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  calculateHeight,
  calculateWidth,
  normalize,
} from '../../constants/dimension';

interface CategoryItemComponentProps {
  name: string;
  image: string;
  id: string;
  onPress: (id: string) => void;
}

function CategoryItemComponent(props: CategoryItemComponentProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.onPress(props.id)}>
      <Image source={{uri: props.image}} style={styles.image} />
      <Text style={styles.name}>{props.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: calculateHeight(1),
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#EEE',
    marginBottom: calculateHeight(1),
  },
  image: {
    width: '100%',
    height: calculateWidth(15),
    resizeMode: 'contain',
  },
  name: {
    fontSize: normalize(14),
    marginTop: calculateHeight(0.5),
  },
});

export default React.memo(CategoryItemComponent);
