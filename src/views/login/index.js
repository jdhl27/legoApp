import {Alert, Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getCurrentTheme,
  gradientDark,
  gradientLight,
} from '../../../constants/themes';
import InputComponent from '../../components/input';
import ButtonComponent from '../../components/button';
import {authFirebase, forgotPasswordFirebase} from '../../../firebase/firebase';
import {validateEmail} from '../../utils/utils';
import {useUser} from '../../context/user/UserProvider';
import moonImage from '../../../assets/images/moon.png';
import sunImage from '../../../assets/images/sun.png';
import {styles} from './styles';
import {CommonActions} from '@react-navigation/native';

const LoginView = ({navigation}) => {
  const {isDarkTheme, setUserData} = useUser();
  const currentTheme = getCurrentTheme(isDarkTheme);

  // Data
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [forgotEmail, setForgotEmail] = useState(null);

  // Logic
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailRecover, setErrorEmailRecover] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = () => {
    setUserData({isDarkTheme: !isDarkTheme});
  };

  const validateData = () => {
    if (!validateEmail(email) || email === null) {
      setErrorEmail(true);
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const userState = {
      email,
      password,
    };
    const isAuthSuccessful = await authFirebase(userState);

    if (isAuthSuccessful) {
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

  const sendPasswordReset = async () => {
    if (forgotEmail) {
      const response = await forgotPasswordFirebase(forgotEmail);
      if (response) {
        closeModal();
        Alert.alert('It stayed!', 'Please check the email');
      } else {
        Alert.alert('Unregistered email');
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setForgotEmail(null);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isDarkTheme ? gradientDark : gradientLight}
        style={styles.gradient}>
        <TouchableOpacity
          onPress={() => toggleTheme()}
          style={styles.imageContainer}>
          <Image
            source={isDarkTheme ? moonImage : sunImage}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.containerForm}>
          <Text style={styles.textTitle(currentTheme)}>Sign in to enjoy</Text>
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
                handleLogin();
              }
            }}
            currentTheme={currentTheme}
          />
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textRecoverPassword(currentTheme)}>
              Recover Password ?
            </Text>
          </TouchableOpacity>
          <ButtonComponent
            disabled={isLoading}
            style={styles.buttonLogin}
            text={isLoading ? 'Processing...' : 'Login'}
            onPress={() => {
              if (validateData()) {
                handleLogin();
              }
            }}
            currentTheme={currentTheme}
          />
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            closeModal();
          }}
          onBackdropPress={() => closeModal()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView(currentTheme)}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <IconFontisto
                  name={'close-a'}
                  size={15}
                  color={currentTheme?.reverseColor}
                />
              </TouchableOpacity>
              <Text style={styles.textTitleModal(currentTheme)}>
                I will send you an email
              </Text>
              <InputComponent
                type="email-address"
                messageError={
                  errorEmailRecover ? 'This email is incorrect' : null
                }
                placeholder={'Enter email for recover'}
                onChangeText={text => {
                  setForgotEmail(text);
                  setErrorEmailRecover(false);
                }}
                currentTheme={currentTheme}
              />
              <ButtonComponent
                disabled={isLoading}
                text={'Send'}
                onPress={() => {
                  if (!validateEmail(forgotEmail) || forgotEmail === null) {
                    setErrorEmailRecover(true);
                  } else {
                    sendPasswordReset();
                  }
                }}
                currentTheme={currentTheme}
              />
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={styles.containerTextRegister(currentTheme)}>
            if you don’t an account you can{' '}
            <Text style={styles.textRegister(currentTheme)}>
              Register here!
            </Text>
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default LoginView;
