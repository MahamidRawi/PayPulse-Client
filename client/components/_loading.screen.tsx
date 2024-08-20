import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { palette } from '../variables/_vars';

const LoadingScreen: React.FC = () => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: palette.dark }}>
      <Image 
        source={require('../assets/splash.png')} 
        style={{ width: '100%', height: '100%' }} 
        resizeMode="contain"
      />
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
