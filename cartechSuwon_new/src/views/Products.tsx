import colors from '@utils/colors';
import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

const Products: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'black'}}>
        협력사상품 구매555555555555555555555555
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
    backgroundColor: colors.gray1,
  },
});

export default Products;
