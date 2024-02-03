import colors from '@utils/colors';
import {FC, ReactNode} from 'react';
import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Text} from 'react-native-elements';

interface Props {
  visible?: boolean;
  onRequestClose?(): void;
  children: ReactNode;
  modalPropStyle?: StyleProp<ViewStyle>;
  modalContStyle?: StyleProp<ViewStyle>;
}

const BasicModalContainer: FC<Props> = ({
  visible,
  children,
  onRequestClose,
  modalPropStyle,
  modalContStyle,
}) => {
  return (
    <Modal onRequestClose={onRequestClose} visible={visible} transparent>
      <View style={[styles.modalContainer, modalContStyle]}>
        <Pressable onPress={onRequestClose} style={styles.backdrop} />
        <View style={[styles.modal, modalPropStyle]}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.INACTIVE_CONTRAST,
    zIndex: -1,
  },
  modalContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  modal: {
    width: '100%',
    maxHeight: '50%',
    borderRadius: 10,
    padding: 10,
    // top: 10,
    // backgroundColor: colors.CONTRAST,
  },
});

export default BasicModalContainer;
