import TopNavBar from '@components/TopNavBar';
import ProdMidContainer from '@components/partProducts/ProdMidContainer';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import AppButton from '@ui/AppButton';
import BasicModalContainer from '@ui/BasicModalContainer';
import colors from '@utils/colors';
import {today} from '@utils/date';
import {FC, useCallback, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-web-swiper';
import {useDispatch, useSelector} from 'react-redux';
import {useRecoilState} from 'recoil';
import {TopNavigatorStackParamList} from 'src/@types/navigation';
import {PartnersNavigatorStackParamList} from 'src/@types/partners';
import catchAsyncError from 'src/api/catchError';
import {getClient} from 'src/api/client';
import {screenHState, screenWState} from 'src/atoms/useState';
import {getAuthState} from 'src/store/auth';
import {updateNotification} from 'src/store/notification';

interface Props {}

interface addCart {
  id: string;
  ownerId: string;
  date: string;
}

type routeProps = RouteProp<
  PartnersNavigatorStackParamList,
  'PartnerProductsDetail'
>;

const PartnerProductsDetail: FC<Props> = props => {
  const [modalCartShow, setModalCartShow] = useState(false);

  const rt = useRoute<routeProps>();

  const partProducts = rt.params.partProductSub;

  /**<--Redux--> */
  const {profile} = useSelector(getAuthState);
  const dispatch = useDispatch();

  const {navigate} =
    useNavigation<NavigationProp<TopNavigatorStackParamList>>();

  const {goBack} = useNavigation();

  const modalClose = () => {
    setModalCartShow(false);
  };

  /**Recoil 적용 잘되는지??? */
  const [screenWidth, setScreenWidth] = useRecoilState(screenWState);
  const [screenHeight, setScreenHeight] = useRecoilState(screenHState);

  const clickAddCart = async (e: object | string) => {
    if (e === undefined) return false;

    // modalCart -> 예/아니오 클릭
    if (typeof e === 'string') {
      setModalCartShow(false);
      if (e === 'YES') {
        // 장바구니페이지 이동
        navigate('Top');
      }
    } else {
      // prodMidContainer -> 장바구니담기 버튼클릭
      let upCartStatus = await upProductCart({
        id: e._id,
        ownerId: profile.id,
        date: today,
      });
      console.log(upCartStatus);
      if (upCartStatus) {
        console.log('updated!!!!!!!!!!');
        setModalCartShow(true);
      }
    }

    //top장바구니 수량 변경
  };

  const upProductCart = async (cartData: addCart): Promise<object> => {
    const client = await getClient();

    try {
      const {data} = await client.patch('/cart/update', {
        id: cartData.id,
        ownerId: cartData.ownerId,
        date: cartData.date,
      });

      return data;
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));

      return {};
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TopNavBar
          leftCompot={
            <Pressable onPress={goBack}>
              <Icon type="antdesign" name="left" color="white" />
            </Pressable>
          }
          rightCompot={
            <View style={styles.headerRight}>
              <TouchableOpacity style={{marginLeft: 10}}>
                <Icon type="antdesign" name="home" color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 10}}>
                <Icon type="antdesign" name="search1" color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 10}}>
                <Icon type="entypo" name="shopping-cart" color="white" />
              </TouchableOpacity>
            </View>
          }
          centComport={<View style={{flexDirection: 'row'}}></View>}
        />

        <View style={styles.imgContainer}>
          {/**추후 컴포넌트로 빼기 **/}
          <Swiper>
            {partProducts.img.map((imgUri, index) => {
              return (
                <View key={index} style={styles.slideContainer}>
                  <Image source={{uri: imgUri}} width={190} height={200} />
                </View>
              );
            })}
          </Swiper>
        </View>
        <View style={styles.imgMidContainer}>
          <ProdMidContainer
            prodData={partProducts}
            prodType={{
              partName: true,
              title: true,
              review: false,
              etc: partProducts.etc,
              cartBtn: true,
            }}
            screenWidth={screenWidth}
            onPress={clickAddCart}
          />
        </View>
      </View>

      <BasicModalContainer
        visible={modalCartShow}
        trans={true}
        modalContStyle={{
          height: 160,
          width: 360,
          flex: 0,
          top: screenHeight / 3,
          left: screenWidth / 14,
          backgroundColor: colors.gray2,
          borderRadius: 10,
          justifyContent: 'center',
        }}
        modalPropStyle={{maxHeight: '100%', marginVertical: 15}}
        onRequestClose={modalClose}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>
            상품을 장바구니에 담았습니다.{'\n'}장바구니로 이동하시겠습니까?
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <AppButton
            title="예(Yes)"
            propStyles={{
              width: 100,
              height: 40,
              backgroundColor: colors.blue2,
              borderRadius: 10,
            }}
            onPress={() => clickAddCart('YES')}
          />
          <AppButton
            title="아니오(No)"
            propStyles={{
              width: 100,
              height: 40,
              backgroundColor: colors.blue1,
              borderRadius: 10,
            }}
            onPress={() => clickAddCart('NO')}
          />
        </View>
      </BasicModalContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  imgContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: colors.gray1,
    // flex: 1,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // width: 100,
    // height: 100,
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
  imgMidContainer: {},
});

export default PartnerProductsDetail;
