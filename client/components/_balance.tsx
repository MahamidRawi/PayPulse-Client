import React, { useEffect, useState } from 'react';
import { View, Text, Easing, StyleSheet } from 'react-native';
import c_styles from './_components.styles';
import AnimatedNumber from 'react-native-animated-numbers';
import OdometerAnimation from './_odometer.animation';
import Odometer from './_odometer.animation';
import { palette } from '../variables/_vars';

interface BalanceProps {
    balance: any,
    loading: boolean,
    currency: string
}

const Balance: React.FC<BalanceProps> = ({balance, loading, currency}) => {
  console.log(balance);
  return (
        <View style={styles.container}>
            <Text style={styles.currency}>{currency} </Text>
            <AnimatedNumber animationDuration={2000} easing={Easing.elastic(2)} fontStyle={styles.odometerText}   animateToNumber={balance} includeComma />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: '5%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    currency: {
      fontSize: 32,
      color: palette.white,
      fontFamily: 'tabular-nums',
      fontWeight: 'bold'
    },
    odometerText: {
      fontSize: 32,
      color: palette.white,
      fontWeight: 'bold',
    },
  });

export default Balance