import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {sharedStyles} from '../../../constants/sharedStyles';
import {useUser} from '../../context/user/UserProvider';
import {getCurrentTheme} from '../../../constants/themes';

const Counter = ({value, onIncrease, onDecrease}) => {
  const {isDarkTheme} = useUser();
  const currentTheme = getCurrentTheme(isDarkTheme);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onDecrease}
        style={styles.button(currentTheme)}>
        <Text style={styles.icon(currentTheme)}>-</Text>
      </TouchableOpacity>
      <Text style={styles.value(currentTheme)}>{value}</Text>
      <TouchableOpacity
        onPress={onIncrease}
        style={styles.button(currentTheme)}>
        <Text style={styles.icon(currentTheme)}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: currentTheme => ({
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: currentTheme?.accent,
    backgroundColor: currentTheme?.accent,
    borderRadius: 10,
    marginHorizontal: 5,
  }),
  value: currentTheme => ({
    marginHorizontal: 10,
    color: currentTheme?.text,
  }),
  icon: currentTheme => ({
    ...sharedStyles.textMedium(currentTheme),
    fontSize: 26,
    color: currentTheme?.secondaryText,
  }),
});

export default Counter;
