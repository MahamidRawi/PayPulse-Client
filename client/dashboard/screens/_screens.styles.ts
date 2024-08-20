import { Dimensions, StyleSheet } from "react-native";
import { palette } from "../../variables/_vars";

const windowWidth = Dimensions.get('window').width;
const tabBarHeight = 10; // Assuming the height of the tab bar is 50

const screen_styles = StyleSheet.create({
    parent_c: {
        flex: 1,
        paddingBottom: tabBarHeight, // Adding bottom padding to account for tab bar
    },

    parent_ctr: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: palette.white
    },

    parent_container_viewAll: {
        width: '100%',
        flex: 1, // Take up available space
        marginTop: '2%',
        paddingLeft: '4%',
        paddingRight: '4%',
    },

    entry_title: {
        marginTop: '10%',
        fontSize: 40, 
        color: palette.white,
        fontWeight: 'bold'
    },

    entryId: {
        marginTop: '2%',
        color: palette.gray,
        fontSize: 10,
    },

    entry_total: {
        marginTop: '15%',
        fontSize: 40, 
        color: palette.white,
        fontWeight: 'bold',
    },

    entry_duration: {
        color: 'white',
    },

    delete_entry: {
        width: '80%',
        height: '30%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'darkred'
    },

    header_c: {
        padding: '4%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
    },

    tools_job_parent: {
        flexDirection: 'row',
        width: '80%',
        alignSelf: 'center',
        paddingBottom: 10,
        marginTop: '15%',
        justifyContent: 'space-between'
    },

    stats_text: {
        color: palette.white
    },

    stats_parent: {
        width: '80%',
        gap: 5,
        borderRadius: 5,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 8
    },

    double_func_button_parent: {
        flex: 1,
    },

    double_func_button: {
        marginTop: '20%',
        gap: 15,
        width: windowWidth * 0.75,
        height: windowWidth * 0.75,
        backgroundColor: palette.white,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: windowWidth * 0.75 * 0.5
    },

    message: {
        textAlign: 'center',
        color: 'red',
        fontSize: 15,
    },

    cta_button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 80,
        borderRadius: 10,
        backgroundColor: palette.white,
    },

    back_button: {
        marginRight: 20,
    },

    input_form: {
        marginTop: 80,
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 80,
        height: '40%'
    },
    text_input: {
        color: 'white',
        padding: 17,
        borderColor: palette.white,
        borderWidth: 1,
        borderRadius: 7,
        paddingLeft: 7,
        width: '90%',
    },

    add_button: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        paddingRight: '4%',
        paddingLeft: '4%',
        width: 'auto',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },

    add_button_text: {
        color: palette.white,
        fontWeight: 'bold',
        fontSize: 25
    },
    p_current_jobs: {
        width: '100%',
        justifyContent: 'space-between',
        paddingRight: '4%',
        paddingTop: '2%',
        paddingBottom: 0,
        // marginTop: '5%',
        flexDirection: 'row'
    },

    lepc_p: {
        width: '100%',
        height: '40%',
        padding: '4%',
        paddingBottom: tabBarHeight, // Adding bottom padding for consistency
    },

    l_e_c: {
        width: '100%',
        marginTop: '4%',
        flexDirection: 'row',
        padding: '4%',
        paddingBottom: 0,
        paddingTop: '10%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    view_more_button: {
        borderRadius: 5,
        display: 'flex',
        backgroundColor: 'white',
        padding: 4,
        right: 0
    },

    clr: {
        color: 'white'
    },

    jobs_c_dash_parent: {
        width: '100%',
        height: '20%',
        marginTop: '2%',
        paddingLeft: '4%',
        paddingRight: '4%',
        paddingBottom: tabBarHeight, // Adding bottom padding for consistency
    },
    
    scroll_jobs: {
        color: 'white',
        borderColor: palette.white,
        borderWidth: 1,
        height: '100%',
        borderRadius: 7,
    },
    scroll_content: {
        alignItems: 'center',
        paddingLeft: 10, 
        paddingRight: 10,
    },

    subheader: {
        color: 'white',
        paddingTop: '4%',
        paddingLeft: '4%'
    },

    job_parent: {
        width: windowWidth * 0.35,
        backgroundColor: palette.white,
        marginHorizontal: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: palette.white,
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center', 
    },

    header_t: {
        color: 'white',
        fontSize: 23
    },

    latest_entries_p_c: {
        width: '100%',
        height: '100%',
        padding: '4%',
        // justifyContent: 'space-evenly',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5
    }
});

export default screen_styles;
