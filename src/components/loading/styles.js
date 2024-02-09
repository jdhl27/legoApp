import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: currentTheme => ({
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: currentTheme?.background,
  }),
  loading: {
    width: 200,
    height: 200,
  },
});
