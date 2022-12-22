import {StyleSheet} from 'react-native';
import {verticalScale, horizontalScale, brandColors} from '../Core/basicStyles';
const ICON_SIZE = horizontalScale(20);

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    width: '90%',
    marginTop: verticalScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: brandColors.inputColor,
    height: horizontalScale(45),
    borderRadius: horizontalScale(10),
  },
  textInput: {
    flex: 1,
    fontWeight: '400',
    lineHeight: horizontalScale(20),
    fontSize: horizontalScale(15),
    paddingRight: horizontalScale(10),
    color: '#000',
  },
  iconStyle: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginLeft: horizontalScale(15),
    marginRight: horizontalScale(8),
    lineHeight: horizontalScale(20),
  },
  countryCode: {
    fontWeight: '400',
    lineHeight: horizontalScale(20),
    fontSize: horizontalScale(15),
    paddingRight: horizontalScale(4),
    color: brandColors.placeHolder,
    top: horizontalScale(1),
  },
});

export default styles;
