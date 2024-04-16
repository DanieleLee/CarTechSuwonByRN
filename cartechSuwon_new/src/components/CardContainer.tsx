import {FC, ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  //   spanTag: string;
  rows: ReactNode;
  size: number;
  width?: number;
  radius?: number;
  background?: string;
}

const CardContainer: FC<Props> = ({
  //   spanTag,
  rows,
  size,
  width,
  radius,
  background,
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          width: width || 250,
          height: 60 * size,
          borderRadius: radius || 20,
          backgroundColor: background || '#2288D1',
        },
      ]}>
      <View style={[styles.card__row]}>{rows}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // backgroundColor: '#2288D1',
    marginTop: 10,
    alignItems: 'center',
  },
  card__row: {},
});

export default CardContainer;
