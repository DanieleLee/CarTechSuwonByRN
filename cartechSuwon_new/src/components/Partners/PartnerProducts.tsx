import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  type: string;
}

const PartnerProducts: FC<Props> = ({route}) => {
  console.log(route.params);
  const type_product = route.params.type;
  return (
    <View style={styles.container}>
      <Text>{type_product}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginLeft: 5,
  },
});

export default PartnerProducts;
