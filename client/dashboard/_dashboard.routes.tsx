import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './screens/_dashboard.main';
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { palette } from '../variables/_vars';
import { DashboardScreenStack, ProfileScreenStack } from './stacks/_stacks';
import Stats from './statistics/_stats.main';

interface DashboardRoutesProps {}

const DashboardRoutes: React.FC<DashboardRoutesProps> = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Dashboard') {
            return <AntDesign name="home" size={size} color={color} />;
          } else if (route.name === 'Stats') {
            return <MaterialCommunityIcons name="chart-timeline-variant" size={size} color={color} />;
          } else if (route.name === 'User') {
            return <FontAwesome name="user-o" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: 'gray',
        tabBarInactiveTintColor: palette.dark,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 75,
          position: 'absolute',
          backgroundColor: palette.white,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarItemStyle: { marginBottom: -15 },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreenStack} />
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen name="User" component={ProfileScreenStack} />
    </Tab.Navigator>
  );
};

export default DashboardRoutes;
