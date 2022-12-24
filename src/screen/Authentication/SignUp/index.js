import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//components
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import BaseScreen from '../../../components/BaseScreen';
import validator from '../../../utils/validation';

// //image
import {HandShake} from '../../../assets/images';

//style
import styles from './style';

const SignUp = ({navigation}) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const onRegister = () => {
    if (!firstName || !lastName) {
      return alert('Please Enter a firstName  and lastName');
    } else if (
      !validator.email.regEx.test(String(email).toLowerCase()) ||
      !email
    ) {
      return alert('Please Enter a valid email address');
    } else if (password?.length < 8 || !password) {
      return alert(validator.password.error);
    }
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(d => {
        const params = {
          firstName,
          lastName,
          email,
          userId: d.user.uid,
        };
        try {
          firestore()
            .collection('Users')
            .doc(params.userId)
            .set(params)
            .then(() => {
              alert('User account created & signed in!');
              console.log('User added!');
            });
        } catch (error) {
          alert(error);
          console.log('error', error);
        }
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
        }

        console.error(error);
      });
    setLoading(false);
  };

  const handleSignInClick = () => navigation.navigate('SignIn');

  return (
    <BaseScreen>
      <View>
        <View style={styles.viewInner}>
          <Text style={styles.text}>
            {'Welcome To MessageAPP   '}
            <Image source={HandShake} style={styles.image} />
          </Text>
          <Text style={styles.des}>{'Sign up to get started.'}</Text>
        </View>
        <Text style={styles.titleHeaderText}>{'Personal Details*'}</Text>
        <View style={styles.comboInput}>
          <View style={styles.comboInputStyle}>
            <Input
              onChangeText={setFirstName}
              value={firstName}
              placeholder="First Name"
              leftIconType="user"
            />
          </View>
          <View style={styles.comboInputStyle}>
            <Input
              onChangeText={setLastName}
              value={lastName}
              placeholder="Last Name"
              leftIconType="user"
            />
          </View>
        </View>
        <Input
          onChangeText={setEmail}
          value={email}
          placeholder="Enter Email"
          leftIconType="email"
        />

        <Input
          placeholder="Password"
          leftIconType="password"
          onChangeText={setPassword}
          value={password}
          visible={!!password}
          onClick={toggleShowPassword}
          passwordVisible={showPassword}
          secureTextEntry={showPassword === true}
        />
      </View>

      <View style={styles.buttonView}>
        <Button
          disabled={loading}
          textStyle={styles.buttonText}
          onClick={onRegister}
          text="CONTINUE"
          style={styles.button}
        />

        <TouchableOpacity
          onPress={handleSignInClick}
          style={styles.buttonStyle}>
          <Text style={styles.bottomText}>
            {' Already have an account? '}
            <Text style={styles.rightTextBottom}>{' Sign In '}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  );
};

export default SignUp;
