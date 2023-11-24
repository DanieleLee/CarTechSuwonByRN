import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

const Products: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text>협력사상품 구매</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Products;
