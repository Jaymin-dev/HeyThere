import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

//components
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import BaseScreen from '../../../components/BaseScreen';
import validator from '../../../utils/validation';

//style
import styles from './style';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const OnSave = async () => {
    if (!validator.email.regEx.test(String(email).toLowerCase()) || !email) {
      return alert('Please add valid email');
    }
    setLoading(true);
    try {
      await auth().sendPasswordResetEmail(email.trim());
      alert('Reset password link is send to your email 😊 !!');
      setLoading(false);
      onClickHandler();
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  const onClickHandler = () => {
    navigation.goBack();
  };

  return (
    <BaseScreen
      leftButtonType={'back-arrow'}
      onLeftPress={onClickHandler}
      title="Forgot Password"
      titleStyle={styles.titleStyle}
      styles={styles.container}>
      <View style={styles.mainView}>
        <Input
          placeholder="Email Id"
          onChangeText={setEmail}
          value={email}
          leftIconType="email"
        />
        <Text style={styles.bottomText}>
          Reset Password Instructions will be sent to your email address.
        </Text>
        <View style={styles.buttonView}>
          <Button
            disabled={loading}
            onClick={OnSave}
            text="SUBMIT"
            textStyle={styles.buttonText}
            style={styles.buttonStyle}
          />
        </View>
      </View>
    </BaseScreen>
  );
};

export default ForgotPassword;
