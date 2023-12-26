import {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-elements';
import {ProductMenus} from 'src/@types/menu';

interface Props {
  divideMenu: ProductMenus[];
}

const divideConPress = (evt: string) => {
  console.log(evt);
};

const DivideContainer: FC<Props> = ({divideMenu}) => {
  return (
    <View style={styles.horizontal}>
      {divideMenu.map((menu, idx) => {
        return (
          <View key={idx}>
            <Pressable onPress={() => divideConPress(menu.pressEvt)}>
              <Text style={styles.horizontalText}>{menu.title}</Text>
            </Pressable>

            <Divider />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  horizontal: {
    marginBottom: 10,
  },
  horizontalText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
});

export default DivideContainer;
