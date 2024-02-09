import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {styles} from './styles';

const InputLogin = ({
  onSubmitEditing,
  style,
  placeholder,
  password = false,
  onChangeText,
  messageError = null,
  type = 'default',
  currentTheme,
}) => {
  return (
    <View
      style={
        style
          ? [styles.container(currentTheme), style]
          : styles.container(currentTheme)
      }>
      <TextInput
        keyboardType={type}
        style={styles.input(currentTheme)}
        placeholder={placeholder}
        placeholderTextColor={'#a1a8a6'}
        onChangeText={onChangeText}
        secureTextEntry={password}
        autoCorrect={!password}
        onSubmitEditing={onSubmitEditing}
      />
      {messageError && (
        <Text style={styles.textError(currentTheme)}>{messageError}</Text>
      )}
    </View>
  );
};

export default InputLogin;
