import {StyleSheet, StatusBar, Platform} from 'react-native';
import {
  brandColors,
  horizontalScale,
  verticalScale,
} from '../../components/Core/basicStyles';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginBottom: verticalScale(60),
  },
  linearGradient: {
    paddingRight: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#cecece',
    backgroundColor: 'transparent',
    marginRight: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  toolKit: {
    height: horizontalScale(40),
    width: horizontalScale(40),
    resizeMode: 'contain',
    borderRadius: horizontalScale(50),
    borderWidth: 2,
    borderColor: brandColors.white,
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowOpacity: 1,
    backgroundColor: 'white',
    elevation: 10,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
});

export default styles;
