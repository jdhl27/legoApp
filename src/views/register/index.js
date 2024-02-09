import {Alert, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import {registerUserFirebase} from '../../../firebase/firebase';
import {useUser} from '../../context/user/UserProvider';
import {
  getCurrentTheme,
  gradientDark,
  gradientLight,
} from '../../../constants/themes';
import InputComponent from '../../components/input';
import ButtonComponent from '../../components/button';
import {validateEmail} from '../../utils/utils';
import {styles} from './styles';
import {CommonActions} from '@react-navigation/native';

const RegisterView = ({navigation}) => {
  const {isDarkTheme, setUserData} = useUser();
  const currentTheme = getCurrentTheme(isDarkTheme);

  // Data
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);

  // Logic
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateData = () => {
    if (!name || name === null) {
      setErrorName(true);
      return false;
    }

    if (!validateEmail(email)) {
      setErrorEmail(true);
      return false;
    }

    if (!password || password === null) {
      setErrorPassword(true);
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    setIsLoading(true);
    const userState = {
      name,
      phone,
      email,
      password,
    };
    const isRegisterSuccessful = await registerUserFirebase(userState);

    if (isRegisterSuccessful) {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setUserData({...JSON.parse(user)});
      }

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
      setIsLoading(false);
    } else {
      setIsLoading(false);
      Alert.alert('Something went wrong', 'Review the data');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isDarkTheme ? gradientDark : gradientLight}
        style={styles.gradient}>
        <View style={styles.containerForm}>
          <Text style={styles.textTitle(currentTheme)}>Sign up to enjoy</Text>
          <InputComponent
            messageError={errorName && name ? 'This name is incorrect' : null}
            placeholder={'Enter Name'}
            onChangeText={text => {
              setName(text);
              setErrorName(false);
            }}
            currentTheme={currentTheme}
          />
          <InputComponent
            placeholder={'Enter Phone'}
            onChangeText={text => {
              setPhone(text);
            }}
            currentTheme={currentTheme}
          />
          <InputComponent
            type="email-address"
            messageError={
              errorEmail && email ? 'This email is incorrect' : null
            }
            placeholder={'Enter Email'}
            onChangeText={text => {
              setEmail(text);
              setErrorEmail(false);
            }}
            currentTheme={currentTheme}
          />
          <InputComponent
            messageError={
              errorPassword && password ? 'This password is incorrect' : null
            }
            password={true}
            placeholder={'• • • • • • •'}
            onChangeText={text => {
              setPassword(text);
              setErrorPassword(false);
            }}
            onSubmitEditing={() => {
              if (validateData()) {
                handleRegister();
              }
            }}
            currentTheme={currentTheme}
          />
          <ButtonComponent
            disabled={isLoading}
            style={styles.buttonRegister}
            text={isLoading ? 'Processing...' : 'Register'}
            onPress={() => {
              if (validateData()) {
                handleRegister();
              }
            }}
            currentTheme={currentTheme}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.containerTextLogin(currentTheme)}>
              If you have an account you can{' '}
              <Text style={styles.textLogin(currentTheme)}>Login here!</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default RegisterView;
