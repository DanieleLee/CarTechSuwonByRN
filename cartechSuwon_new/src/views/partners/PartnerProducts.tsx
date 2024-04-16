import ItemListContainer from '@components/ItemListContainer';
import TopNavBar from '@components/TopNavBar';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Badge, Icon} from '@rneui/themed';
import SubMenuDiv from '@ui/SubMenuDiv';
import colors from '@utils/colors';
import {ReactElement, useEffect, useRef, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Measurements} from 'src/@types/common';
import {PartnersNavigatorStackParamList, mainMenu} from 'src/@types/partners';
import {useFetchPartProductSub} from 'src/hooks/query';

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

  /** measured subMenuDiv Pos **/
  const [measure, setMeasure] = useState<Measurements | null>(null);
  const viewRef = useRef<View>(null);
  const textRef = useRef<Text>(null);
  const textRefM = useRef<Text>(null);

  let [selMenuType, setSelMenuType] = useState<string>();

  const selectedMenu = partProducts?.find(c => c._id === id_product._id);

  /**represent useFetchHook  **/
  const dummy_partnerProducts = [
    {
      _id: 'a1_a1',
      title: '후드(본넷)',
    },
    {
      _id: 'a1_a2',
      title: '프론트범퍼(앞범퍼)',
    },
    {
      _id: 'a1_a3',
      title: '탑쇼바',
    },
    {
      _id: 'a2_b1',
      title: '리어도어',
    },
    {
      _id: 'a2_b2',
      title: '사이드미러',
    },
    {
      _id: 'a2_b3',
      title: '프론트도어',
    },
  ];

  const filtProducts = dummy_partnerProducts.filter(product => {
    return product._id.includes(selectedMenu?._id || '');
  });

  /**represent useFetchHook  **/
  const dummy_partnerProducts_sub = [
    {
      _id: 'a1_a1_1',
      prodNum: 1,
      title: '후드(본넷) 기아/쏘렌토 R(2010년식)',
      desc: '2010년식 쏘렌토 본넷',
      price: 173000,
      img: ['../../asset/1.jpg', '../../asset/2.jpg'],
      poster: require('../../assets/productImg/1.jpg'),
      etc: {visit: true, muncheck: true, delivery: true},
      partId: '02401_a',
      partName: 'selfCar1',
    },
    {
      _id: 'a1_a1_2',
      prodNum: 2,
      title: '후드(본넷) 기아/스포티지(2011년식)',
      desc: '2010년식 쏘렌토 본넷',
      price: 183000,
      img: ['../../asset/1.jpg', '../../asset/2.jpg'],
      poster: require('../../assets/productImg/1.jpg'),
      etc: {visit: true, muncheck: true, delivery: true},
      partId: '02401_a',
      partName: 'selfCar1',
    },
    {
      _id: 'a1_a2_1',
      prodNum: 1,
      title: '프론트범퍼(앞범퍼) 르노삼성/ SM7',
      desc: '르노삼성 SM7 앞범퍼',
      price: 120000,
      img: ['../../asset/1.jpg', '../../asset/2.jpg'],
      poster: require('../../assets/productImg/1.jpg'),
      etc: {visit: true, muncheck: true, delivery: false},
      partId: '02402_a',
      partName: 'selfCar2',
    },
    {
      _id: 'a1_a2_2',
      prodNum: 2,
      title: '프론트범퍼(앞범퍼) 쉐보레/ 트랙스',
      desc: '르노삼성 SM7 앞범퍼',
      price: 130000,
      img: ['../../asset/1.jpg', '../../asset/2.jpg'],
      poster: require('../../assets/productImg/1.jpg'),
      etc: {visit: true, muncheck: true, delivery: false},
      partId: '02402_a',
      partName: 'selfCar2',
    },
    {
      _id: 'a1_a3_1',
      prodNum: 1,
      title: '탑쇼바_test1',
      desc: '2010년식 탑소바',
      price: 113000,
      img: ['../../asset/1.jpg', '../../asset/2.jpg'],
      poster: require('../../assets/productImg/1.jpg'),
      etc: {visit: true, muncheck: true, delivery: true},
      partId: '02403_a',
      partName: 'selfCar3',
    },
    {
      _id: 'a1_a3_2',
      prodNum: 2,
      title: '탑쇼바_tet2',
      desc: '2010년식 탑소바',
      price: 113000,
      img: ['../../asset/1.jpg', '../../asset/2.jpg'],
      poster: require('../../assets/productImg/1.jpg'),
      etc: {visit: true, muncheck: true, delivery: true},
      partId: '02403_a',
      partName: 'selfCar3',
    },
    {
      _id: 'a2_b1_1',
      prodNum: 1,
      title: '리어도어 (우/조수석) KG모빌리티(쌍용)/ 코란도 투리스모',
      desc: '2011년식 리어도어',
      price: 123000,
      img: ['../../asset/1.jpg', '../../asset/2.jpg'],
      poster: require('../../assets/productImg/2.jpg'),
      etc: {visit: true, muncheck: true, delivery: true},
      partId: '02404_a',
      partName: 'selfCar4',
    },
    {
      _id: 'a2_b1_2',
      prodNum: 2,
      title: '리어도어 (우/조수석) 기아/ k3',
      desc: '2011년식 리어도어',
      price: 123000,
      img: ['../../asset/1.jpg', '../../asset/2.jpg'],
      poster: require('../../assets/productImg/2.jpg'),
      etc: {visit: true, muncheck: true, delivery: true},
      partId: '02404_a',
      partName: 'selfCar4',
    },
    {
      _id: 'a2_b2_1',
      prodNum: 1,
      title: '사이드미러(우/조수석) 기아 /all new 카니발(2017)',
      desc: '2017년식 사이드미러',
      price: 93000,
      img: ['../../asset/1.jpg', '../../asset/2.jpg'],
      poster: require('../../assets/productImg/2.jpg'),
      etc: {visit: true, muncheck: true, delivery: true},
      partId: '02405_a',
      partName: 'selfCar5',
    },
    {
      _id: 'a2_b3_1',
      prodNum: 1,
      title: '프론트도어(우/조수석)현대 (2011)',
      desc: '2011년식 프론트도어',
      price: 5000,
      img: ['../../asset/1.jpg', '../../asset/2.jpg'],
      poster: require('../../assets/productImg/2.jpg'),
      etc: {visit: true, muncheck: true, delivery: true},
      partId: '02406_a',
      partName: 'selfCar6',
    },
  ];

  const filtSubProducts = dummy_partnerProducts_sub.filter(product => {
    return product._id.includes(selectedMenu?._id || '');
  });

  const selectEvt = (item: mainMenu, index: number) => {
    console.log(item);
  };

  const pressSubMenu = (clickObj: ReactElement, type: string): void => {
    setSelMenuType(type);
    setSelSubMenu(!selSubMenu);
  };

  const {navigate} =
    useNavigation<NavigationProp<PartnersNavigatorStackParamList>>();

  const pressSubMenuDetail = (menu: T[]): void => {
    navigate('PartnerProductsDetail', {partProductSub: menu});
  };

  const {goBack} = useNavigation();

  useEffect(() => {
    setSelMenu(selectedMenu);
  }, [selectedMenu]);

  /**measured subMenuDiv Pos **/
  useEffect(() => {
    if (!selMenuType) return;

    let target = selMenuType === 'S' ? textRef.current : textRefM.current;
    if (target && viewRef.current) {
      target?.measureLayout(
        viewRef.current,
        (left, top, width, height) => {
          setMeasure({left, top, width, height});
        },
        () => {
          console.error('submenudiv measurement failed..');
        },
      );
    }
  }, [selMenuType]);

  return (
    // <ScrollView style={styles.container} ref={viewRef}>
    <View style={styles.container} ref={viewRef}>
      <TopNavBar
        leftCompot={
          <Pressable onPress={goBack}>
            <Icon type="antdesign" name="left" color="white" />
          </Pressable>
        }
        rightCompot={
          <View style={styles.headerRight}>
            <TouchableOpacity style={{marginLeft: 10}}>
              <Icon type="antdesign" name="search1" color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 10}}>
              <Badge
                value="3"
                status="error"
                containerStyle={{
                  position: 'absolute',
                  top: -5,
                  right: -10,
                  zIndex: 10,
                }}
              />
              <Icon type="entypo" name="shopping-cart" color="white" />
            </TouchableOpacity>
          </View>
        }
        centComport={
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.heading} ref={textRefM}>
              전면부품
            </Text>
            <Pressable onPress={() => pressSubMenu(this, 'M')}>
              {selMenuType !== 'M' ? (
                <Icon type="antdesign" name="down" color="white" size={25} />
              ) : (
                <Icon type="antdesign" name="up" color="white" size={25} />
              )}
            </Pressable>
          </View>
        }
      />
      <TopNavBar
        leftCompot={
          <>
            <View style={styles.topNav2}>
              <Text style={{color: colors.gray1}} ref={textRef}>
                {selMenu?.title + ' >'}
              </Text>
              <Text style={{color: colors.gray1}}>{filtProducts[0].title}</Text>
              <Pressable onPress={() => pressSubMenu(this, 'S')}>
                {selMenuType !== 'S' ? (
                  <Icon type="antdesign" name="down" color="white" size={15} />
                ) : (
                  <Icon type="antdesign" name="up" color="white" size={15} />
                )}
              </Pressable>
            </View>
          </>
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
        subItems={partProducts}
        subItemProperties={{
          visible: selSubMenu,
          onSelect: selectEvt,
          onRequestClose: pressSubMenu,
        }}
      />
      <ItemListContainer
        items={filtSubProducts}
        pressEvent={pressSubMenuDetail}
      />
      {/**추후 컴포넌트로 빼기 **/}
      <View style={styles.subMenuDiv}>
        <SubMenuDiv
          visible={selSubMenu}
          onSelect={selectEvt}
          onRequestClose={pressSubMenu}
          items={partProducts}
          modalPropStyle={
            selMenuType === 'M'
              ? {
                  backgroundColor: colors.gray2,
                  top: measure?.top,
                  marginTop: 5,
                }
              : {backgroundColor: colors.gray2, top: measure?.top - 6}
          }
          modalContStyle={{
            justifyContent: 'flex-start',
            alignItems: 'baseline',
          }}
        />
      </View>
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.gray1,
    paddingTop: 4,
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
