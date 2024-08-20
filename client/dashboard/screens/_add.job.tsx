import React, {useState, useEffect, useContext} from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import HOC from '../../components/_hoc';
import { useNavigation, useRoute } from '@react-navigation/native';
import { hideTabBar } from '../../helpers/_tab.bar.helper';
import screen_styles from './_screens.styles';
import WageInput from '../../components/_wage.inputs';
import { addJob, getUser, updateJob } from '../dashboard.actions';
import { AuthContext } from '../../providers/_auth.provider';
import Caroussel from '../../components/_caroussel';
import { AntDesign } from '@expo/vector-icons';
import { palette } from '../../variables/_vars';
import AppAlert from '../../components/_alert';

interface AddJobProps {}

const AddJob: React.FC<AddJobProps> = () => {
    const {user, logout} = useContext(AuthContext);
    const navigation = useNavigation<any>();
    const [wage, setWage] = useState<number | string>('');
    const [userInfo, setUserInfo] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [color, setColor] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [update, setUpdate] = useState<boolean>(false);
    const route = useRoute<any>();

    useEffect(() => {
        hideTabBar(navigation);
        getUser(user).then(u => { 
            setUserInfo(u.info);
            if (route?.params?.update) {
                console.log(route.params)
                setTitle(route.params.title);
                setWage(route.params.wage);
                setColor(route.params.color);
                setUpdate(true)
            }
            return setLoading(false);
        }
        ).catch(err => logout());
    }, []);

    const onUpdate = async () => {
        const newJob = {
            title, rate: wage, color
        }

        try {
        
            await updateJob(newJob, route.params.id);
            setSuccess(true);
            setTimeout(() => {return navigation.navigate('viewJob', {jobId: route.params.id})}, 1500)
        } catch (err:any) {
            if (err.auth == true) return logout();
            return setMessage(err.message.msg)
        } 
    }

    const onSubmit = async () => {
        setLoading(true);
        setMessage('');
        const job = {
            title,
            rate: wage,
            color
        }
        try {
            await addJob(job);
            setSuccess(true);
            setLoading(false);
            setTimeout(() => navigation.navigate('dash'), 1000)
        } catch (err: any) {
            if (err.auth) return logout();
            setMessage(err.message);
            return setLoading(false);
        }
    }


    return (
        <HOC>
            <ScrollView scrollEnabled={Dimensions.get('window').height < 750 ? true : false}>
            <View style={[screen_styles.header_c, {marginBottom: 80}]}>
                <TouchableOpacity style={screen_styles.back_button} onPress={() => navigation.goBack()}>
                    <AntDesign color={palette.white} size={22} name='left' />
                </TouchableOpacity>
                <Text style={screen_styles.header_t}>{update? title : 'Add Job'}</Text>
            </View>
            <View style={screen_styles.input_form}>
                <TextInput style={[screen_styles.text_input, {marginTop: 100}]} value={title} onChangeText={(txt) => setTitle(txt)} placeholderTextColor='white' placeholder='Job Title' />
                <WageInput values={wage} currency={!loading ? userInfo.currency : '...'} onChange={(txt) => setWage(txt)} />
                <Caroussel updateConfig={color} onColorSelect={(clr: string) => setColor(clr)}/>
                <Text style={screen_styles.message}>
                    {message}                </Text>
                <TouchableOpacity disabled={loading || success} style={screen_styles.cta_button} onPress={() => update ? onUpdate() : onSubmit()}>
                    {!success ? (<Text>
                        {update ? 'Save' : 'Add Job'}
                    </Text>) : <AntDesign name='check' size={25} />}
                </TouchableOpacity>
            </View>
            </ScrollView>
        </HOC>
    )
}

export default AddJob