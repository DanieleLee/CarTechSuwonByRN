import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '@utils/colors';
import Home from '@views/Home_new';
import Profile from '@views/Profile';
import Upload from '@views/Upload';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ProfileNavigator from './ProfileNavigator';
import Account from '@views/Account';
import Collect from '@views/Collect';
import {Image} from 'react-native';
import Products from '@views/Products';
import Payout from '@views/Payout';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#D3D4DD'},
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: props => {
            return (
              <AntDesign name="home" size={props.size} color={props.color} />
            );
          },
          tabBarLabel: 'HOME',
        }}
      />
      <Tab.Screen
        name="AccountScreen"
        component={Account}
        options={{
          tabBarIcon: props => {
            return (
              <MaterialComIcon
                name="account-edit"
                size={props.size}
                color={props.color}
              />
            );
          },
          tabBarLabel: '거래처',
        }}
      />
      <Tab.Screen
        name="CollectScreen"
        component={Collect}
        options={{
          tabBarIcon: props => {
            return (
              <AntDesign name="bank" size={props.size} color={props.color} />
            );
          },
          tabBarLabel: '수금',
        }}
      />

      <Tab.Screen
        name="ProductsScreen"
        component={Products}
        options={{
          tabBarIcon: props => {
            return (
              <MaterialComIcon
                name="shopping"
                size={props.size}
                color={props.color}
              />
            );
          },
          tabBarLabel: '협력사상품',
        }}
      />

      <Tab.Screen
        name="PayoutScreen"
        component={Payout}
        options={{
          tabBarIcon: props => {
            return (
              <FontAwesome5Icon
                name="piggy-bank"
                size={props.size}
                color={props.color}
              />
            );
          },
          tabBarLabel: '지급금',
        }}
      />

      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          tabBarIcon: props => {
            return (
              <AntDesign name="user" size={props.size} color={props.color} />
            );
          },
          tabBarLabel: 'MY',
        }}
      />
      {/* <Tab.Screen
        name="UploadScreen"
        component={Upload}
        options={{
          tabBarIcon: props => {
            return (
              <MaterialComIcon
                name="account-music-outline"
                size={props.size}
                color={props.color}
              />
            );
          },
          tabBarLabel: 'UPLOAD',
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
