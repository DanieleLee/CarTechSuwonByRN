import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

const Collect: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text>수금</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Collect;
