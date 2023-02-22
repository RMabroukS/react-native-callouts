/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';

const calloutStyles = StyleSheet.create({
  callout: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    borderRadius: 10,
    maxWidth: 300,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderLeftWidth: 16,
    borderRightWidth: 16,
    borderTopWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    bottom: -12,
    right: 20,
    position: 'absolute',
  },
  text: { padding: 10 },
  btnStyle: { paddingHorizontal: 10 },
});

export default calloutStyles;
