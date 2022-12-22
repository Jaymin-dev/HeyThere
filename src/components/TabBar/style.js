import {StyleSheet, Platform} from 'react-native';
import {brandColors, fontScale, horizontalScale} from '../Core/basicStyles';

const style = StyleSheet.create({
  tabContainer: {
    height: horizontalScale(Platform.OS === 'ios' ? 70 : 50),
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    backgroundColor: 'white',
    elevation: 10,
    position: 'absolute',
    bottom: 0,
  },
  slider: {
    height: horizontalScale(2),
    position: 'absolute',
    top: 0,
    left: horizontalScale(8),
    backgroundColor: brandColors.buttonColor,
    borderRadius: horizontalScale(10),
    width: horizontalScale(50),
  },
  text: {
    textAlign: 'center',
    fontSize: fontScale(13),
    fontWeight: 'normal',
  },
  bottomMenuView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: horizontalScale(5),
  },
});
export default style;
