import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';

//components
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import BaseScreen from '../../../components/BaseScreen';
import validator from '../../../utils/validation';

//image
import {HandShake} from '../../../assets/images';

//style
import styles from './style';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [deviceToken, setDeviceToken] = useState();

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const onLogin = () => {
    if (
      (!validator.email.regEx.test(String(email).toLowerCase()) || !email) &&
      !validator.phone.regEx.test(email)
    ) {
      return alert(validator.email.error);
    } else if (password?.length < 8 || !password) {
      return alert(validator.password.error);
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert('User account created & signed in!');
      })
      .catch(error => {
        alert(error);
        // if (error.code === 'auth/email-already-in-use') {
        //   alert('That email address is already in use!');
        // }

        // if (error.code === 'auth/invalid-email') {
        //   alert('That email address is invalid!');
        // }

        console.error(error);
      });
  };

  const handleSignUpClick = () => navigation.navigate('SignUp');

  return (
    <BaseScreen>
      <View>
        <View style={styles.viewInner}>
          <Text style={styles.text}>
            {'Welcome Back'}
            <Image source={HandShake} style={styles.image} />
          </Text>
          <Text style={styles.des}>{'Sign in to get started.'}</Text>
        </View>

        <Input
          placeholder="Phone number or email"
          onChangeText={setEmail}
          value={email}
          leftIconType="call"
        />

        <Input
          placeholder="Password"
          leftIconType="password"
          onChangeText={setPassword}
          value={password}
          visible={!!password}
          onClick={toggleShowPassword}
          passwordVisible={showPassword}
          secureTextEntry={!!showPassword}
        />

        <View style={styles.checkView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonView}>
        <Button
          onClick={onLogin}
          text="SIGN IN"
          textStyle={styles.buttonText}
          style={styles.buttonStyle}
        />
        <TouchableOpacity onPress={handleSignUpClick} style={styles.account}>
          <Text style={styles.bottomText}>
            {" Don't have an account? "}
            <Text style={styles.rightTextBottom}>{' Sign Up '}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  );
};

export default SignIn;
