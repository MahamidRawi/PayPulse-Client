import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';
import { palette } from '../variables/_vars';
import c_styles from './_components.styles';

interface StatProps {
    title: string,
    value: string | number,
}

export const Stat: React.FC<StatProps> = ({title, value}) => {
    return (
<View style={c_styles.stat_parent}>
            <View style={c_styles.tbo_tr}>
            <Text style={c_styles.e_title3}>{title}</Text>
            <Text style={[c_styles.e_title2, title == 'Currency' ? {fontSize: 18} : null]}>{value}</Text>
        </View>
        </View>
    )
}
