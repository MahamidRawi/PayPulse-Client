// Odometer.tsx
import React from 'react';
import { Easing, StyleSheet, View } from 'react-native';
import AnimatedNumber from 'react-native-animated-numbers';
import { palette } from '../variables/_vars';


interface OdometerProps {
  balance: number;
}

const Odometer: React.FC<OdometerProps> = ({ balance }) => {
  return (
    <View style={styles.container}>
      <AnimatedNumber animateToNumber={balance} includeComma easing={Easing.elastic(2)} animationDuration={2000} fontStyle={styles.odometerText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  odometerText: {
    fontSize: 32,
    color: palette.white,
    fontWeight: 'bold',
  },
});

export default Odometer;
