import {FC} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ProductMenus} from 'src/@types/menu';
import DivideContainer from './DivideContainer';

interface Props {
  menu: ProductMenus[];
  visible: boolean;
}

const SlideMenuBtn: FC<Props> = ({menu, visible}) => {
  return (
    <>
      <AntDesign name="bars" size={24} />;
      <View>
        <DivideContainer divideMenu={menu} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SlideMenuBtn;
