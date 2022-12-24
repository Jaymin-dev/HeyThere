import {StyleSheet, StatusBar, Platform} from 'react-native';
import {
  brandColors,
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../components/Core/basicStyles';

const styles = StyleSheet.create({
  baseScreen: {
    backgroundColor: brandColors.white,
    flex: 1,
  },
  messageWrapper: {
    flexDirection: 'row',
    backgroundColor: brandColors.white,
    marginHorizontal: horizontalScale(15),
    marginVertical: verticalScale(5),
    shadowOffset: {height: horizontalScale(5), width: horizontalScale(5)},
    shadowOpacity: 0.4,
    shadowRadius: horizontalScale(5),
    elevation: 10,
    padding: 13,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  avtar: {
    width: horizontalScale(40),
    height: horizontalScale(40),
    borderRadius: horizontalScale(40),
    marginRight: horizontalScale(10),
  },
  nameText: {
    fontSize: fontScale(16),
    fontWeight: '600',
  },
  flexRow: {
    flexDirection: 'row',
  },
  messageText: {
    maxWidth: '80%',
    fontSize: fontScale(13),
    fontWeight: '400',
    color: brandColors.gray,
    marginTop: verticalScale(4),
  },
  container: {
    flex: 1,
    color: brandColors.black,
  },
});

export default styles;
