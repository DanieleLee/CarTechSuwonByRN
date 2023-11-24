import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form';
import colors from '@utils/colors';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';
import {FormikHelpers} from 'formik';
import client from 'src/api/client';
import catchAsyncError from 'src/api/catchError';
import {useDispatch} from 'react-redux';
import {updateNotification} from 'src/store/notification';

const lostPasswordSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing')
    .email('Invalid email..')
    .required('Emil is required..'),
});

interface Props {}

interface InitialValue {
  email: string;
}

const initialValues = {
  email: '',
};

const LostPassword: FC<Props> = props => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();

  const handleSubmit = async (
    values: InitialValue,
    actions: FormikHelpers<InitialValue>,
  ) => {
    actions.setSubmitting(true);
    try {
      const {data} = await client.post('/auth/forget-password', {
        ...values,
      });

      console.log(data);
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
      validationSchema={lostPasswordSchema}>
      <AuthFormContainer
        heading="비밀번호찾기"
        subHeading="등록한 이메일 주소를 입력해주세요">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="john123@email.com"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
            // onChange={handleChange('email')}
            // value={values.email}
            // errorMsg={errors.email}
          />

          <SubmitBtn title="비밀번호 링크 보내기" />
          <View style={styles.linkContainer}>
            <AppLink
              title="로그인"
              onPress={() => {
                navigation.navigate('SignIn');
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

export default LostPassword;
