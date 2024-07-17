import React, {useContext, useEffect, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, SafeAreaView } from 'react-native';
import { AuthContext } from '../providers/_auth.provider';
import { NavigationContainer } from '@react-navigation/native';
import LoadingScreen from '../components/_loading.screen';
import { AuthScreen } from '../auth/_auth.screens';

interface RoutesProps {}

type AuthParamList = {
    signin: undefined,
    signup: undefined
}

interface SignInProps {}
interface SignUpProps {}

const SignIn: React.FC<SignInProps> = () => {
    return (
        <SafeAreaView>
            <Text>Sign In</Text>
        </SafeAreaView>
    )
}

const SignUp: React.FC<SignUpProps> = () => {
    return (
        <SafeAreaView>
            <Text>Sign Up</Text>
        </SafeAreaView>
    )
}

const Stack = createStackNavigator<AuthParamList>();

const screenoptions = {headerShown: false, cardStyle: {backgroundColor: '#1F1D2F'}}

export const Routes: React.FC<RoutesProps> = () => {
    const {user, validate} = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        SecureStore.getItemAsync('token').then(token => {
            if (token) { validate(); setLoading(false) } else return setLoading(false) }
        ).catch(() => setLoading(false));
    }, [])

    if (loading) {
        return (
            <SafeAreaView style={{flex: 1}}>
                <LoadingScreen />
            </SafeAreaView>
        )
    }
    
    return (
        <NavigationContainer>
            {user ? <View><Text>Hello world</Text></View> : (
                <Stack.Navigator initialRouteName='signup' screenOptions={screenoptions}>
                    <Stack.Screen name='signin' children={() => <AuthScreen route='Sign In' />} />
                    <Stack.Screen name='signup' children={() => <AuthScreen route='Sign Up' />} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}


