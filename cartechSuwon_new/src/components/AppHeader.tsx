import {useNavigation} from '@react-navigation/native';
import colors from '@utils/colors';
import {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  title: string;
}

const AppHeader: FC<Props> = ({title}) => {
  const {goBack, canGoBack} = useNavigation();

  if (!canGoBack()) return null;

  return (
    <View style={styles.container}>
      <Pressable onPress={goBack}>
        <AntDesign name="arrowleft" size={24} color={'black'} />
      </Pressable>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.gray2,
    height: 45,
  },
  title: {
    color: 'black',
    fontSize: 18,
  },
});

export default AppHeader;
