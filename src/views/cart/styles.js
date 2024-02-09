import {StyleSheet} from 'react-native';
import {sharedStyles} from '../../../constants/sharedStyles';

export const styles = StyleSheet.create({
  container: currentTheme => ({
    flex: 1,
    backgroundColor: currentTheme.background,
  }),
  productItemCart: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: currentTheme => ({
    ...sharedStyles.textBold(currentTheme),
    fontSize: 30,
    marginBottom: 20,
  }),
  name: currentTheme => ({
    ...sharedStyles.textBold(currentTheme),
  }),
  price: currentTheme => ({
    ...sharedStyles.textRegular(currentTheme),
    marginVertical: 10,
  }),
  containerTotal: {
    height: 150,
    justifyContent: 'flex-end',
  },
  total: currentTheme => ({
    ...sharedStyles.textBold(currentTheme),
    marginVertical: 10,
    fontSize: 27,
    alignSelf: 'flex-end',
  }),
  containerAnimation: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  },

  emptyAnimation: {
    width: 200,
    height: 200,
  },

  containerPadding: {
    paddingHorizontal: 18,
    marginTop: 20,
  },
  containerSwipeIcocn: {
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  iconDelete: {
    marginLeft: 25,
  },

  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productInfo: {
    width: 100,
  },
});
