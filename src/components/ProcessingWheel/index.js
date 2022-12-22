import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {brandColors} from '../Core/basicStyles';

class Processing extends Component {
  render() {
    const {isProcessing, size = 'large'} = this.props;
    if (!isProcessing) {
      return null;
    }
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <ActivityIndicator
            size={size}
            animating
            color={brandColors.barColor}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: brandColors.transparentBlackColor,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  wrapper: {
    height: 80,
    width: 80,
    backgroundColor: brandColors.whiteColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = ({system: {isProcessing = false}} = {}) => ({
  isProcessing,
});

export default connect(mapStateToProps, null)(Processing);
