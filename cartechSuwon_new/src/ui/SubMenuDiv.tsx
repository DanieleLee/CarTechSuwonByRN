import {FC} from 'react';
import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Text, colors} from 'react-native-elements';
import BasicModalContainer from './BasicModalContainer';

interface Props<T> {
  visible?: boolean;
  items?: T[];
  modalPropStyle?: StyleProp<ViewStyle>;
  modalContStyle?: StyleProp<ViewStyle>;
  onSelect?(item: T, index: number): void;
  onRequestClose?(): void;
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
    // <View style={styles.container}>
    <BasicModalContainer
      visible={visible}
      trans={true}
      onRequestClose={onRequestClose}
      modalPropStyle={modalPropStyle}>
      <View style={styles.divContainer}>
        {items &&
          items.map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  handleSelect(item, index);
                }}>
                <Text>{item.title}</Text>
              </Pressable>
            );
          })}
      </View>
    </BasicModalContainer>
    // </View>
  );
};

const styles = StyleSheet.create({
  divContainer: {
    // backgroundColor: 'transparent',
  },
});

export default SubMenuDiv;
