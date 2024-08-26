import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, Text, ActivityIndicator, Alert, Dimensions } from 'react-native';
import HOC from '../../components/_hoc';
import screen_styles from './_screens.styles';
import Balance from '../../components/_balance';
import Job from '../../components/_job';
import NotYet from '../../components/_not.yet';
import { getUser } from '../dashboard.actions';
import { AuthContext } from '../../providers/_auth.provider';
import Entry from '../../components/_entry';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { hideTabBar, showTabBar } from '../../helpers/_tab.bar.helper';
import { palette } from '../../variables/_vars';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const { user, logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>(0);
  const navigation = useNavigation<any>();

  const loadUserData = async () => {
    try {
      setLoading(true);
      const res = await getUser(user);
      console.log(res);
      if (res?.info) {
        setUserInfo(res.info);
        setBalance(res.info.balance);
      }
    } catch (err) {
      if (err === false) logout();
    } finally {
      setTimeout(() => setLoading(false), 10000);
    }
  };

  

  useFocusEffect(
    React.useCallback(() => {
      showTabBar(navigation);
      loadUserData();
    }, [navigation])
  );

  const onViewMore = () => {
    hideTabBar(navigation);
    return setTimeout(() => navigation.navigate('viewAll'), 100);
  }

  const onAddJob = () => navigation.navigate('addJob');

  return (
    <HOC>
      <View style={screen_styles.header_c}>
        <Text style={screen_styles.header_t}>Dashboard</Text>
      </View>

      <Balance balance={balance} loading={loading} currency={userInfo?.currency || '$'} />

      <View style={screen_styles.p_current_jobs}>
        <Text style={screen_styles.subheader}>Current jobs</Text>
        <TouchableOpacity style={screen_styles.add_button} onPress={onAddJob}>
          <Text style={screen_styles.add_button_text}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={screen_styles.jobs_c_dash_parent}>
        {userInfo?.jobs?.length > 0 ? (
          <ScrollView
            horizontal
            scrollsToTop={loading}
            style={screen_styles.scroll_jobs}
            contentContainerStyle={[
              screen_styles.scroll_content,
              { justifyContent: 'flex-start' },
            ]}
          >
            {userInfo.jobs.map((job: any, index: number) => (
              <Job key={index} color={job.color} name={job.title} id={job.jobId} />
            ))}
          </ScrollView>
        ) : (
          <View style={[screen_styles.scroll_jobs, { justifyContent: 'center' }]}>
            <Text style={{ textAlign: 'center', color: 'white' }}>No Current Jobs...</Text>
          </View>
        )}
      </View>

      <View style={screen_styles.l_e_c}>
        <Text style={screen_styles.clr}>Latest Entries</Text>
        <TouchableOpacity style={screen_styles.view_more_button} onPress={onViewMore}>
          <Text>View More</Text>
        </TouchableOpacity>
      </View>

      <View style={screen_styles.lepc_p}>
      <ScrollView 
  style={[screen_styles.latest_entries_p_c]} 
  scrollEnabled={Dimensions.get('window').height <= 750}
  contentContainerStyle={{
    flexGrow: 1,
    justifyContent: userInfo?.entries?.length < 3 ? 'center' : 'flex-start', // Adjusting justification
    gap: 10,
    paddingBottom: 20 // Adding padding at the bottom to prevent cut-off by tab bar
  }}
>
  {userInfo?.entries?.length > 0 ? (
    userInfo.entries.reverse().slice(0, 3).map((entry: any, idx: number) => (
      <Entry
        key={idx}
        currency={entry.currency}
        amount={entry.total}
        title={entry.title}
        time={entry.duration}
        id={entry.entryId}
        addStyle={{height: 70}}
      />
    ))
  ) : (
    <NotYet message="No Entries... Yet!" />
  )}
</ScrollView>

      </View>
    </HOC>
    
  );
};

export default Dashboard;
