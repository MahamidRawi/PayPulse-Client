import React, { useEffect, useState } from "react";
import c_styles from "./_components.styles";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { colors, palette } from "../variables/_vars";
import { AntDesign } from "@expo/vector-icons";

interface CarousselProps {
    onColorSelect: any
    updateConfig?: any
}

const Caroussel: React.FC<CarousselProps> = ({onColorSelect, updateConfig}) => {
    const [selected, setSelected] = useState('');

    const onSelect = (item: string) => {
        onColorSelect(item)
        return setSelected(item);
    }

    useEffect(() => {
        console.log(updateConfig)
        setSelected(updateConfig)
    }, [updateConfig])
    return (
        <View style={c_styles.container}>
        <ScrollView horizontal style={c_styles.scroll_jobs} contentContainerStyle={c_styles.scroll_content}>
            {colors.map(color => (
                <TouchableOpacity key={color} onPress={() => onSelect(color)} style={[c_styles.ind_color, {backgroundColor: color}]}>
                    {selected == color ? <AntDesign size={20} color={palette.white} name="check" /> : null}
                </TouchableOpacity>
            ))}
        </ScrollView>
        </View>
    )
}

export default Caroussel