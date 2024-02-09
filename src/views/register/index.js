import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getCurrentTheme} from '../../../constants/themes';
import InputComponent from '../../components/input';
import ButtonComponent from '../../components/button';
import {authFirebase, registerUserFirebase} from '../../../firebase/firebase';
import {validateEmail, validatePassword} from '../../utils/utils';

const RegisterView = ({navigation}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentTheme = getCurrentTheme(isDarkMode);

  // Data
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);

  // Logic
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const validateData = () => {
    if (!name) {
      setErrorName(true);
      return false;
    }

    if (!validateEmail(email)) {
      setErrorEmail(true);
      return false;
    }

    // if (!validatePassword(password)) {
    //   setErrorPassword(true);
    //   return false;
    // }
    return true;
  };

  const handleRegister = async () => {
    const userState = {
      name,
      phone,
      email,
      password,
    };
    const isRegisterSuccessful = await registerUserFirebase(userState);

    if (isRegisterSuccessful) {
      const userId = await AsyncStorage.getItem('userId');

      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container(currentTheme)}>
      <InputComponent
        style={errorName ? styles.errorInput : null}
        icon={'user'}
        placeholder={'Name'}
        onChangeText={text => {
          setName(text);
          setErrorName(false);
        }}
      />
      <InputComponent
        icon={'user'}
        placeholder={'Phone'}
        onChangeText={text => {
          setPhone(text);
          setErrorEmail(false);
        }}
      />
      <InputComponent
        type="email-address"
        messageError={
          errorEmail && email ? 'Este no es un correo electrónico válido' : null
        }
        style={errorEmail ? styles.errorInput : null}
        icon={'user'}
        placeholder={'Email'}
        onChangeText={text => {
          setEmail(text);
          setErrorEmail(false);
        }}
      />
      <InputComponent
        style={errorPassword ? styles.errorInput : null}
        password={true}
        icon={'lock'}
        placeholder={'Password'}
        onChangeText={text => {
          setPassword(text);
          setErrorPassword(false);
        }}
        onSubmitEditing={() => {
          if (validateData()) {
            handleRegister();
          }
        }}
      />
      <ButtonComponent
        style={styles.button}
        text={'Registrar'}
        onPress={() => {
          if (validateData()) {
            handleRegister();
          }
        }}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}
        style={styles.toggleButton}>
        <Text style={{color: currentTheme.text}}>Ir a login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterView;

const styles = StyleSheet.create({
  container: currentTheme => ({
    backgroundColor: currentTheme.background,
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  }),
  quicksandLight: currentTheme => ({
    fontFamily: 'Gilroy-Light',
    color: currentTheme.text,
  }),
  ralewayItalic: currentTheme => ({
    fontFamily: 'Gilroy-Bold',
    color: currentTheme.text,
  }),
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
