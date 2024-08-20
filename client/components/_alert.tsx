import React, { useState, useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import c_styles from './_components.styles';
import { AntDesign } from '@expo/vector-icons';
import { palette } from '../variables/_vars';

interface AppAlertProps {
    message: string,
    type: 'Warning' | 'Success' | 'Fail',
    onDismiss?: () => void,
    visible: boolean, // New prop to control visibility
}

const AppAlert: React.FC<AppAlertProps> = ({ message, type, onDismiss, visible }) => {
    const opacity = useRef(new Animated.Value(0)).current; // For fade in
    const slideAnim = useRef(new Animated.Value(-100)).current; // For slide from top

    useEffect(() => {
        if (visible) {
            // Reset the animation values when the alert is triggered
            opacity.setValue(0);
            slideAnim.setValue(-100);

            // Trigger the slide-in and fade-in animations
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();

            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const closeAlert = () => {
        // Slide out and fade out before unmounting
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: -100, // Slide out upwards
                duration: 500,
                useNativeDriver: true,
            })
        ]).start(() => {
            if (onDismiss) {
                onDismiss();
            }
        });
    };

    if (!visible) return null;

    return (
        <Animated.View 
            style={[
                c_styles.alert_parent, 
                { 
                    borderColor: type === 'Fail' ? 'darkred' : type === 'Success' ? 'green' : 'orange',
                    opacity: opacity, // for fade in/out
                    transform: [{ translateY: slideAnim }], // for slide from top
                    position: 'absolute', // absolute positioning
                    top: '8%', // align at the top
                    gap: 50,
                    left: Dimensions.get('window').width * 0.1, // center horizontally
                    width: Dimensions.get('window').width * 0.8, // take 80% of the width
                    zIndex: 999, // ensure it overlays other components
                }
            ]}
        >
            <Text style={{color: 'white', fontSize: 18}}>{message}</Text>
            <TouchableOpacity style={{padding: 20, paddingTop: 0, paddingBottom: 0,}} onPress={closeAlert}>
                <Text style={{color: 'white', fontSize: 18}}>Close</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

export default AppAlert;
