import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import screen_styles from '../dashboard/screens/_screens.styles';
import { palette } from '../variables/_vars';
import c_styles from './_components.styles';

interface WageInputProps {
    onChange: (txt: any) => void,
    currency: string,
    values?: any
}

const WageInput: React.FC<WageInputProps> = ({onChange, currency, values}) => {
  console.log('values : ', values)
  return (
    <View style={c_styles.parent_ipt_frm}>
        <View style={c_styles.icn_ctr}>
        <Text style={c_styles.icn}>
            {currency}
        </Text>
        </View>
        <TextInput style={styles.text_input} onChangeText={e => onChange(e)} value={values.toString()} inputMode='numeric' placeholderTextColor='white' placeholder='Rate'/>
        <View style={c_styles.icn_ctr}>
        <Text style={c_styles.icn}>
            / hr
        </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
    width: '90%'
  },
  prepend: {
    paddingHorizontal: 8,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  append: {
    paddingHorizontal: 8,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#495057',
  },
  text_input: {
    color: 'white',
    padding: 17,
    borderColor: 'white',
    borderWidth: 1,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    paddingLeft: 7,
    flex: 1,
},
});

export default WageInput;
