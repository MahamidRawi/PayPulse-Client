import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/_auth.provider';
import { getUser } from '../dashboard.actions';
import HOC from '../../components/_hoc';
import screen_styles from '../screens/_screens.styles';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { generatePieChartData, msToHMS, totalMoneyEarned, totalTimeWorked } from '../../helpers/_tab.bar.helper';
import PieChart from 'react-native-pie-chart';
import { colors, palette } from '../../variables/_vars';
import { useFocusEffect } from '@react-navigation/native';
import { Stat } from '../../components/_stat.cmpmt';

interface StatsProps {}

const Stats: React.FC<StatsProps> = () => {
    const { user, logout } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [totalsArray, setTotalsArray] = useState<number[]>([]);
    const [colorsArray, setColorsArray] = useState<string[]>([]);
    const [titlesArray, setTitlesArray] = useState<string[]>([]);
    const [cc, setCc] = useState<any>();

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true); 

            getUser(user).then((resp: any) => {
                setUserInfo(resp.info);
                const { ts, ca, titlesArray } = generatePieChartData(resp.info);
                setTotalsArray(ts);
                setTitlesArray(titlesArray);
                setColorsArray(ca);
                setCc((totalMoneyEarned(userInfo.entries) / (totalTimeWorked(userInfo.entries) / (60 * 60 * 1000))).toLocaleString());
                setLoading(false);
            }).catch(err => {
                // alert(err);
                err == false && logout()
                setLoading(false);
            });
        }, [user])
    );

    return (
        <HOC>
            <View style={screen_styles.header_c}>
                <Text style={screen_styles.header_t}>Statistics</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}   scrollEnabled={Dimensions.get('window').height <= 750}>
                <View style={styles.pieChartContainer}>
                    {!loading && totalsArray.length > 0 && colorsArray.length > 0 ? (
                        <PieChart
                            widthAndHeight={Dimensions.get('window').width * 0.55}
                            series={totalsArray}
                            sliceColor={colorsArray}
                            coverRadius={0.70}
                            style={{ borderWidth: 1, borderColor: palette.white, borderRadius: Dimensions.get('window').width * 0.55 * 0.5 }}
                        />
                    ) : <Text style={{color: palette.white}}>No Statistics Yet</Text>}
                </View>

                <ScrollView style={styles.labelsContainer} contentContainerStyle={{justifyContent: 'flex-start', }}>
                    {!loading && titlesArray.length > 0 && titlesArray.map((label, idx) => (
                        <View key={idx} style={styles.labelItem}>
                            <View style={[styles.colorBox, { backgroundColor: colorsArray[idx] }]} />
                            <Text style={styles.labelText}>{label}</Text>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.statsContainer}>
                    {!loading && <Stat title='Total Time Worked' value={!loading && msToHMS(totalTimeWorked(userInfo.entries))} />}
                    {!loading && <Stat title='Total Money Earned' value={userInfo.currency + ' ' + totalMoneyEarned(userInfo.entries).toLocaleString()} />}
                    {!loading && <Stat title='Estimated Hourly Worth' value={userInfo.currency + ' ' + (isNaN(cc) ? 0 : null) } />}
                </View>
            </ScrollView>
        </HOC>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 75, // Padding to avoid cut-off by the tab bar
        alignItems: 'center',
        paddingTop: '7%',
    },
    pieChartContainer: {
        height: Dimensions.get('window').width * 0.55,
        width: '100%',
        alignItems: 'center',
    },
    labelsContainer: {
        paddingLeft: Dimensions.get('window').width * 0.04,
        width: '100%',
        maxHeight: Dimensions.get('window').height <= 750 ? 'auto' : 100,
        paddingTop: '1%',
        marginTop: '7%'
    },
    labelItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    colorBox: {
        width: 16,
        height: 16,
        borderRadius: 2,
        marginRight: 8,
    },
    labelText: {
        alignSelf: 'flex-start',
        fontSize: 14,
        color: palette.white,
    },
    statsContainer: {
        width: '100%',
        paddingTop: '5%',
        paddingBottom: '10%',
        gap: 10,
        paddingLeft: '4%',
        paddingRight: '4%',
        justifyContent: 'space-around',
    },
});

export default Stats;
