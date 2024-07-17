import React, {useState, useEffect, useRef} from 'react';
import { SafeAreaView, View, Animated, Text, TextInput, TouchableWithoutFeedback, Keyboard, Pressable, Button, TouchableOpacity } from 'react-native';
import { auth_styles } from './_auth.styles';
import { Link } from '@react-navigation/native';

interface AuthRouteProps {
    route: 'Sign Up' | 'Sign In'
}

export const AuthScreen: React.FC<AuthRouteProps> = ({route}) => {
    const customText = route == 'Sign In' ? 'Don\'t Have an Account ? Sign Up' : 'Already have an Account ? Sign In';
    const linkText = route == 'Sign In' ? 'signup' : 'signin';
    const splitText = customText.split('?');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const fadeAnimTitle = useRef(new Animated.Value(0)).current;
    const fadeAnimLinkText = useRef(new Animated.Value(0)).current;
    const fadeAnimInputs = useRef(new Animated.Value(0)).current;
    const fadeAnimButton = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnimTitle, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnimLinkText, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnimInputs, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnimButton, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnimTitle, fadeAnimLinkText, fadeAnimInputs, fadeAnimButton]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={auth_styles.header_container}>
                <Animated.Text style={[auth_styles.header, { opacity: fadeAnimTitle }]}>{route}</Animated.Text>
                <Animated.View style={{ opacity: fadeAnimLinkText }}>
                    <Link to={`/${linkText}`}>
                        <Text style={auth_styles.redirect_text}>{splitText[0]} ?</Text>
                        <Text style={auth_styles.differ}>{splitText[1]}</Text>
                    </Link>
                </Animated.View>
                <Animated.View style={[auth_styles.input_form, { opacity: fadeAnimInputs }]}>
                    {route == 'Sign Up' && (
                        <TextInput
                            placeholder='Full Name'
                            placeholderTextColor='white'
                            style={auth_styles.text_input}
                            onChangeText={(value) => setName(value)}
                        />
                    )}
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor='white'
                        keyboardType='email-address'
                        style={auth_styles.text_input}
                        onChangeText={(value) => setEmail(value)}
                    />
                    <TextInput
                        placeholder='Password'
                        placeholderTextColor='white'
                        secureTextEntry={true}
                        style={auth_styles.text_input}
                        onChangeText={(value) => setPassword(value)}
                    />
                </Animated.View>
                <Animated.View style={{ opacity: fadeAnimButton, width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity style={auth_styles.button} onPress={() => console.log('hello world')}>
                        <Text>{route}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
