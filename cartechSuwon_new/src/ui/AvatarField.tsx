import colors from '@utils/colors';
import {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import EnrypoIcon from 'react-native-vector-icons/Entypo';

interface Props {
  source?: string;
}

const avatarSize = 70;

const AvatarField: FC<Props> = ({source}) => {
  return (
    <View>
      {source ? (
        <Image source={{uri: source}} style={styles.avatarImage} />
      ) : (
        <View style={styles.avatarImage}>
          <EnrypoIcon name="mic" size={30} color={colors.PRIMARY} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarImage: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: colors.blue2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.CONTRAST,
  },
});

export default AvatarField;
