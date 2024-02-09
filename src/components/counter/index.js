import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Counter = ({value, onIncrease, onDecrease}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDecrease} style={styles.button}>
        <Text>-</Text>
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity onPress={onIncrease} style={styles.button}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  value: {
    marginHorizontal: 10,
  },
});

export default Counter;
