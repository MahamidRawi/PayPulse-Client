import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import Dashboard from '../screens/_dashboard.main';
import AddJob from '../screens/_add.job';
import ViewJob from '../screens/_view.job';
import ViewEntry from '../screens/_view.entry';
import ViewAll from '../screens/_view.all';
import ProfileScreen from '../profile/profile.screen';
import ProfileEdit from '../profile/_profile.edit';

const DashboardScreenStack: React.FC = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='dash'>
            <Stack.Screen name='dash' component={Dashboard}/>
            <Stack.Screen name='addJob' component={AddJob}/>
            <Stack.Screen name='viewEntry' component={ViewEntry}/>
            <Stack.Screen name='viewJob' component={ViewJob}/>
            <Stack.Screen name="viewAll" component={ViewAll} />
        </Stack.Navigator>
    )
}

const ProfileScreenStack: React.FC = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='profile'>
            <Stack.Screen name='profile' component={ProfileScreen} />
            <Stack.Screen name='edit' component={ProfileEdit} />
        </Stack.Navigator>
    )
}

export {ProfileScreenStack, DashboardScreenStack}