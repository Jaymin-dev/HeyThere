import {TouchableOpacity, Keyboard, Text} from 'react-native';

import React from 'react';

const index = ({onClick, style, textStyle, text, disabled = false}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[style, {opacity: disabled ? 0.7 : 1}]}
      onPress={() => {
        Keyboard.dismiss();
        onClick && onClick();
      }}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default index;
