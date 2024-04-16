import colors from '@utils/colors';
import {FC} from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Loader from './Loader';

interface Props {
  title: string;
  onPress?(): void;
  busy?: boolean;
  borderRadius?: number;
  propStyles?: StyleProp<ViewStyle>;
}

const AppButton: FC<Props> = ({title, busy, onPress, propStyles}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, propStyles]}>
      {!busy ? <Text style={styles.title}>{title}</Text> : <Loader />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  title: {
    color: 'black',
    fontSize: 18,
  },
});

export default AppButton;
