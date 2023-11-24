import {FC, ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  //   spanTag: string;
  rows: ReactNode;
  size: number;
}

const CardContainer: FC<Props> = ({
  //   spanTag,
  rows,
  size,
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          width: 250,
          height: 50 * size,
          borderRadius: 20,
        },
      ]}>
      <View style={[styles.card__row]}>{rows}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {backgroundColor: '#2288D1', justifyContent: 'center'},
  card__row: {},
});

export default CardContainer;
