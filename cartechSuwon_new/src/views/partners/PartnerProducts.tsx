import TopNavBar from '@components/TopNavBar';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import SubMenuDiv from '@ui/SubMenuDiv';
import colors from '@utils/colors';
import {
  FC,
  ReactComponentElement,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PartnersNavigatorStackParamList, mainMenu} from 'src/@types/partners';

interface Props<T> {
  route: any;
}

type routeProps = RouteProp<PartnersNavigatorStackParamList, 'PartnerProducts'>;

const PartnerProducts = <T extends any>({route}: Props<T>) => {
  const rt = useRoute<routeProps>();

  const id_product = route.params.id;
  const partProducts = rt.params.partProduct;

  const [selMenu, setSelMenu] = useState<mainMenu>();
  const [selSubMenu, setSelSubMenu] = useState(false);

  const selectedMenu = partProducts?.find(c => c._id === id_product);

  /**represent useFetchHook  **/
  const dummy_partnerProducts = [
    {
      _id: 'a1_a_1',
      title: '후드(본넷)',
    },
    {
      _id: 'a1_a_2',
      title: '프론트범퍼(앞범퍼)',
    },
    {
      _id: 'a1_a_3',
      title: '탑쇼바',
    },
    {
      _id: 'a2_b_1',
      title: '리어도어',
    },
    {
      _id: 'a2_b_2',
      title: '사이드미러',
    },
    {
      _id: 'a2_b_3',
      title: '프론트도어',
    },
  ];

  const filtProducts = dummy_partnerProducts.filter(product => {
    return product._id.includes(selectedMenu?._id);
  });

  const selectEvt = (item: mainMenu, index: number) => {
    console.log(item);
  };

  const pressSubMenu = (clickObj: ReactElement) => {
    setSelSubMenu(!selSubMenu);
    console.log(clickObj.currentTarget);
  };

  useEffect(() => {
    setSelMenu(selectedMenu);
  }, [selectedMenu]);

  return (
    <View style={styles.container}>
      <TopNavBar
        leftCompot={<Icon type="antdesign" name="left" color="white" />}
        rightCompot={
          <View style={styles.headerRight}>
            <TouchableOpacity style={{marginLeft: 10}}>
              <Icon type="antdesign" name="search1" color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 10}}>
              <Icon type="entypo" name="shopping-cart" color="white" />
            </TouchableOpacity>
          </View>
        }
        centComport={
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.heading}>전면부품</Text>
            <Icon
              type="antdesign"
              name="down"
              color="white"
              style={{paddingLeft: 10, paddingTop: 2}}
            />
          </View>
        }
      />
      <TopNavBar
        leftCompot={
          <View style={styles.topNav2}>
            <Text style={{color: colors.gray1}}>{selMenu?.title + ' >'}</Text>
            <Text style={{color: colors.gray1}}>{filtProducts[0].title}</Text>
            <Pressable onPress={() => pressSubMenu(this)}>
              {selSubMenu === false ? (
                <Icon type="antdesign" name="down" color="white" size={15} />
              ) : (
                <Icon type="antdesign" name="up" color="white" size={15} />
              )}
            </Pressable>

            <SubMenuDiv
              visible={selSubMenu}
              items={partProducts}
              onSelect={selectEvt}
              onRequestClose={pressSubMenu}
              modalPropStyle={{backgroundColor: colors.gray2}}
              modalContStyle={{
                justifyContent: 'flex-start',
                alignItems: 'baseline',
              }}
            />
          </View>
        }
        contStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 30,
          paddingTop: 0,
          paddingBottom: 20,
        }}
        leftStyle={{
          height: 20,
        }}
      />
      <Text>{selectedMenu?.pressEvt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 25,
    // marginLeft: 5,
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 1,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  topNav2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
});

export default PartnerProducts;
