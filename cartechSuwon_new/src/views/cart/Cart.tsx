import TopNavBar from '@components/TopNavBar';
import DefaultTable from '@components/table/DefaultTable';
import {useNavigation} from '@react-navigation/native';
import {FC, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFetchCartProducts, useFetchPartProdForCart} from 'src/hooks/query';
import {Icon} from '@rneui/themed';
import CountBox from '@components/CountBox';
import CartCard from '@components/card/CartCard';

interface Props {}

const Cart: FC<Props> = props => {
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  /**Hooks */
  const {data} = useFetchPartProdForCart();

  const {goBack} = useNavigation();

  const tableHeadState = {
    tableHead: ['Product', 'Accumulate', 'Quantity'],
    widthArr: [230, 60, 80],
  };

  const countBoxClicked = (statKey: string, count: number) => {
    console.log(statKey + ':' + count);
  };

  const TableComponent = () => {
    let tableData: (string | number)[][] = [];
    let cartTPrice = 0;

    data?.map(row => {
      let cellData = [
        <CartCard data={row} />,
        <Text style={{fontSize: 11, textAlign: 'center'}}>
          {row.etc.accumulate +
            '% \n(' +
            row.price * parseInt(row.etc.accumulate) +
            '원)'}
        </Text>,
        <CountBox data={row.quantity} clicked={countBoxClicked} />,
      ];

      tableData.push(cellData);
      cartTPrice += row.price;
    });

    setCartTotalPrice(cartTPrice);

    return (
      <ScrollView>
        <TopNavBar
          leftCompot={
            <Pressable onPress={goBack}>
              <Icon type="antdesign" name="left" color="black" />
            </Pressable>
          }
          contStyle={{
            backgroundColor: 'transparnet',
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5E5',
          }}
        />
        <Text style={styles.topText}>장바구니</Text>
        <DefaultTable
          tableState={tableHeadState}
          tableData={tableData}
          rowStyle={{flexDirection: 'row', padding: 3}}
          headStyle={{
            backgroundColor: 'transparent',
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5E5',
          }}
        />
        {/* Bottom */}
        <View
          style={{
            width: '100%',
            borderTopColor: '#E5E5E5',
            borderTopWidth: 1,
            bottom: 10,
            alignItems: 'flex-end',
          }}>
          <Text>{'TotalPrice: ' + cartTotalPrice + '원'}</Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <TableComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%', height: '100%', backgroundColor: 'white'},
  topText: {
    width: '100%',
    color: 'black',
    fontSize: 20,
    paddingTop: 50,
    textAlign: 'center',
  },
});

export default Cart;
