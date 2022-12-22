import React, {useRef, useEffect} from 'react';
import {TextInput, View, Text} from 'react-native';
import {brandColors, fontScale, horizontalScale} from '../Core/basicStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesomeIco from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const ICON_SIZE = horizontalScale(20);
const ICON_SIZE_SMALL = horizontalScale(20);

import styles from './style';

const index = ({
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  style,
  textInputStyle,
  visible,
  editable,
  passwordVisible,
  maxlength,
  leftIconType,
  onClick,
  mic,
  countryCode,
  blurOnSubmit,
  multiline = false,
  keyboardType = 'default',
  inputRef,
  onSubmitEditing,
}) => {
  const inputElementRef = useRef(null);

  useEffect(() => {
    if (!inputRef) {
      inputElementRef.current.setNativeProps({
        style: {fontWeight: '400'},
      });
    }
  }, []);

  const getIcon = type => {
    switch (type) {
      case 'call':
        return (
          <Ionicons
            name="ios-call-outline"
            style={styles.iconStyle}
            size={ICON_SIZE}
            color={brandColors.placeHolder}
          />
        );
      case 'user':
        return (
          <Feather
            name="user"
            size={ICON_SIZE_SMALL}
            style={styles.iconStyle}
            color={brandColors.placeHolder}
          />
        );
      case 'password':
        return (
          <SimpleLineIcons
            name="lock"
            style={styles.iconStyle}
            size={ICON_SIZE}
            color={brandColors.placeHolder}
          />
        );
      case 'back-arrow':
        return (
          <Entypo
            name="chevron-small-left"
            style={styles.iconStyle}
            size={ICON_SIZE}
            color={brandColors.placeHolder}
          />
        );
      case 'email':
        return (
          <Fontisto
            name="email"
            style={styles.iconStyle}
            size={ICON_SIZE}
            color={brandColors.placeHolder}
          />
        );

      case 'search':
        return (
          <EvilIcons
            name="search"
            style={styles.iconStyle}
            size={ICON_SIZE}
            color={brandColors.placeHolder}
          />
        );

      case 'location':
        return (
          <SimpleLineIcons
            name="location-pin"
            size={ICON_SIZE_SMALL}
            style={styles.iconStyle}
            color={brandColors.gray}
          />
        );
      case 'graduation':
        return (
          <SimpleLineIcons
            name="graduation"
            size={ICON_SIZE_SMALL}
            style={styles.iconStyle}
            color={brandColors.gray}
          />
        );

      case 'book':
        return (
          <Feather
            name="book"
            size={ICON_SIZE_SMALL}
            style={styles.iconStyle}
            color={brandColors.placeHolder}
          />
        );

      case 'money':
        return (
          <FontAwesome
            name="money"
            size={ICON_SIZE_SMALL}
            style={styles.iconStyle}
            color={brandColors.placeHolder}
          />
        );
      default:
        return <View />;
    }
  };

  return (
    <View style={[styles.view, style]}>
      {getIcon(leftIconType)}
      {countryCode && <Text style={styles.countryCode}>+91</Text>}
      <TextInput
        ref={inputRef || inputElementRef}
        style={[styles.textInput, textInputStyle]}
        value={value}
        blurOnSubmit={!blurOnSubmit}
        placeholderTextColor={brandColors.placeHolder}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
        autoCorrect={false}
        placeholder={placeholder}
        autoCapitalize="none"
        editable={editable}
        maxLength={maxlength}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        keyboardType={keyboardType}
        textContentType={'oneTimeCode'}
        onSubmitEditing={onSubmitEditing}
      />
      {visible ? (
        <FontAwesomeIco
          name={passwordVisible ? 'eye-slash' : 'eye'}
          size={fontScale(18)}
          onPress={() => {
            onClick();
          }}
          style={{
            paddingHorizontal: horizontalScale(10),
            color: brandColors.gray,
          }}
        />
      ) : null}
      {mic && (
        <Ionicons
          name={'mic-outline'}
          size={fontScale(21)}
          onPress={() => {
            onClick();
          }}
          style={{
            paddingHorizontal: horizontalScale(10),
            color: brandColors.gray,
          }}
        />
      )}
    </View>
  );
};

export default index;
