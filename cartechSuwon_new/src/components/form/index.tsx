import {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {Formik, FormikHelpers} from 'formik';

interface Props<T> {
  initialValues: any;
  validationSchema: any;
  onSubmit(values: T, formikHelpers: FormikHelpers<T>): void;
  children: ReactNode;
}

const Form = <T extends object>(props: Props<T>) => {
  return (
    <Formik
      onSubmit={props.onSubmit}
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}>
      {props.children}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Form;
