/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  LayoutRectangle,
  View,
  Text,
  StyleProp,
  TextStyle,
  ViewProps,
  Dimensions,
  ViewStyle,
} from 'react-native';
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
const { width } = Dimensions.get('window');

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);
interface ParamsType extends ViewProps {
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  calloutStyle?: StyleProp<ViewStyle>;
  renderIcon?: React.ReactNode;
  disabled?: boolean;
}
const Callout = ({ text, renderIcon, disabled, textStyle, ...params }: ParamsType) => {
  const animatedValue = useSharedValue(0);
  const componentRef = useRef<TouchableOpacity>(null);
  const [calloutHeight, setCalloutHeight] = useState<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const [componentPosition, setPosition] = useState<any>(null);
  const [isVisible, setVisible] = useState(false);

  setTimeout(() => {
    componentRef.current?.measure((x, y, w, h, px, py) => {
      if (!_.isEqual(componentPosition, { x, y, w, h, px, py }))
        setPosition({ x, y, w, h, px, py });
    });
  }, 1);

  const style = useAnimatedStyle(() => {
    let scale = interpolate(animatedValue.value, [0, 1], [0.98, 1], Extrapolate.CLAMP);
    let opacity = interpolate(animatedValue.value, [0, 1], [0, 1], Extrapolate.CLAMP);
    return { opacity, transform: [{ scale }] };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    let bgOpacity = interpolate(animatedValue.value, [0, 1], [0, 0.5], Extrapolate.CLAMP);
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
      <TouchableOpacity
        disabled={disabled}
        style={styles.btnStyle}
        onPress={onShow}
        ref={componentRef}>
        {renderIcon || <Info width={17} height={17} color={'orange'} />}
      </TouchableOpacity>

      <Modal visible={isVisible} animationType="none" transparent>
        <AnimatedButton
          onPress={onHide}
          activeOpacity={1}
          style={[{ width: '100%', height: '100%' }, backgroundStyle]}>
          {componentPosition && (
            <Animated.View style={[style, params.calloutStyle]}>
              <Animated.View
                onLayout={a => {
                  setCalloutHeight(a.nativeEvent.layout);
                }}
                style={[
                  styles.callout,
                  {
                    top: componentPosition.py - calloutHeight?.height - 14,
                    ...getPosition(calloutHeight, componentPosition),
                  },
                  params.style,
                ]}>
                {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
                {params.children}
              </Animated.View>
              <View
                style={[
                  styles.triangle,
                  {
                    right: componentPosition.px + componentPosition.w / 2 - 14,
                    top: componentPosition.py - calloutHeight?.height - 15 + calloutHeight?.height,
                  },
                ]}
              />
            </Animated.View>
          )}
        </AnimatedButton>
      </Modal>
    </>
  );
};

const getPosition = (layout: LayoutRectangle, iconPosition: any) => {
  if (layout.width - iconPosition.w >= iconPosition.px) return { right: 5 };
  if (layout.width + iconPosition.px >= width)
    return { left: width - (iconPosition.px + iconPosition.w) - 20 };
  return { right: iconPosition.px - 20 };
};
export default Callout;
