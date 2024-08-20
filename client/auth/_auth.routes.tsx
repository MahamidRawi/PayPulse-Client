import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthScreen } from './_auth.screens';
import { palette } from '../variables/_vars';

interface AuthRoutesProps {}

const AuthRoutes: React.FC<AuthRoutesProps> = () => {
    const Stack = createStackNavigator();

    const screenoptions = {headerShown: false, cardStyle: {backgroundColor: palette.dark}}

    return (
        <Stack.Navigator initialRouteName='signup' screenOptions={screenoptions}>
            <Stack.Screen name='signin' children={() => <AuthScreen route='Sign In' />} />
            <Stack.Screen name='signup' children={() => <AuthScreen route='Sign Up' />} />
        </Stack.Navigator>
    )
}

export default AuthRoutes