import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { palette } from '../variables/_vars';

interface HOCProps {
    children: any
}

const HOC: React.FC<HOCProps> = ({children}) => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: palette.dark}}>
            <StatusBar barStyle='light-content' />
            {children}
        </SafeAreaView>
    )
}

export default HOC