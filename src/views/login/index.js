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
import {authFirebase, forgotPasswordFirebase} from '../../../firebase/firebase';
import {validateEmail, validatePassword} from '../../utils/utils';

const LoginView = ({navigation}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentTheme = getCurrentTheme(isDarkMode);

  // Data
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [forgotEmail, setForgotEmail] = useState(null);

  // Logic
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const validateData = () => {
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

  const handleLogin = async () => {
    const userState = {
      email,
      password,
    };
    const isAuthSuccessful = await authFirebase(userState);

    if (isAuthSuccessful) {
      const userId = await AsyncStorage.getItem('userId');

      navigation.navigate('Home');
    }
  };

  const sendPasswordReset = async () => {
    // if (forgotEmail.value) {
    const response = await forgotPasswordFirebase('juantest@yopmail.commm');
    if (response) {
      setForgotEmail(null);
      setModalVisible(false);
      Alert.alert('revisar email');
    } else {
      Alert.alert('Correo no registrado');
    }
    // }
  };

  return (
    <View style={styles.container(currentTheme)}>
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
            handleLogin();
          }
        }}
      />
      <ButtonComponent
        style={styles.button}
        text={'Login'}
        onPress={() => {
          if (validateData()) {
            handleLogin();
          }
        }}
      />

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => sendPasswordReset()}>
                <Text style={styles.textStyle}>Olvié password</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </View>
      {/* <Text style={[sharedStyles.text, {color: currentTheme.text}]}>
        (Login) This text uses a Gilroy sand font
      </Text>
      <Text style={[sharedStyles.text, styles.quicksandLight(currentTheme)]}>
        This text uses a Gilroy sand light font
      </Text>
      <Text style={[sharedStyles.text, styles.ralewayItalic(currentTheme)]}>
        This text uses a thin Gilroy Bold font
      </Text>
      <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
        <Text style={{color: currentTheme.text}}>
          Cambiar a {isDarkMode ? 'Light' : 'Dark'} Theme
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Register');
        }}
        style={styles.toggleButton}>
        <Text style={{color: currentTheme.text}}>Olvidé la contraseña</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Register');
        }}
        style={styles.toggleButton}>
        <Text style={{color: currentTheme.text}}>Ir a Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginView;

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
