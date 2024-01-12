import AppModal from '@ui/AppModal';
import colors from '@utils/colors';
import {FC, ReactNode} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

interface Props {
  visible: boolean;
  onRequestClose(): void;
  childNode?: ReactNode;
}

const HomeAlarm: FC<Props> = ({visible, childNode, onRequestClose}) => {
  return (
    <AppModal visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.container}>
        {childNode ? childNode : <Text>HomeAlarm</Text>}
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    position: 'absolute',
  },
  poster: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.CONTRAST,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  duration: {
    color: colors.CONTRAST,
  },
});

export default HomeAlarm;
