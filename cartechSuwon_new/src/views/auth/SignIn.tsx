import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form';
import AppInput from '@ui/AppInput';
import colors from '@utils/colors';
import {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';
import CircleUi from '@ui/CircleUi';
import AuthFormContainer from '@components/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';
import {FormikHelpers} from 'formik';
import client from 'src/api/client';
import {updateLoggedInState, updateProfile} from 'src/store/auth';
import {useDispatch} from 'react-redux';
import {Keys, saveToAsyncStorage} from '@utils/asyncStorage';
import catchAsyncError from 'src/api/catchError';
import {updateNotification} from 'src/store/notification';

const signupSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing')
    .email('Invalid email..')
    .required('Emil is required..'),
  password: yup
    .string()
    .trim('Pw is missing')
    .min(8, 'Pw is invalided..')

    .required('Pw is required..'),
});

interface SignInUserInfo {
  email: '';
  password: '';
}

interface Props {}

const initialValues = {
  email: '',
  password: '',
};

const SignIn: FC<Props> = props => {
  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const handleSubmit = async (
    values: SignInUserInfo,
    actions: FormikHelpers<SignInUserInfo>,
  ) => {
    actions.setSubmitting(true);
    try {
      const {data} = await client.post('/auth/sign-in', {
        ...values,
      });

      //로그인유지
      await saveToAsyncStorage(Keys.AUTH_TOKEN, data.token);

      dispatch(updateProfile(data.profile));
      dispatch(updateLoggedInState(true));
    } catch (error: any) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
    actions.setSubmitting(false);
  };

  return (
    // <SafeAreaView style={styles.container}>
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={signupSchema}>
      <AuthFormContainer heading="수원시 자동차협회">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="john123@email.com"
            label="ID"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
            // onChange={handleChange('email')}
            // value={values.email}
            // errorMsg={errors.email}
          />
          <AuthInputField
            name="password"
            placeholder="*****"
            label="Password"
            autoCapitalize="none"
            secureTextEntry={secureEntry}
            containerStyle={styles.marginBottom}
            rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
            onRightIconPress={togglePasswordView}
            // onRightIconPress
            // onChange={handleChange('password')}
            // value={values.password}
            // errorMsg={errors.password}
          />
          <SubmitBtn title="로그인" />
          <View style={styles.linkContainer}>
            <AppLink
              title="비밀번호 찾기"
              onPress={() => {
                navigation.navigate('LostPassword');
              }}
            />
            <AppLink
              title="회원가입"
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  formContainer: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default SignIn;
