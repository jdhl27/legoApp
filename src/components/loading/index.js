import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

import {styles} from './styles';
import {useUser} from '../../context/user/UserProvider';
import {getCurrentTheme} from '../../../constants/themes';

const LoadingComponent = ({loading, children, style = {}}) => {
  const {isDarkTheme} = useUser();
  const currentTheme = getCurrentTheme(isDarkTheme);

  if (loading) {
    return (
      <View style={[styles.container(currentTheme), style]}>
        <View style={styles.overlay}>
          <LottieView
            source={require('../../../assets/animations/loading_lego.json')}
            style={styles.loading}
            autoPlay
            loop
          />
        </View>
      </View>
    );
  }
  return children;
};

export default LoadingComponent;
