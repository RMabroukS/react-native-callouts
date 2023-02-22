/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { Modal, TouchableOpacity, View, Text, StyleProp, TextStyle } from 'react-native';
import _ from 'lodash';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styles from './styles';
import Info from './icon';

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const Callout = ({ text, textStyle }: { text: string; textStyle?: StyleProp<TextStyle> }) => {
  const animatedValue = useSharedValue(0);
  const componentRef = useRef<TouchableOpacity>(null);
  const [calloutHeight, setCalloutHeight] = useState(0);
  const [componentPosition, setPosition] = useState<any>(null);
  const [isVisible, setVisible] = useState(false);

  setTimeout(() => {
    componentRef.current?.measure((x, y, w, h, px, py) => {
      if (!_.isEqual(componentPosition, { x, y, w, h, px, py }))
        setPosition({ x, y, w, h, px, py });
    });
  }, 1);

  const style = useAnimatedStyle(() => {
    let scale = interpolate(animatedValue.value, [0, 1], [0.9, 1], Extrapolate.CLAMP);
    let opacity = interpolate(animatedValue.value, [0, 1], [0, 1], Extrapolate.CLAMP);
    return { transform: [{ scale }], opacity };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    let bgOpacity = interpolate(animatedValue.value, [0, 1], [0, 0.4], Extrapolate.CLAMP);
    return { backgroundColor: `rgba(0,0,0,${bgOpacity})` };
  });

  const onHide = () => {
    animatedValue.value = withTiming(0, {}, finished => {
      if (finished) runOnJS(setVisible)(false);
    });
  };
  const onShow = () => {
    setVisible(true);
    animatedValue.value = withTiming(1);
  };
  return (
    <>
      <TouchableOpacity style={styles.btnStyle} onPress={onShow} ref={componentRef}>
        <Info width={15} height={15} color={'#626E7C'} />
      </TouchableOpacity>

      <Modal visible={isVisible} animationType="none" transparent>
        <AnimatedButton
          onPress={onHide}
          activeOpacity={1}
          style={[{ width: '100%', height: '100%' }, backgroundStyle]}>
          {componentPosition && (
            <Animated.View
              onLayout={a => setCalloutHeight(a.nativeEvent.layout.height)}
              style={[
                styles.callout,
                {
                  top: componentPosition.py - calloutHeight - 15,
                  right: componentPosition.px + componentPosition.w / 2 - 36,
                },
                style,
              ]}>
              <Text style={[styles.text, textStyle]}>{text}</Text>
              <View style={styles.triangle} />
            </Animated.View>
          )}
        </AnimatedButton>
      </Modal>
    </>
  );
};

export default Callout;
