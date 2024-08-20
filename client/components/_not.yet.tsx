import React from 'react';
import { View, Text } from 'react-native';
import c_styles from './_components.styles';

interface NotYetProps {
    message: string
}

const NotYet: React.FC<NotYetProps> = ({message}) => {
    return (
        <View style={c_styles.not_yet_view}>
            <Text style={c_styles.not_yet_message}>{message}</Text>
        </View>
    )
}

export default NotYet;