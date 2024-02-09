import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import LottieView from 'lottie-react-native';

const ButtonComponent = ({
  text,
  onPress,
  style,
  styleText,
  disabled = false,
  currentTheme,
}) => {
  return (
    <TouchableOpacity
      style={
        style
          ? [styles.container(currentTheme), style]
          : styles.container(currentTheme)
      }
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={
          styleText
            ? [styles.text(currentTheme, disabled), styleText]
            : styles.text(currentTheme, disabled)
        }>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
