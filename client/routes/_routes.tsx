import React, {useContext, useEffect, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView, Text } from 'react-native';
import { AuthContext } from '../providers/_auth.provider';
import { NavigationContainer } from '@react-navigation/native';
import LoadingScreen from '../components/_loading.screen';
import AuthRoutes from '../auth/_auth.routes';
import DashboardRoutes from '../dashboard/_dashboard.routes';
import * as SplashScreen from 'expo-splash-screen';


interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => {
    const { user, validate } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        SecureStore.getItemAsync('token').then(token => {
            if (token) { validate().then(resp => setLoading(false)).catch(err => setLoading(false)); } else return setLoading(false) }
        ).catch(() => setLoading(false));
    }, [])

    if (loading) return <LoadingScreen />
    
    return (
        <NavigationContainer>
            {user ? <DashboardRoutes />: <AuthRoutes />}
        </NavigationContainer>
    )
}


