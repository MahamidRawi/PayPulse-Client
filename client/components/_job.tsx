import React, { useEffect, useState } from 'react';
import c_styles from './_components.styles';
import { TouchableOpacity, View, Text } from 'react-native';
import { palette } from '../variables/_vars';
import { useNavigation } from '@react-navigation/native';

interface JobProps {
    name: string,
    id: string | number,
    color: string
}

const Job: React.FC<JobProps> = ({name, id, color}) => {
    const [startTime, setStartTime] = useState<Date>();
    const [endTime, setEndTime] = useState<Date>();
    const navigation = useNavigation<any>();

    useEffect(() => console.log('IND ID', id), []);
    
    return (
    <View key={id} style={[c_styles.job_parent, {backgroundColor: color}]}>
        <TouchableOpacity style={c_styles.j_button} onPress={() => navigation.navigate('viewJob', {jobId: id})}>
        <Text style={{textAlign: 'center', color: palette.white}}>{name}</Text>
        </TouchableOpacity>
    </View>
    )
}

export default Job