import React, { useContext, useEffect, useState } from 'react';
import { getUser } from '../dashboard.actions';
import { AuthContext } from '../../providers/_auth.provider';
import { hideTabBar } from '../../helpers/_tab.bar.helper';
import { useNavigation } from '@react-navigation/native';
import HOC from '../../components/_hoc';
import { MiniHeader } from '../../components/_mini_header';
import { ScrollView, View } from 'react-native';
import Entry from '../../components/_entry';
import screen_styles from './_screens.styles';
import FilterCaroussel from '../../components/_job.caroussel';
import NotYet from '../../components/_not.yet';

interface ViewAllProps {}

const ViewAll: React.FC<ViewAllProps> = () => {
    const { user, logout } = useContext(AuthContext);
    const [entries, setEntries] = useState<Array<any>>([]);
    const [jobs, setJobs] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<Array<any>>([]);
    const [type, setType] = useState<string>('');
    const navigation = useNavigation();

    useEffect(() => {
        getUser(user)
            .then((resp: any) => {
                setEntries(resp.info.entries);
                setJobs(resp.info.jobs);
                setFilter(resp.info.entries);
                setLoading(false);
            })
            .catch(err => logout());
    }, []);

    useEffect(() => {
        if (!type) {
            // If no type (job ID) is selected, show all entries
            setEntries(filter);
        } else {
            // Filter the entries based on the selected job ID (type)
            setEntries(filter.filter((entry: any) => entry.jobId === type));
        }
    }, [type, filter]);

    return (
        <HOC>
            <MiniHeader title='Entries' navigation={navigation} />
            <View style={screen_styles.parent_container_viewAll}>
                {/* Pass the job ID to set the type filter */}
                <FilterCaroussel jobs={!loading && jobs} onColorSelect={(jobID: string) => setType(jobID)} />
                <ScrollView
                    style={screen_styles.parent_ctr}
                    contentContainerStyle={{ flexGrow: 1, gap: 10, paddingTop: 10, paddingBottom: 10, alignItems: 'center' }}
                >
                    {entries.length > 0 ? entries.map((entry: any) => (
                        <Entry
                            key={entry.entryId}
                            addStyle={{ height: 70, width: '95%' }}
                            id={entry.entryId}
                            title={entry.title}
                            time={entry.duration}
                            amount={entry.total}
                            currency={entry.currency}
                        />
                    )) : <NotYet message='No Entries... Yet !' />}
                </ScrollView>
            </View>
        </HOC>
    );
};

export default ViewAll;
