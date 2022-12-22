import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

//components
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Utils from '../../../utils/Utils';
import BaseScreen from '../../../components/BaseScreen';
import validator from '../../../utils/validation';

//redux
import {forgotPassword, resetFlags} from '../../../redux/actions/authAction';

//style
import styles from './style';

const ForgotPassword = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const OnSave = () => {
    if (!validator.email.regEx.test(String(email).toLowerCase()) || !email) {
      return Utils.showErrorToast('Please add valid email');
    }
    dispatch(forgotPassword({email: email.trim(), type: 'doctor'}));
  };

  const {errors, flags} = useSelector(({auth}) => auth);

  useEffect(() => {
    const error = errors && errors.forgotPassword;
    if (error) {
      Utils.showErrorToast(error);
      dispatch(resetFlags());
    }
    if (flags && flags.forgotPasswordSuccess) {
      dispatch(resetFlags());
      return navigation.navigate('SignIn');
    }
  }, [errors, flags]);

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
