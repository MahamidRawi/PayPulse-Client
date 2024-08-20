import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import c_styles from './_components.styles';
import { FaAngleRight } from "react-icons/fa";
import { RightOutlined } from '@ant-design/icons';
import { AntDesign } from '@expo/vector-icons';
import { palette } from '../variables/_vars';
import { msToHMS } from '../helpers/_tab.bar.helper';
import { useNavigation } from '@react-navigation/native';


interface EntryProp {
    title: string,
    amount: number,
    id: number,
    time: number,
    currency: string, 
    addStyle?: any
}

const Entry: React.FC<EntryProp> = ({addStyle, title, amount, id, time, currency}) => {
    const navigation = useNavigation<any>();

    return (
        <View style={[c_styles.transaction, addStyle]}>
            <TouchableOpacity style={c_styles.tbo_tr} onPress={() => navigation.navigate('viewEntry', {id})}>
            <Text style={c_styles.e_title}>{title}</Text>
            <Text style={c_styles.amount}>+ {currency}{amount.toLocaleString()} <AntDesign name='right' color={palette.white}/></Text>
            <Text style={c_styles.duration}>{msToHMS(time)}</Text>
        </TouchableOpacity>
        </View>
    )
}

export default Entry