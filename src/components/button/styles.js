import {StyleSheet} from 'react-native';
import {sharedStyles} from '../../../constants/sharedStyles';

export const styles = StyleSheet.create({
  container: currentTheme => ({
    ...sharedStyles.button(currentTheme),
  }),

  text: (currentTheme, disabled) => ({
    ...sharedStyles.textBold(currentTheme),
    color: disabled ? '#aaa' : '#fff',
    fontSize: 19,
    letterSpacing: 1,
  }),
});
