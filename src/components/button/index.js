import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

const ButtonComponent = ({
  text,
  onPress,
  style,
  styleText,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={style ? [styles.container, style] : styles.container}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styleText ? [styles.text, styleText] : styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
