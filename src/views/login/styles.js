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

  imageContainer: {
    position: 'absolute',
    top: 80,
    right: 15,
  },

  image: {
    width: 40,
    height: 40,
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

  textRecoverPassword: currentTheme => ({
    ...sharedStyles.textLight(currentTheme),
    fontSize: 14,
    textAlign: 'right',
    letterSpacing: 1,
  }),

  buttonLogin: {
    marginVertical: 40,
  },

  centeredView: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: currentTheme => ({
    width: '95%',
    backgroundColor: currentTheme?.secondaryBackground,
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }),

  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },

  textTitleModal: currentTheme => ({
    ...sharedStyles.textBold(currentTheme),
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 10,
  }),

  containerTextRegister: currentTheme => ({
    ...sharedStyles.textMedium(currentTheme),
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
    width: '50%',
  }),

  textRegister: currentTheme => ({
    ...sharedStyles.textBold(currentTheme),
    fontSize: 16,
    color: currentTheme?.primary,
  }),
});
