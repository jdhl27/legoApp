import {StyleSheet} from 'react-native';

export const sharedStyles = StyleSheet.create({
  container: currentTheme => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: currentTheme?.background,
  }),
  textRegular: currentTheme => ({
    fontFamily: 'Gilroy-Regular',
    fontSize: 16,
    color: currentTheme?.text,
  }),

  textLight: currentTheme => ({
    fontFamily: 'Gilroy-Light',
    fontSize: 16,
    color: currentTheme?.text,
  }),
  textBold: currentTheme => ({
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
    color: currentTheme?.text,
  }),
  textMedium: currentTheme => ({
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    color: currentTheme?.text,
  }),
  button: currentTheme => ({
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: currentTheme?.primary,
    borderRadius: 10,
    backgroundColor: currentTheme?.primary,
  }),

  buttonText: currentTheme => ({
    color: currentTheme?.secondaryText,
    fontSize: 16,
  }),
});
