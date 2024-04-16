import {FC, ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SubMenuDiv from '@ui/SubMenuDiv';
import colors from '@utils/colors';

interface Props<T> {
  leftCompot?: ReactNode;
  centComport?: ReactNode;
  rightCompot?: ReactNode;
  contStyle?: StyleProp<ViewStyle>;
  leftStyle?: StyleProp<ViewStyle>;
  subItems?: T[];
}

const TopNavBar = <T extends any>({
  leftCompot,
  centComport,
  rightCompot,
  contStyle,
  leftStyle,
  subItems,
}: Props<T>) => {
  return (
    <>
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
    </>
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
