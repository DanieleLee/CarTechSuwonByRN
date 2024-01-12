import HomeAlarm from '@components/HomeAlarm';
import PartnerProducts from '@components/Partners/PartnerProducts';
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
  {title: 'title1', pressEvt: 'press1'},
  {title: 'title2', pressEvt: 'press2'},
  {title: 'title2', pressEvt: 'press2'},
  {title: 'title2', pressEvt: 'press2'},
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

  const productsNav = () => {
    navigate('PartnerProducts');
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
