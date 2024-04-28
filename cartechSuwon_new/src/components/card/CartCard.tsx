import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Image, Card, Button} from 'react-native-elements';
import {subMenu} from 'src/@types/partners';

interface Props {
  data: subMenu;
}

const CartCard: FC<Props> = ({data}) => {
  return (
    <View style={styles.container}>
      <Image
        style={{width: '100%', height: 100}}
        resizeMethod="resize"
        source={{uri: data.poster || require('../../assets/music.png')}}
      />
      <Card.Divider />
      <Text>{data.title}</Text>
      <Text>{data.price}</Text>
      <Button
        title="삭제"
        buttonStyle={{
          width: '20%',
          backgroundColor: 'rgba(39, 39, 39, 1)',
        }}
        containerStyle={{width: '90%', marginTop: 10}}
        titleStyle={{color: 'white', fontSize: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CartCard;
