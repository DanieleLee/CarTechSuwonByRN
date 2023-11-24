import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form';
import colors from '@utils/colors';
import {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';
import {FormikHelpers} from 'formik';
import client from 'src/api/client';
import catchAsyncError from 'src/api/catchError';
import {useDispatch} from 'react-redux';
import {updateNotification} from 'src/store/notification';

const signupSchema = yup.object({
  name: yup
    .string()
    .trim('Name is missing')
    .min(3, 'Name is invalided..')
    .required('Name is required..'),
  email: yup
    .string()
    .trim('Email is missing')
    .email('Invalid email..')
    .required('Emil is required..'),
  password: yup
    .string()
    .trim('Pw is missing')
    .min(8, 'Pw is invalided..')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      'Pw is  too simple..',
    )
    .required('Pw is required..'),
});

interface Props {}

interface NewUser {
  name: string;
  email: string;
  password: string;
}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUp: FC<Props> = props => {
  const [secureEntry, setSecureEntry] = useState(true);

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (
    values: NewUser,
    actions: FormikHelpers<NewUser>,
  ) => {
    actions.setSubmitting(true);
    try {
      const {data} = await client.post('/auth/create', {
        ...values,
      });

      navigation.navigate('Verification', {userInfo: data.user});
    } catch (error) {
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
      <AuthFormContainer
        heading="환영합니다"
        subHeading="수원시 자동차협회 회원 등록화면 입니다.">
        <View style={styles.formContainer}>
          <AuthInputField
            name="name"
            placeholder="홍길동"
            label="이름"
            containerStyle={styles.marginBottom}
            // onChange={handleChange('name')}
            // value={values.name}
            // errorMsg={errors.name}
          />
          <AuthInputField
            name="email"
            placeholder="john123@email.com"
            label="이메일"
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
            label="비밀번호"
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
          <SubmitBtn title="회원등록" />
          <View style={styles.linkContainer}>
            <AppLink
              title="비밀번호 찾기"
              onPress={() => {
                navigation.navigate('LostPassword');
              }}
            />
            <AppLink
              title="로그인"
              onPress={() => {
                navigation.navigate('SignIn');
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

export default SignUp;
