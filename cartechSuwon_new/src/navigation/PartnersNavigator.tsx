import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PartnerProducts from '@views/partners/PartnerProducts';
import {PartnersNavigatorStackParamList} from 'src/@types/partners';
import Products from '@views/Products';
import PartnerProductsDetail from '@views/partners/PartnerProductsDetail';

interface Props {}

const Stack = createNativeStackNavigator<PartnersNavigatorStackParamList>();

const PartnersNavigator: FC<Props> = props => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Products">
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="PartnerProducts" component={PartnerProducts} />
      <Stack.Screen
        name="PartnerProductsDetail"
        component={PartnerProductsDetail}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PartnersNavigator;
