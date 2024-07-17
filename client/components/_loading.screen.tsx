import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet, Text } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

const LoadingScreen: React.FC = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Svg height="100" width="100" viewBox="0 0 64 64">
          <Circle cx="32" cy="32" r="30" stroke="#FFD700" strokeWidth="2" fill="#FFD700" />
          <Rect x="27" y="27" width="10" height="10" fill="white" />
        </Svg>
      </Animated.View>
      <Text style={styles.text}>Loading MoneyTime...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#333333',
    fontFamily: 'Helvetica Neue', // Use a modern font
  },
});

export default LoadingScreen;