import {FC} from 'react';
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Text, colors} from 'react-native-elements';
import BasicModalContainer from './BasicModalContainer';

interface Props<T> {
  visible: boolean;
  items: T[];
  modalPropStyle: StyleProp<ViewStyle>;
  modalContStyle: StyleProp<ViewStyle>;
  onSelect?(item: T, index: number): void;
  onRequestClose(): void;
}

const SubMenuDiv = <T extends any>({
  visible = false,
  items,
  modalPropStyle,
  modalContStyle,
  onSelect,
  onRequestClose,
}: Props<T>) => {
  const handleSelect = (item: T, index: number) => {
    onSelect(item, index);
  };

  return (
    <BasicModalContainer
      visible={visible}
      onRequestClose={onRequestClose}
      modalPropStyle={modalPropStyle}>
      <View style={styles.container}>
        {items.map((item, index) => {
          return (
            <Pressable
              onPress={() => {
                handleSelect(item, index);
              }}>
              <Text>{item.title}</Text>
            </Pressable>
          );
        })}
      </View>
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.grey1,
  },
});

export default SubMenuDiv;
