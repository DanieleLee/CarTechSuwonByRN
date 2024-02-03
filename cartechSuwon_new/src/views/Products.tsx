import HomeAlarm from '@components/HomeAlarm';
import PartnerProducts from '@views/partners/PartnerProducts';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import DivideContainer from '@ui/DivideContainer';

import colors from '@utils/colors';
import {FC, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {PartnersNavigatorStackParamList} from 'src/@types/partners';

interface Props {}

const dummyMenuData = [
  {
    _id: 'a1',
    title: '전면부품',
    poster: require('../assets/car_front.png'),
    pressEvt: 'front',
  },
  {
    _id: 'a2',
    title: '측면부품',
    poster: require('../assets/car_front.png'),
    pressEvt: 'side',
  },
  {
    _id: 'a3',
    title: '후면부품',
    poster: require('../assets/car_front.png'),
    pressEvt: 'back',
  },
  {
    _id: 'a4',
    title: '실내부품',
    poster: require('../assets/car_front.png'),
    pressEvt: 'interior',
  },
];

const Products: FC<Props> = props => {
  const [showAlarm, setShowAlarm] = useState(false);
  const Tab = createBottomTabNavigator();

  const {navigate} =
    useNavigation<NavigationProp<PartnersNavigatorStackParamList>>();
  // useNavigation();

  const clickAlarm = () => {
    setShowAlarm(true);
  };

  const closeAlarm = () => {
    setShowAlarm(false);
  };

  const divideStyle = () => {
    return {};
  };

  const productsNav = (prop_id: string) => {
    navigate('PartnerProducts', {id: prop_id, partProduct: dummyMenuData});
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={clickAlarm}>
        <AntDesign name="bars" size={24} />
      </Pressable>

      <HomeAlarm
        visible={showAlarm}
        onRequestClose={closeAlarm}
        childNode={
          <DivideContainer
            divideMenu={dummyMenuData}
            divideStyle={divideStyle}
            pressEvt={productsNav}
          />
        }
      />

      {/* <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}>
        <Tab.Screen name="PartnerProducts" component={PartnerProducts} />
      </Tab.Navigator> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
    backgroundColor: colors.gray1,
  },
  tabBarStyle: {
    height: 0,
    marginBottom: 20,
    backgroundColor: 'transparent',
    elevation: 0,
    shadowRadius: 0,
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
  },
  tabBarLabelStyle: {
    color: colors.CONTRAST,
    fontSize: 0,
  },
});

export default Products;
