import colors from '@utils/colors';
import {FC, ReactNode, useEffect} from 'react';
import {Pressable} from 'react-native';
import {Dimensions} from 'react-native';
import {Modal} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  children: ReactNode;
  visible: boolean;
  onRequestClose(): void;
  animation?: boolean;
}

const {height} = Dimensions.get('window');

const modalHeight = height - 150;

const AppModal: FC<Props> = ({
  children,
  visible,
  animation,
  onRequestClose,
}) => {
  const translateY = useSharedValue(modalHeight);
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      if (e.translationY <= 0) return;

      translateY.value = e.translationY;
    })
    .onFinalize(e => {
      if (e.translationY <= modalHeight / 2) translateY.value = 0;
      else {
        translateY.value = modalHeight;
        runOnJS(onRequestClose)();
      }
    });

  useEffect(() => {
    if (visible)
      translateY.value = withTiming(0, {duration: animation ? 200 : 0});
  }, [visible, animation]);

  return (
    <Modal onRequestClose={onRequestClose} visible={visible} transparent>
      <GestureHandlerRootView style={{flex: 1}}>
        <Pressable onResponderEnd={onRequestClose} style={styles.backdrop} />
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.modal, translateStyle]}>
            {children}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.INACTIVE_CONTRAST,
  },
  modal: {
    backgroundColor: colors.gray1,
    height: modalHeight,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
});

export default AppModal;
