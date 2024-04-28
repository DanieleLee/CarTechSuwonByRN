import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Cart from '@views/cart/Cart';
import {FC} from 'react';
import {TopNavigatorStackParamList} from 'src/@types/navigation';

interface props {}

const Stack = createNativeStackNavigator<TopNavigatorStackParamList>();

const TopNavigator: FC<props> = props => {
  return (
    // <Stack.Navigator>
    <Stack.Screen name="Cart" component={Cart} />
    // {/* </Stack.Navigator> */}
  );
};

export default TopNavigator;
