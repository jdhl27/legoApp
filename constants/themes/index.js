import darkTheme from './dark';
import lightTheme from './light';

export const themes = {
  dark: darkTheme,
  light: lightTheme,
};

export const getCurrentTheme = isDarkMode => {
  return isDarkMode ? themes.dark : themes.light;
};
