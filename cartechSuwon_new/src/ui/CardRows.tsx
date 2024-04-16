import {FC, ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props<T> {
  data: any[];
  rowStyle?: object;
}

const CardRows = <T extends any>({data, rowStyle}: Props<T>) => {
  return (
    <View style={rowStyle}>
      {data.map((item, index) => {
        return (
          <View key={index} style={[styles.item, item.style]}>
            <Text style={[styles.itemText, item.textStyle]}>
              {item.text ? item.text : null}
            </Text>
            <View style={styles.components}>
              {item.components ? item.components : null}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  //   container: {backgroundColor: 'yellow', width: 100, height: 100},
  item: {
    // paddingBottom: 10,
    justifyContent: 'space-between',
  },
  itemText: {
    color: 'black',
    paddingTop: 4,
  },
  components: {
    alignSelf: 'flex-start',
    // paddingTop: 5,
  },
});

export default CardRows;
