import {Platform, StyleSheet} from 'react-native';
import {sharedStyles} from '../../../constants/sharedStyles';

export const styles = StyleSheet.create({
  container: currentTheme => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: currentTheme?.background,
    backgroundColor: currentTheme?.background,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 15 : 6,
    marginVertical: 10,
  }),

  input: currentTheme => ({
    flex: 1,
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 1,
    fontSize: 16,
    marginLeft: 10,
    color: currentTheme?.text,
  }),

  textError: currentTheme => ({
    ...sharedStyles.textLight(currentTheme),
    fontSize: 14,
    color: currentTheme?.error,
  }),
});
