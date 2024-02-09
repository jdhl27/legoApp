import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from './styles';

const InputComponent = ({
  editable = true,
  multiline = false,
  numberOfLines = null,
  styleInput = null,
  value = null,
  placeholder = null,
  title = ' ',
  requiered = false,
  onChangeText,
  type = 'default',
  messageError = null,
  onSubmitEditing = () => null,
}) => {
  return (
    <View>
      {title && (
        <Text style={styles.title}>
          {title}
          {requiered ? '*' : ' '}
        </Text>
      )}
      <TextInput
        editable={editable}
        keyboardType={type}
        multiline={multiline}
        numberOfLines={numberOfLines}
        value={value}
        style={styleInput ? [styles.input, styleInput] : styles.input}
        placeholder={placeholder}
        placeholderTextColor={'#889A94'}
        onChangeText={text => {
          onChangeText(text);
        }}
        onSubmitEditing={onSubmitEditing}
      />
      {messageError && <Text style={styles.textError}>{messageError}</Text>}
    </View>
  );
};

export default InputComponent;
