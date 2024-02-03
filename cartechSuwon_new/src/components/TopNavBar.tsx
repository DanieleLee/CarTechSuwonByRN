import {FC, ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  leftCompot?: ReactNode;
  centComport?: ReactNode;
  rightCompot?: ReactNode;
  contStyle?: Object;
  leftStyle?: Object;
}

const TopNavBar: FC<Props> = ({
  leftCompot,
  centComport,
  rightCompot,
  contStyle,
  leftStyle,
}) => {
  return (
    <HeaderRNE
      leftComponent={
        leftCompot
        // || <Icon type="antdesign" name="left" color="white" />
      }
      rightComponent={
        rightCompot
        // || (
        //   <View style={styles.headerRight}>
        //     <TouchableOpacity style={{marginLeft: 10}}>
        //       <Icon type="antdesign" name="search1" color="white" />
        //     </TouchableOpacity>
        //     <TouchableOpacity style={{marginLeft: 10}}>
        //       <Icon type="entypo" name="shopping-cart" color="white" />
        //     </TouchableOpacity>
        //   </View>
        // )
      }
      centerComponent={
        centComport
        // || (
        //   <View style={{flexDirection: 'row'}}>
        //     <Text style={styles.heading}>전면부품</Text>
        //     <Icon
        //       type="antdesign"
        //       name="down"
        //       color="white"
        //       style={{paddingLeft: 10, paddingTop: 2}}
        //     />
        //   </View>
        // )
      }
      containerStyle={contStyle || styles.container}
      leftContainerStyle={leftStyle || null}></HeaderRNE>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    // alignItems: 'baseline',
    marginVertical: 0,
  },
  // headerContainer: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#397af8',
  //   marginBottom: 5,
  //   width: '100%',
  //   paddingVertical: 15,
  // },
});

export default TopNavBar;
