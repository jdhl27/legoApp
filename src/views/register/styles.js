import {StyleSheet} from 'react-native';
import {sharedStyles} from '../../../constants/sharedStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  gradient: {
    flex: 1,
    justifyContent: 'center',
  },

  containerForm: {
    paddingHorizontal: 25,
  },

  textTitle: currentTheme => ({
    ...sharedStyles.textBold(currentTheme),
    fontSize: 27,
    marginBottom: 30,
    textAlign: 'center',
  }),

  buttonRegister: {
    marginVertical: 30,
  },

  containerTextLogin: currentTheme => ({
    ...sharedStyles.textMedium(currentTheme),
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
    width: '50%',
  }),

  textLogin: currentTheme => ({
    ...sharedStyles.textBold(currentTheme),
    fontSize: 16,
    color: currentTheme?.primary,
  }),
});
