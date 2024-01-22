import {Text, Divider, Header} from '@rneui/themed';
import colors from '@utils/colors';
import {FC} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
// import {Divider} from 'react-native-elements';
import {ProductMenus} from 'src/@types/menu';

interface Props {
  divideMenu: ProductMenus[];
  divideStyle: Object;
  pressEvt?(type: string): void;
}

const DivideContainer: FC<Props> = ({divideMenu, pressEvt, divideStyle}) => {
  return (
    <View style={styles.horizontal}>
      {divideMenu.map((menu, idx) => {
        return (
          <View key={idx} style={styles.container}>
            <Pressable
              onPress={() =>
                pressEvt !== undefined
                  ? pressEvt(menu.pressEvt)
                  : console.log('DivideContainPressEvt')
              }>
              <Image
                source={menu.poster || require('../assets/music.png')}
                style={styles.poster}
              />
              <Text style={styles.horizontalText}>{menu.title}</Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 20,
    marginTop: 20,
    overflow: 'hidden',
  },
  horizontal: {
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  horizontalText: {
    textAlign: 'left',
    fontSize: 16,
    marginVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  poster: {
    height: 100,
    aspectRatio: 1,
    borderRadius: 7,
    resizeMode: 'stretch',
  },
  heading: {},
});

export default DivideContainer;
