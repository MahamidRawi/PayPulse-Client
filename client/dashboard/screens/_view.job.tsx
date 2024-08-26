import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { formatDate, hideTabBar, msToHMS, showTabBar } from "../../helpers/_tab.bar.helper";
import HOC from "../../components/_hoc";
import { ActivityIndicator, Alert, Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import screen_styles from "./_screens.styles";
import { AuthContext } from "../../providers/_auth.provider";
import { deleteJob, finishJob, getJob, getUser, startJob } from "../dashboard.actions";
import LoadingScreen from "../../components/_loading.screen";
import Balance from "../../components/_balance";
import { palette } from "../../variables/_vars";
import { AntDesign } from "@expo/vector-icons";
import { MiniHeader } from "../../components/_mini_header";
import { Stat } from "../../components/_stat.cmpmt";
import AppAlert from "../../components/_alert";

interface ViewJobProps {}

const ViewJob: React.FC<ViewJobProps> = () => {
    const { logout, user } = useContext(AuthContext);
    const route = useRoute<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [time, setTime] = useState<number>(0);
    const navigation = useNavigation<any>();
    const timeRef = useRef<number>(0);
    const [ongoing, setOngoing] = useState<boolean>();
    const [userInfo, setUser] = useState<any>({});
    const intervalRef = useRef<any>(null);
    const [stats, setStats] = useState<any>();
    const [showAlert, setShowAlert] = useState(false);
const [alertMessage, setAlertMessage] = useState<string>('');
const [alertType, setAlertType] = useState<'Warning' | 'Success' | 'Fail'>('Fail');


    navigation.addListener('focus', () => hideTabBar(navigation));

    const [job, setJob] = useState<any>(null);

    useFocusEffect(useCallback(() => {
        const fetchJob = async () => {
          try {
            console.log('JOB ID : ', route.params.jobId);
            const res = await getJob(route.params.jobId);
            setJob(res.job);
            setStats(res.stats);
    
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
    
            if (res.job.sttc.started) {
                setOngoing(true);
                intervalRef.current = setInterval(() => {
                    timeRef.current = Date.now() - res.job.sttc.timeStarted;
                    const hoursWorked = timeRef.current / (1000 * 60 * 60); // Convert ms to hours
                    setTime(hoursWorked * res.job.rate); // Multiply by rate
                }, 2000);
            }
            setLoading(false);
          } catch (err: any) {
            if (err.auth) {
              logout();
            } else {
              Alert.alert('Error', `An Error has Occurred: ${err}`);
            }
          }
        };
    
        const fetchUser = async () => {
            try {
                const userFound = await getUser(user);
                setUser(userFound.info);
            } catch (err: any) {
                if (err.auth) logout();
                Alert.alert('Error', `An Error has Occurred: ${err}`);
            }
        }
    
        fetchUser();
        fetchJob();
    
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setJob(null);
        };
    }, []));
    
    const onStartJob = async () => {
        setLoading(true);
        try {
            const startingDate = Date.now();
            const newJobObj = await startJob(route.params.jobId, startingDate);
            setJob(newJobObj);
            setLoading(false);
    
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
    
            setOngoing(true);
            intervalRef.current = setInterval(() => {
                timeRef.current = Date.now() - newJobObj.sttc.timeStarted;
                const hoursWorked = timeRef.current / (1000 * 60 * 60); // Convert ms to hours
                setTime(hoursWorked * newJobObj.rate); // Multiply by rate
            }, 2000);
        } catch (err: any) {
            if (err.auth) return logout();
            return Alert.alert('Error', `An Error has Occurred: ${err}`);
        }
    };
    

    const onFinishJob = async () => {
        setLoading(true);
    try {
        const newJobObj = await finishJob(route.params.jobId);
        setJob(newJobObj)

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setOngoing(false);
        setLoading(false);
    } catch (err: any) {
        if (err.auth) return logout();
        return Alert.alert('Error', `An Error has Occurred: ${err}`);
    }
    }
    
    const onDeleteJob = async () => {
        if (ongoing) return false;
        try {
            await deleteJob(job.jobId);
            setAlertMessage('Job Deleted Successfully');
            setAlertType('Success');
            setShowAlert(true);
            setTimeout(() => navigation.navigate('dash'), 1500)
        } catch (err: any) {
            if (err == false) return logout();
            setAlertMessage(err);
            setAlertType('Fail');
            setShowAlert(true);
        }
    }

    const onEdit = () => navigation.navigate('addJob', {update: true, id: job.jobId, color: job.color, wage: job.rate, title: job.title})

    return (
        loading && job == null ? (
            <View 
                style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    backgroundColor: palette.dark,
                    zIndex: 100 
                }}
            >
                <ActivityIndicator size="large" color="#fff" />
            </View>
        ) : (
            <HOC>
                <ScrollView scrollEnabled={Dimensions.get('window').height <= 750}>
                {job && (
                    <>
                        {showAlert && (
                            <AppAlert visible={showAlert} onDismiss={() => setShowAlert(false)} message={alertMessage} type={alertType} />
                        )}
                        <MiniHeader title={job.title} navigation={navigation} />
                        <View style={screen_styles.double_func_button_parent}>
                            <TouchableOpacity
                            disabled={loading} 
                                style={[screen_styles.double_func_button, {backgroundColor: job.color}]} 
                                onPress={ongoing ? onFinishJob : onStartJob}
                            >
                                { ongoing && <Balance loading={loading} currency={userInfo.currency} balance={time} />}
                                <Text style={{fontSize: ongoing ? 15 : 24}}>
                                    {!job.sttc.started ? 'Clock In' : `Clock Out`}
                                </Text>
                            </TouchableOpacity>
                            <View style={screen_styles.tools_job_parent}>
                                <TouchableOpacity disabled={ongoing} onPress={onEdit}>
                                    <AntDesign name="form" color={ongoing ? 'grey' : 'white'} size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity disabled={ongoing} onPress={onDeleteJob}>
                                    <AntDesign name="delete" color={ongoing ? 'darkred' : 'red'} size={20} />
                                </TouchableOpacity>
                            </View>
                            <View style={screen_styles.stats_parent}>
                                <Stat title="Time Worked" value={msToHMS(stats + timeRef.current)} />
                                <Stat title="Money Generated" value={`${userInfo.currency} ${((stats / (60 * 60 * 1000)) * job.rate + time).toFixed(2)}`} />
                                <Stat title="Date of Creation" value={formatDate(job.date)} />
                            </View>
                        </View>
                    </>
                )}
                
                </ScrollView>
            </HOC>
        )
    );
    

}

export default ViewJob