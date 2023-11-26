import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '@views/Profile';
import ProfileSettings from '@components/profile/ProfileSettings';
import PasswordChange from '@components/profile/PasswordChange';

interface Props {}

const Stack = createNativeStackNavigator();

const ProfileNavigator: FC<Props> = props => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
      <Stack.Screen name="PasswordChange" component={PasswordChange} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProfileNavigator;
