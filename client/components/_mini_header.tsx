import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import screen_styles from '../dashboard/screens/_screens.styles';
import { palette } from '../variables/_vars';

interface MiniHeaderProps {
    title: string,
    navigation: any
    addStyle?: any
}

export const MiniHeader: React.FC<MiniHeaderProps> = ({title, navigation, addStyle}) => {
    return (
        <View style={[screen_styles.header_c, addStyle]}>
                <TouchableOpacity style={screen_styles.back_button} onPress={() => navigation.goBack()}>
                    <AntDesign color={palette.white} size={22} name='left' />
                </TouchableOpacity>
                <Text style={screen_styles.header_t}>{title}</Text>
            </View>
    )
}