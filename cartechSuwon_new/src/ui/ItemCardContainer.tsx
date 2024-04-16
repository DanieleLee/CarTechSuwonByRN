import {Text, Divider, Header} from '@rneui/themed';
import colors from '@utils/colors';
import {FC} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Icon} from '@rneui/themed';
import {ProductMenus} from 'src/@types/menu';

interface Props<T> {
  divideMenu: T[];
  listHeart?: Object;
  cardStyle?: StyleProp<ViewStyle>;
  pressEvt?(type: T[]): void;
}

const ItemCardContainer = <T extends ProductMenus>({
  divideMenu,
  listHeart,
  pressEvt,
  cardStyle,
}: Props<T>) => {
  if (divideMenu === undefined) return null;

  return (
    /**의존성강함 리팩토링 필요 **/
    <View style={styles.horizontal}>
      {divideMenu.map === undefined ? (
        <View style={[styles.container, cardStyle]}>
          <Pressable
            onPress={() =>
              pressEvt !== undefined
                ? pressEvt(divideMenu)
                : console.log('DivideContainPressEvt')
            }>
            <Image
              source={divideMenu.poster || require('../assets/music.png')}
              style={styles.poster}
            />
            {divideMenu.partName ? (
              <View style={styles.partProductCont}>
                <Text style={{fontSize: 18}}>{divideMenu.partName}</Text>
                <Icon type="antdesign" name="hearto" color="white" size={18} />
              </View>
            ) : null}

            <Text style={styles.horizontalText} numberOfLines={1}>
              {divideMenu.title}
            </Text>

            {divideMenu.price ? (
              <View style={{paddingLeft: 10, paddingRight: 10}}>
                <Text>{divideMenu.price}</Text>
              </View>
            ) : null}
          </Pressable>
        </View>
      ) : (
        divideMenu.map((menu, idx) => {
          const menu_poster = {uri: menu.poster};
          return (
            <View key={idx} style={[styles.container, cardStyle]}>
              <Pressable
                onPress={() =>
                  pressEvt !== undefined
                    ? pressEvt(menu)
                    : console.log('DivideContainPressEvt')
                }>
                <Image
                  // source={menu.poster || require('../assets/music.png')}
                  source={menu_poster || require('../assets/music.png')}
                  style={styles.poster}
                />
                {listHeart ? (
                  <View style={styles.partProductCont}>
                    <Text style={{fontSize: 18}}>{menu.partName}</Text>
                    <Icon
                      type="antdesign"
                      name="hearto"
                      color="white"
                      size={18}
                    />
                  </View>
                ) : null}

                <Text style={styles.horizontalText} numberOfLines={1}>
                  {menu.title}
                </Text>

                {menu.price ? (
                  <View style={{paddingLeft: 10, paddingRight: 10}}>
                    <Text>{menu.price}</Text>
                  </View>
                ) : null}
              </Pressable>
            </View>
          );
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
    // marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
  container: {
    width: 100,
    borderWidth: 1,
    // borderColor: 'black',
    borderColor: colors.gray2,
    // marginRight: 20,
    marginTop: 5,
    overflow: 'visible',
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
  partProductCont: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default ItemCardContainer;
