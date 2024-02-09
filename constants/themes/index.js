import darkTheme from './dark';
import lightTheme from './light';

export const themes = {
  dark: darkTheme,
  light: lightTheme,
};

export const getCurrentTheme = isDarkMode => {
  return isDarkMode ? themes.dark : themes.light;
};

export const gradientDark = [
  'rgba(44,60,124,1)',
  'rgba(42,52,94,1)',
  'rgba(24,29,49,1)',
];

export const gradientLight = [
  'rgba(255,255,255,1)',
  'rgba(239,241,255,1)',
  'rgba(194,205,255,1)  ',
];
