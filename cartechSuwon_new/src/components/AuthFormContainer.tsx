import CircleUi from '@ui/CircleUi';
import colors from '@utils/colors';
import {FC, ReactNode} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface Props {
  children: ReactNode;
  heading?: string;
  subHeading?: string;
}

const AuthFormContainer: FC<Props> = ({children, heading, subHeading}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/car.png')} />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
      <View style={styles.headerContainer2}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue1,
    alignItems: 'center',
    // justifyContent: 'center',
    //paddingHorizontal: 15,
  },
  heading: {
    color: 'black',
    textShadowColor: 'white',
    textShadowOffset: {width: -1, height: -1},
    textShadowRadius: 10,
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  subHeading: {color: colors.CONTRAST, fontSize: 16, fontWeight: 'bold'},
  headerContainer: {
    width: '100%',
    // marginBottom: 20,
    backgroundColor: colors.blue2,
    alignItems: 'center',
    borderColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomLeftRadius: 60,
    paddingVertical: 25,
  },
  headerContainer2: {
    backgroundColor: colors.blue2,
    width: '100%',
    height: '100%',
    borderColor: colors.blue1,
    borderTopWidth: 0.1,
    borderTopRightRadius: 60,
    paddingHorizontal: 15,

    // borderColor: 'transparent',
    // borderTopWidth: 10,
    // borderTopRightRadius: 30,
    // borderBottomRightRadius: 60,
    // transform: 'rotate(90deg)',
  },
});

export default AuthFormContainer;
