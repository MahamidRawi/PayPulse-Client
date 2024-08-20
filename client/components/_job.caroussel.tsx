import React, { useEffect, useState } from 'react';
import c_styles from './_components.styles';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { colors, palette } from '../variables/_vars';
import { AntDesign } from '@expo/vector-icons';
import NotYet from './_not.yet';

interface FilterCarousselProps {
    jobs: any,
    onColorSelect: any
}

const FilterCaroussel: React.FC<FilterCarousselProps> = ({jobs, onColorSelect}) => {
    const [selected, setSelected] = useState('');

    const onSelect = (item: string) => {
        onColorSelect(item)
        return setSelected(item);
    }

    console.log('jobs : ', jobs)

    return (
        <View>
        <ScrollView horizontal style={c_styles.filter_scroll_jobs} contentContainerStyle={c_styles.scroll_content}>
            {jobs.length > 0 ? jobs.map((job: any) => (
                <TouchableOpacity key={job.color} onPress={() => onSelect(job.jobId)} style={[c_styles.ind_color_filter, {backgroundColor: selected == job.jobId ? palette.white : job.color}]}>
                    <Text style={{color: palette.dark, fontSize: 12}}>{job.title}</Text>
                </TouchableOpacity>
            )) : <NotYet message='No Current Jobs...' />}
        </ScrollView>
        </View>
    )
}

export default FilterCaroussel