import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#17664B',
    paddingLeft: 10,
    paddingBottom: 10,
  },

  input: {
    paddingLeft: 10,
    color: '#000',
    height: hp('5%'),
    borderWidth: 1,
    borderColor: '#17664B',
    borderRadius: 5,
  },

  textError: {
    fontSize: 20,
    color: '#ef2719',
  },
});
