/* eslint-disable react-native/no-color-literals */
import { StyleSheet ,Dimensions} from 'react-native';
const {width}=Dimensions.get('screen')
const calloutStyles = StyleSheet.create({
  callout: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    borderRadius: 10,
    minWidth: 100,
    maxWidth: width-40
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderTopWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    bottom: -12,
    right: 20,
    position: 'absolute',
  },
  text: {
     padding: 10 
  },
  btnStyle: {
     paddingHorizontal: 0
  },
});

export default calloutStyles;
