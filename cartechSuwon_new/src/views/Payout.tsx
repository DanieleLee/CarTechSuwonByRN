import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

const Payout: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text>지급금</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Payout;
