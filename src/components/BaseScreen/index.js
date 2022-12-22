import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './style';

const BaseScreen = ({
  style,
  bounces,
  children,
  title = '',
  icon = false,
  back = false,
  logout = false,
}) => {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const signOutUser = async () => {
    try {
      Alert.alert(
        'User Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              auth()
                .signOut()
                .then(() => console.log('User signed out!'));
            },
          },
        ],
        {cancelable: false},
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        {!!back && <Icon name="back" style={styles.icon} onPress={goBack} />}
        {!!title && <Text style={styles.headerText}>{title}</Text>}
        {!!icon && <Icon name="search1" style={styles.icon} />}
        {!!logout && (
          <Icon name="logout" style={styles.icon} onPress={signOutUser} />
        )}
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.KeyboardAvoidingViewContainerStyle}
        style={styles.KeyboardAvoidingView}
        bounces={bounces}>
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default BaseScreen;
