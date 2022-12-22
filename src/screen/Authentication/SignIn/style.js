import {StyleSheet} from 'react-native';
import {
  brandColors,
  fontScale,
  horizontalScale,
  isIOS,
  verticalScale,
} from '../../../components/Core/basicStyles';

const style = StyleSheet.create({
  viewInner: {
    marginTop: isIOS ? verticalScale(50) : verticalScale(30),
    paddingHorizontal: horizontalScale(20),
  },
  text: {
    fontSize: fontScale(22),
    marginVertical: verticalScale(10),
    fontWeight: '200',
  },
  image: {
    resizeMode: 'contain',
    height: horizontalScale(28),
    width: horizontalScale(28),
  },
  des: {
    fontSize: fontScale(15),
    width: '100%',
    marginVertical: verticalScale(10),
    paddingBottom: verticalScale(10),
    fontWeight: '200',
    color: brandColors.placeHolder,
  },
  checkView: {
    alignItems: 'flex-end',
    paddingHorizontal: horizontalScale(10),
    marginTop: verticalScale(20),
  },
  forgot: {
    padding: 10,
    fontSize: fontScale(15),
    color: brandColors.placeHolder,
  },
  buttonView: {
    paddingBottom: verticalScale(20),
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontSize: fontScale(17),
    color: brandColors.white,
  },
  buttonStyle: {
    backgroundColor: brandColors.buttonColor,
    marginHorizontal: horizontalScale(20),
    alignItems: 'center',
    padding: horizontalScale(10),
    borderRadius: 10,
    shadowOffset: {height: horizontalScale(5), width: horizontalScale(5)},
    shadowOpacity: 0.4,
    shadowRadius: horizontalScale(5),
    elevation: 10,
  },
  account: {
    alignItems: 'center',
    paddingVertical: verticalScale(20),
  },
  bottomText: {
    fontSize: fontScale(15),
    color: brandColors.placeHolder,
  },
  rightTextBottom: {
    color: brandColors.textBlackColor,
    fontSize: fontScale(17),
  },
});

export default style;
