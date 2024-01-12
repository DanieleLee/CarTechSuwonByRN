import {Text, Divider, Header} from '@rneui/themed';
import colors from '@utils/colors';
import {FC} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
// import {Divider} from 'react-native-elements';
import {ProductMenus} from 'src/@types/menu';

interface Props {
  divideMenu: ProductMenus[];
  divideStyle: Object;
  pressEvt?(): void;
}

const DivideContainer: FC<Props> = ({divideMenu, pressEvt, divideStyle}) => {
  return (
    <View style={styles.horizontal}>
      {divideMenu.map((menu, idx) => {
        return (
          <View key={idx} style={styles.container}>
            <Pressable
              onPress={() =>
                pressEvt !== undefined ? pressEvt() : console.log('@@@@@@')
              }>
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
  heading: {},
});

export default DivideContainer;
