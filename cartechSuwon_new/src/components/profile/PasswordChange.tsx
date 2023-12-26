import AppHeader from '@components/AppHeader';
import AvatarField from '@ui/AvatarField';
import colors from '@utils/colors';
import {FC, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton from '@ui/AppButton';
import client, {getClient} from 'src/api/client';
import catchAsyncError from 'src/api/catchError';
import {updateNotification} from 'src/store/notification';
import {useDispatch, useSelector} from 'react-redux';
import {
  Keys,
  getFromAsyncStorage,
  removeFromAsyncStorage,
} from '@utils/asyncStorage';
import {
  getAuthState,
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from 'src/store/auth';
import deepEqual from 'deep-equal';
import {Button} from '@rneui/base';

interface Props {}
interface ProfileInfo {
  password: string;
  newPassword: string;
  newPassword_verify: string;
}

const PasswordChange: FC<Props> = props => {
  const [busy, setBusy] = useState(false);
  const [passInfo, setPassInfo] = useState<ProfileInfo>({
    password: '',
    newPassword: '',
    newPassword_verify: '',
  });
  const dispatch = useDispatch();
  const {profile} = useSelector(getAuthState);

  const handleSubmit = async () => {
    setBusy(true);
    try {
      if (
        !passInfo.password.trim() ||
        !passInfo.newPassword.trim() ||
        !passInfo.newPassword_verify.trim()
      ) {
        return dispatch(
          updateNotification({
            message: 'password is required',
            type: 'error',
          }),
        );
      }

      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      if (!token) {
        return dispatch(updateBusyState(false));
      }

      const {data} = await client.post('/auth/update-password', {
        token: token,
        userId: profile?.id,
        email: profile?.email,
        password: passInfo.newPassword,
        passwordCurrent: passInfo.password,
      });
      //userId값으로 메일value전달.
      console.log(data);
      //   if (!userInfo.name.trim())
      //     return dispatch(
      //       updateNotification({
      //         message: 'Profile name is required',
      //         type: 'error',
      //       }),
      //     );
      //   const formData = new FormData();
      //   formData.append('name', userInfo.name);
      //   const client = await getClient({'Content-Type': 'multipart/form-data'});
      //   const {data} = await client.post('/auth/update-profile', formData);
      //   dispatch(updateProfile(data.profile));
      //   dispatch(
      //     updateNotification({
      //       message: 'Your profile is updated',
      //       type: 'success',
      //     }),
      //   );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
    setBusy(false);
  };

  //   useEffect(() => {
  //     if (profile) setUserInfo({name: profile.name, avatar: profile.avatar});
  //   }, [profile]);

  return (
    <View style={styles.container}>
      <AppHeader title="Settings" />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>비밀번호 변경</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{marginTop: 5, paddingRight: 23}}>
            현재 비밀번호 입력
          </Text>
          <TextInput
            onChangeText={text => setPassInfo({...passInfo, password: text})}
            style={styles.nameInput}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{marginTop: 5, paddingRight: 10}}>
            변경할 비밀번호 입력
          </Text>
          <TextInput
            onChangeText={text => setPassInfo({...passInfo, newPassword: text})}
            style={styles.nameInput}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{marginTop: 5, paddingRight: 10}}>
            변경할 비밀번호 확인
          </Text>
          <TextInput
            onChangeText={text =>
              setPassInfo({...passInfo, newPassword_verify: text})
            }
            style={styles.nameInput}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button
            title={'비밀번호 변경하기'}
            containerStyle={{
              width: 200,
              //   marginHorizontal: 40,
              marginVertical: 10,
            }}
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </View>
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

  nameInput: {
    width: '60%',
    color: colors.blue1,
    fontWeight: 'bold',
    fontSize: 13,
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.blue2,
    borderRadius: 7,
    marginTop: 5,
  },

  marginTop: {
    marginTop: 15,
  },
});

export default PasswordChange;
