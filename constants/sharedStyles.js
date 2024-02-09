// sharedStyles.js
import {StyleSheet} from 'react-native';

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 20,
    fontFamily: 'Gilroy-Regular',
    color: '#333333',
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#3498db',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
