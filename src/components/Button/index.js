import React from 'react';
import {TouchableOpacity, Keyboard, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

// Core style and colors
import {brandColors} from '../Core/basicStyles';

const index = ({onClick, style, textStyle, text, disabled = false}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        style,
        {
          opacity: disabled ? 0.7 : 1,
          flexDirection: 'row',
          justifyContent: 'center',
        },
      ]}
      onPress={() => {
        Keyboard.dismiss();
        onClick && onClick();
      }}>
      <Text style={textStyle}>{text}</Text>
      {disabled && (
        <ActivityIndicator
          size="small"
          style={{marginLeft: 10}}
          color={brandColors.timeColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default index;
