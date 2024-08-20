import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import { AuthContext } from '../../providers/_auth.provider';
import { getUser } from '../dashboard.actions';
import HOC from '../../components/_hoc';
import screen_styles from '../screens/_screens.styles';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import LoadingScreen from '../../components/_loading.screen';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { palette } from '../../variables/_vars';
import { Stat } from '../../components/_stat.cmpmt';
import { showTabBar } from '../../helpers/_tab.bar.helper';

interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
    const {user, logout} = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<any>();
    const navigation = useNavigation<any>();
    const cnd = Dimensions.get('window').height <= 750

    useFocusEffect(useCallback(() => {
        showTabBar(navigation);
        getUser(user).then((resp: any) => {setUserInfo(resp.info); setLoading(false);}).catch(err => logout());
    }, []));

    return (
        <HOC>
            <View style={[screen_styles.header_c, {justifyContent: 'space-between'}]}>
                <Text style={screen_styles.header_t}>Profile</Text>
                <TouchableOpacity onPress={() => navigation.navigate('edit')}>
                    <AntDesign name="form" color={palette.white} size={20} />
                </TouchableOpacity>
            </View>
            {loading ? <LoadingScreen /> : (
                <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1, paddingBottom: cnd ? 75 : 0}} scrollEnabled={cnd}>
                    <View style={{justifyContent: 'center', width: '100%', alignItems: 'center', marginTop: '10%'}}>
                        <FontAwesome name='user-o' color={palette.white} size={70} />
                    </View>

                    <View style={{flex: 1, marginTop: '10%', padding: '4%', gap: 20}}>
                        <Stat title='Full Name' value={userInfo.name} />
                        <Stat title='Email' value={userInfo.email} />
                        <Stat title='Currency' value={userInfo.currency} />
                        <Stat title='Wallet ID' value={userInfo.walletID} />
                        <Stat title='Account Creation Date' value={userInfo.date} />
                    </View>

                </ScrollView>
            )}
        </HOC>
    )
}

export default ProfileScreen;