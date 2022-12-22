import {StyleSheet} from 'react-native';
import {
  brandColors,
  fontScale,
  horizontalScale,
  verticalScale,
} from '../Core/basicStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.white,
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  KeyboardAvoidingViewContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: brandColors.white,
    marginTop: verticalScale(40),
    marginHorizontal: horizontalScale(15),
    paddingBottom: verticalScale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  headerText: {
    fontSize: fontScale(20),
    fontWeight: '600',
  },
  icon: {
    fontSize: fontScale(20),
  },
});
export default styles;
