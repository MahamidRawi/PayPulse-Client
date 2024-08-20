import React, { useState, useEffect, useContext, useRef } from 'react';
import HOC from '../../components/_hoc';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MiniHeader } from '../../components/_mini_header';
import { deleteEntry, getEntry, getUser } from '../dashboard.actions';
import { AuthContext } from '../../providers/_auth.provider';
import c_styles from '../../components/_components.styles';
import { hideTabBar, msToHMS } from '../../helpers/_tab.bar.helper';
import LoadingScreen from '../../components/_loading.screen';
import screen_styles from './_screens.styles';
import { palette } from '../../variables/_vars';
import { AntDesign } from '@expo/vector-icons';

interface ViewEntryProps {}

const ViewEntry: React.FC<ViewEntryProps> = () => {
    const {logout, user} = useContext(AuthContext);
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const [entry, setEntry] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<any>();
    const [success, setSuccess] = useState<boolean>(false);

    const fadeAnimTitle = useRef(new Animated.Value(0)).current;
    const fadeAnimId = useRef(new Animated.Value(0)).current;
    const fadeAnimTotal = useRef(new Animated.Value(0)).current;
    const fadeAnimDuration = useRef(new Animated.Value(0)).current;
    const fadeAnimButton = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        console.log(route.params.id);
        getEntry(route.params.id).then(res => {
            getUser(user).then(resp => {
                setUserInfo(resp.info);
                console.log(res);
                setEntry(res);
                hideTabBar(navigation);
                setLoading(false);

                // Start the animations in sequence
                Animated.sequence([
                    Animated.timing(fadeAnimTitle, { toValue: 1, duration: 500, useNativeDriver: true }),
                    Animated.timing(fadeAnimId, { toValue: 1, duration: 500, useNativeDriver: true }),
                    Animated.timing(fadeAnimTotal, { toValue: 1, duration: 500, useNativeDriver: true }),
                    Animated.timing(fadeAnimDuration, { toValue: 1, duration: 500, useNativeDriver: true }),
                    Animated.timing(fadeAnimButton, { toValue: 1, duration: 500, useNativeDriver: true })
                ]).start();

            }).catch(err => logout());
        }).catch(err => {
            console.log(err);
            if (err == false) return logout();
            alert('An Error has Occurred');
            setLoading(false);
        });
    }, [fadeAnimTitle, fadeAnimId, fadeAnimTotal, fadeAnimDuration, fadeAnimButton]);

    const onDelete = async () => {
        try {
            deleteEntry(route.params.id);
            setSuccess(true)
            setTimeout(() => navigation.navigate('dash'), 1000);
        } catch (err) {
            if (err == false) return logout();
            return alert(`An Error has Occured : ${err}`);
        }
    }

    return (
        loading ? <LoadingScreen /> : (
        <HOC>
            <MiniHeader title='Entry' navigation={navigation} />
            <View style={c_styles.entry_body}>
                <Animated.Text style={[screen_styles.entry_title, { opacity: fadeAnimTitle, textAlign: 'center' }]}>
                    {entry.title}
                </Animated.Text>
                <Animated.Text style={[screen_styles.entryId, { opacity: fadeAnimId }]}>
                    {entry.entryId}
                </Animated.Text>
                <Animated.Text style={[screen_styles.entry_total, { opacity: fadeAnimTotal }]}>
                    {entry.total.toFixed(2)} {userInfo.currency}
                </Animated.Text>
                <Animated.Text style={[screen_styles.entry_duration, { opacity: fadeAnimDuration }]}>
                    {msToHMS(entry.duration)}
                </Animated.Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <Animated.View style={{ opacity: fadeAnimButton, width: '100%', height: 150, alignItems: 'center' }}>
                    <TouchableOpacity disabled={success} style={screen_styles.delete_entry} onPress={onDelete}>
                        <Text style={{color: palette.white}}>{!success ? 'Delete Entry' : <AntDesign name='check' color={palette.white} size={20} />}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </HOC>
        )
    )
}

export default ViewEntry;
