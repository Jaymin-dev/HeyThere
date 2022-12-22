import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, Image, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//components
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import BaseScreen from '../../../components/BaseScreen';
import validator from '../../../utils/validation';
import TokenManager from '../../../utils/TokenManager';

// //redux
// import {register, resetFlags} from '../../../redux/actions/authAction';

// //image
// import {HandShake} from '../../../utils/images';

//style
import styles from './style';
import {HandShake} from '../../../assets/images';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [license, setLicense] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [speciality, setSpeciality] = useState();
  const [qualification, setQualification] = useState();
  const [showPassword, setShowPassword] = useState(true);
  const [deviceToken, setDeviceToken] = useState();

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
          console.log('error',error)
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
  };

  const handleSignInClick = () => navigation.navigate('SignIn');

  const openUrl = url => () => {
    Linking.openURL(url);
  };

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
          textStyle={styles.buttonText}
          onClick={onRegister}
          // onClick={() => navigation.navigate('MyAvailability')}
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
