import colors from '@utils/colors';
import {FC} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';

interface Props extends TextInputProps {}

const AppInput: FC<Props> = props => {
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.INACTIVE_CONTRAST}
      style={[styles.input, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    borderWidth: 2,
    borderColor: 'black',
    height: 45,
    borderRadius: 10,
    color: colors.CONTRAST,
    padding: 10,
  },
});

export default AppInput;
