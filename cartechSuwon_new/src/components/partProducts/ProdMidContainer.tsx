import CardContainer from '@components/CardContainer';
import {Icon} from '@rneui/themed';
import AppButton from '@ui/AppButton';
import CardRows from '@ui/CardRows';
import colors from '@utils/colors';
import {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {subMenu, subMenuMidType} from 'src/@types/partners';

interface Props {
  prodData: subMenu;
  prodType: subMenuMidType;
  screenWidth: number;
  onPress?(): void;
}

const ProdMidContainer: FC<Props> = ({
  prodData,
  prodType,
  screenWidth,
  onPress,
}) => {
  /*type조건으로 보여줄데이터 필터링하기, 리뷰보기는 제품&리뷰 테이블 조인해서 보여주기 */
  const prodRowsTest = [
    {
      text: prodData.partName + ' >',
      textStyle: {
        color: '#000000',
        fontSize: 14,
      },
      style: {
        flexDirection: 'row',
      },
      components: (
        <TouchableOpacity style={{marginLeft: 10, marginTop: 5}}>
          <Icon type="antdesign" name="hearto" color="black" size={18} />
        </TouchableOpacity>
      ),
    },
    {
      text: prodData.title,
      textStyle: {
        color: '#000000',
        fontSize: 16,
      },
    },
    {
      text:
        prodData.etc.discount !== 0 ? '(' + prodData.etc.discount + '%) ' : '',
      style: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      textStyle: {
        color: '#f76d02',
        fontSize: 18,
      },
      components: (
        <Text style={{fontSize: 18, paddingTop: 4}}>
          {prodData.price * (1 - prodData.etc.discount / 100)}
        </Text>
      ),
    },
    {
      text: prodData.etc.accumulate + '% 적립',
      style: {
        fontSize: 10,
      },
    },
    {
      components: (
        <AppButton
          title="장바구니 담기"
          propStyles={{
            width: screenWidth - 20,
            backgroundColor: colors.gray2,
            borderRadius: 0,
          }}
          onPress={() => onPress(prodData)}
        />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <CardContainer
        rows={
          <CardRows
            data={prodRowsTest}
            rowStyle={{
              width: screenWidth,
              height: 35 * prodRowsTest.length,
              marginVertical: 20,
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: 'white',
            }}
          />
        }
        size={prodRowsTest.length}
        background={colors.gray1}
        width={screenWidth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray1,
  },
});

export default ProdMidContainer;
