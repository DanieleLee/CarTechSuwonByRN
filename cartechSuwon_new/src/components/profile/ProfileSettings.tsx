import AppHeader from '@components/AppHeader';
import AvatarField from '@ui/AvatarField';
import colors from '@utils/colors';
import {FC, useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton from '@ui/AppButton';
import {getClient} from 'src/api/client';
import catchAsyncError from 'src/api/catchError';
import {updateNotification} from 'src/store/notification';
import {useDispatch, useSelector} from 'react-redux';
import {Keys, removeFromAsyncStorage} from '@utils/asyncStorage';
import {
  getAuthState,
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from 'src/store/auth';
import deepEqual from 'deep-equal';
import {Button} from '@rneui/base';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ProfileNavigatorStackParamList} from 'src/@types/navigation';

interface Props {}
interface ProfileInfo {
  name: string;
  avatar?: string;
  tel1?: string;
  tel2?: string;
  address?: string;
  email: string;
}

const ProfileSettings: FC<Props> = props => {
  const [userInfo, setUserInfo] = useState<ProfileInfo>({name: ''});
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const {profile} = useSelector(getAuthState);

  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

  // const isSame = deepEqual(userInfo, {
  //   name: profile?.name,
  //   avatar: profile?.avatar,
  // });

  const handleLogout = async (fromAll?: boolean) => {
    dispatch(updateBusyState(true));
    try {
      const endpoint = '/auth/log-out?fromAll=' + (fromAll ? 'yes' : '');
      const client = await getClient();
      await client.post(endpoint);
      await removeFromAsyncStorage(Keys.AUTH_TOKEN);
      dispatch(updateProfile(null));
      dispatch(updateLoggedInState(false));
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
    dispatch(updateBusyState(false));
  };

  const handleSubmit = async () => {
    setBusy(true);
    try {
      if (!userInfo.name.trim())
        return dispatch(
          updateNotification({
            message: 'Profile name is required',
            type: 'error',
          }),
        );

      const formData = new FormData();
      formData.append('name', userInfo.name);
      formData.append('tel1', userInfo.tel1);
      formData.append('tel2', userInfo.tel2);
      formData.append('address', userInfo.address);
      formData.append(
        'email',
        userInfo.email === undefined ? profile?.email : userInfo.email,
      );
      const client = await getClient({'Content-Type': 'multipart/form-data'});
      const {data} = await client.post('/auth/update-profile', formData);

      dispatch(updateProfile(data.profile));
      dispatch(
        updateNotification({
          message: 'Your profile is updated',
          type: 'success',
        }),
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
    setBusy(false);
  };

  useEffect(() => {
    if (profile)
      setUserInfo({
        name: profile.name,
        avatar: profile.avatar,
        tel1: profile.tel1,
        tel2: profile.tel2,
        address: profile.address,
        // email: undefined,
      });
  }, [profile]);

  return (
    <ScrollView style={styles.container}>
      <AppHeader title="Settings" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile Settings</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <View style={styles.avatarContainer}>
          <AvatarField source={userInfo.avatar} />

          <Pressable style={styles.paddingLeft}>
            <Text style={styles.linkText}>Update Profile Image</Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{marginTop: 5, paddingRight: 10}}>이름</Text>
          <TextInput
            onChangeText={text => setUserInfo({...userInfo, name: text})}
            style={styles.nameInput}
            value={userInfo.name}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{marginTop: 5, paddingRight: 10}}>전화번호</Text>
          <TextInput
            onChangeText={text => setUserInfo({...userInfo, tel1: text})}
            style={styles.nameInput}
            value={userInfo.tel1}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{marginTop: 5, paddingRight: 10}}>핸드폰번호</Text>
          <TextInput
            onChangeText={text => setUserInfo({...userInfo, tel2: text})}
            style={styles.nameInput}
            value={userInfo.tel2}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{marginTop: 5, paddingRight: 10}}>주소</Text>
          <TextInput
            onChangeText={text => setUserInfo({...userInfo, address: text})}
            style={styles.nameInput}
            value={userInfo.address}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{marginTop: 5, paddingRight: 10}}>이메일</Text>
          <TextInput
            onChangeText={text => setUserInfo({...userInfo, email: text})}
            style={styles.nameInput}
            value={profile?.email}
          />
          {/* <MaterialIcon name="verified" size={15} color={colors.blue2} /> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button
            title={'변경하기'}
            containerStyle={{
              width: 200,
              // marginHorizontal: 40,
              marginVertical: 5,
            }}
            onPress={() => handleSubmit()}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button
            title={'비밀번호 변경'}
            containerStyle={{
              width: 200,
              // marginHorizontal: 40,
              // marginVertical: 5,
            }}
            buttonStyle={{
              backgroundColor: 'rgba(200,200,216,1)',
            }}
            onPress={() => navigate('PasswordChange')}
          />
        </View>
        {/* <View style={styles.emailContainer}>
          <Text style={styles.email}>{profile?.email}</Text>
          <MaterialIcon name="verified" size={15} color={colors.blue2} />
        </View> */}
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Logout</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <Pressable onPress={() => handleLogout(true)} style={styles.logoutBtn}>
          <AntDesign name="logout" size={20} color={colors.blue1} />
          <Text style={styles.logoutBtnTitle}>Logout From All</Text>
        </Pressable>
        <Pressable onPress={() => handleLogout()} style={styles.logoutBtn}>
          <AntDesign name="logout" size={20} color={colors.blue1} />
          <Text style={styles.logoutBtnTitle}>Logout</Text>
        </Pressable>
      </View>

      {/* {!isSame ? (
        <View style={styles.marginTop}>
          <AppButton
            onPress={handleSubmit}
            title="Update"
            borderRadius={7}
            busy={busy}
          />
        </View>
      ) : null} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 15,
    backgroundColor: colors.gray1,
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.blue2,
    paddingBottom: 5,
    marginTop: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.blue2,
  },
  settingOptionsContainer: {
    marginTop: 15,
    paddingLeft: 15,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: colors.blue1,
    fontStyle: 'italic',
  },
  paddingLeft: {
    paddingLeft: 15,
  },
  nameInput: {
    width: '80%',
    color: colors.blue1,
    fontWeight: 'bold',
    fontSize: 14,
    padding: 5,
    borderWidth: 0.5,
    borderColor: colors.blue2,
    borderRadius: 7,
    marginTop: 5,
    right: 10,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  email: {
    color: colors.blue1,
    marginRight: 10,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  logoutBtnTitle: {
    color: colors.blue1,
    fontSize: 18,
    marginLeft: 5,
  },
  marginTop: {
    marginTop: 15,
  },
});

export default ProfileSettings;
