import {StyleSheet} from 'react-native';
import {sharedStyles} from '../../../constants/sharedStyles';

export const styles = StyleSheet.create({
  container: currentTheme => ({
    flex: 1,
    backgroundColor: currentTheme?.background,
  }),
  containerPadding: {
    paddingHorizontal: 18,
  },
  title: currentTheme => ({
    ...sharedStyles.textBold(currentTheme),
    letterSpacing: 2,
    fontSize: 33,
    width: '72%',
    marginTop: 35,
  }),
  containerProducts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
  },
});
