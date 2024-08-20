import React, {useState, useEffect, useRef, useContext} from 'react';
import { SafeAreaView, View, Animated, Text, TextInput, TouchableWithoutFeedback, Keyboard, Pressable, Button, TouchableOpacity } from 'react-native';
import { auth_styles } from './_auth.styles';
import { Link, useNavigation, useRoute } from '@react-navigation/native';
import { signIn, signUp } from './_auth.actions';
import { AuthContext } from '../providers/_auth.provider';
import { StatusBar } from 'expo-status-bar';

interface AuthRouteProps {
    route: 'Sign Up' | 'Sign In',
}

type UseParams = {
    email: string,
    password: string
}

export const AuthScreen: React.FC<AuthRouteProps> = ({route}) => {
    const {user, login} = useContext(AuthContext);
    const customText = route == 'Sign In' ? 'Don\'t Have an Account ? Sign Up' : 'Already have an Account ? Sign In';
    const linkText = route == 'Sign In' ? 'signup' : 'signin';
    const splitText = customText.split('?');
    const routeParams = useRoute<any>();
    const navigation = useNavigation<any>();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>(routeParams?.params?.email || '');
    const [password, setPassword] = useState<string>(routeParams?.params?.password || '');
    const [error, setError] = useState<any>('');

    const fadeAnimTitle = useRef(new Animated.Value(0)).current;
    const fadeAnimLinkText = useRef(new Animated.Value(0)).current;
    const fadeAnimInputs = useRef(new Animated.Value(0)).current;
    const fadeAnimButton = useRef(new Animated.Value(0)).current;

    const onAuthAction = async () => {
        try {
            const res: any = route == 'Sign In' ? await signIn(email, password) : await signUp(email, password, name);
        
            if (route == 'Sign In' && res.token) {
                return login(res.token);
            }

            return navigation.navigate('signin', {email, password})
        } catch (err) {
            return setError(err);
        }
    }

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
    }, [fadeAnimTitle, fadeAnimLinkText, fadeAnimInputs, fadeAnimButton, route]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={auth_styles.header_container}>
            <StatusBar style='light' />
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
                        value={email}
                        autoCapitalize='none'
                        onChangeText={(value) => setEmail(value)}
                    />
                    <TextInput
                    value={password}
                        placeholder='Password'
                        placeholderTextColor='white'
                        secureTextEntry={true}
                        style={auth_styles.text_input}
                        onChangeText={(value) => setPassword(value)}
                    />
                    <Text style={{color: 'red', fontSize: 17, alignSelf: 'center'}}>{error}</Text>
                </Animated.View>
                <Animated.View style={{ opacity: fadeAnimButton, width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity style={auth_styles.button} onPress={() => onAuthAction()}>
                        <Text>{route}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
