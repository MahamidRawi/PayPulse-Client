import React, { useState, useEffect, useContext, useMemo } from 'react';
import { AuthContext } from '../../providers/_auth.provider';
import { getUser } from '../dashboard.actions';
import HOC from '../../components/_hoc';
import { useNavigation } from '@react-navigation/native';
import { MiniHeader } from '../../components/_mini_header';
import { hideTabBar } from '../../helpers/_tab.bar.helper';
import { Text, ScrollView, TextInput, StyleSheet, View, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { currencies, palette } from '../../variables/_vars';
import RNPickerSelect from 'react-native-picker-select';
import LoadingScreen from '../../components/_loading.screen';
import { AntDesign } from '@expo/vector-icons';
import { deleteProfile, updateProfile } from './_profile.actions';

interface ProfileEditProps {}

const ProfileEdit: React.FC<ProfileEditProps> = () => {
    const { user, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<{ name: string; email: string; currency: string } | null>(null);
    const navigation = useNavigation();
    const [name, setName] = useState<string>('');
    const [currency, setCurrency] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [deleted, setDeleted] = useState<boolean>(false);

    useEffect(() => {
        hideTabBar(navigation);
        getUser(user)
            .then((resp) => {
                const { name, currency } = resp.info;
                setUserInfo(resp.info);
                setName(name);
                setCurrency(currency);
                setLoading(false);
            })
            .catch((err: any) => {
                setError(`Error : ${err}`)
                logout();
            });
    }, []);

    const onUpdate = () => {
        setError('');
        setSuccess(false);
        if (!name || !currency) return setError('Please Don\'t Leave Empty Fields')
        updateProfile(name, currency).then(resp => {
            setSuccess(true);
            setTimeout(() => {
                navigation.goBack();
            }, 1000);
        }).catch(err => err == false ? logout() : setError(err));
    }

    const onDelete = () => deleteProfile().then(resp => {setDeleted(true); setTimeout(() => logout(), 1000)}).catch(err => err == false ? logout() : alert(`An Error has Occured ${err}`));
    

    const pickerItems = useMemo(
        () =>
            currencies.map((currency) => ({
                label: `${currency.currency} - ${currency.symbol}`,
                value: currency.symbol,
            })),
        []
    );

    if (loading) {
        return <LoadingScreen />;
    }

    if (!userInfo) {
        return null; 
    }

    return (
        <HOC>
            <MiniHeader title="Profile Edit" navigation={navigation} />
            <ScrollView style={styles.container} contentContainerStyle={{gap: 50, justifyContent: 'center', paddingBottom: Dimensions.get('window').height <= 750 ? 75 : null, flexGrow: 1}}>
                <TextInput
                    placeholder="Full Name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    placeholderTextColor={palette.white}
                    accessibilityLabel="Full Name Input"
                />
                <TextInput
                    placeholder="Email"
                    value={userInfo.email}
                    editable={false}
                    placeholderTextColor={palette.white}
                    style={styles.input}
                    accessibilityLabel="Email Input"
                />
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        onValueChange={setCurrency}
                        value={currency}
                        items={pickerItems}
                        placeholder={{
                            label: `Current: ${currency}`,
                            value: '',
                            color: palette.white,
                        }}
                        style={{
                            ...pickerSelectStyles,
                            placeholder: { color: palette.white },
                        }}
                    />
                </View>
                <View style={{width: '100%', alignItems: 'center'}}>
                    <Text style={{color: 'red'}}>{error}</Text>
                </View>
                <View style={{gap: 30}}>
                <TouchableOpacity style={{width: '90%', height: 65, alignSelf: 'center', alignItems: 'center', justifyContent: 'center',  backgroundColor: palette.white, borderRadius: 5}} onPress={onUpdate}>
                    <Text style={{fontSize: 18}}>{success ? <AntDesign name='check' size={18} /> : 'Save'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={{width: '90%', height: 40, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'darkred', borderRadius: 5}}>
                    <Text style={{fontSize: 15, color: palette.white}}>{deleted ? <AntDesign name='check' size={15} color={palette.white} /> : (<><AntDesign name='delete' size={15} color={palette.white}/> Delete Account</>)}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => logout()} style={{width: '90%', height: 40, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'darkred', borderRadius: 5}}>
                    <Text style={{fontSize: 15, color: palette.white}}><AntDesign name='logout' size={15} color={palette.white}/> Log Out</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </HOC>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.dark || '#000',
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: palette.white,
        color: palette.white,
        borderRadius: 4,
        padding: 12,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 16,
        backgroundColor: palette.dark,
    },
    pickerContainer: {
        marginBottom: 16,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: palette.white,
        borderRadius: 4,
        color: palette.white,
        width: '90%',
        alignSelf: 'center',
        paddingRight: 30, // to ensure the text is not truncated
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: palette.white,
        borderRadius: 4,
        color: palette.white,
        paddingRight: 30, // to ensure the text is not truncated
    },
    placeholder: {
        color: palette.white,
        fontSize: 16,
    },
});

export default ProfileEdit;
