import { Dimensions, StyleSheet } from "react-native";
import { palette } from "../variables/_vars";

const c_styles = StyleSheet.create({
    balance_c: {
        marginTop: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4%',
    },

    entry_body: {
        alignItems: 'center',
        flex: 1,
        // justifyContent: 'center',
        // backgroundColor: 'green',
    },

    entry_title: {
        fontSize: 22, 
    },

    alert_parent: {
        borderWidth: 1,
        borderRadius: 5,
        width: '80%',
        height: '20%',
        backgroundColor: palette.dark,
        justifyContent: 'center',
        alignItems: 'center',
    },

    stat_parent: {
        backgroundColor: palette.gray,
        borderRadius: 5,
        height: 75,
        alignItems: 'center',
        width: '100%'
    },

    container: {
        width: '90%',
    },

    scroll_jobs: {
        color: 'white',
        borderColor: palette.white,
        borderWidth: 1,
        borderRadius: 7,
    },

    filter_scroll_jobs: {
        color: 'white',
        width: '100%',
        borderRadius: 7,
    },
    scroll_content: {
        alignItems: 'center',
        padding: 10, 
    },
    ind_color: {
        width: 40,  // Adjust this value as needed
        height: 40,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 20,
        marginHorizontal: 5, // Spacing between items
    },

    ind_color_filter: {
        width: 'auto',
        padding: 7,  // Adjust this value as needed
        height: 40,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 20,
        marginHorizontal: 4, // Spacing between items
    },

    icn_ctr: {
        justifyContent: 'center'
    },

    parent_ipt_frm: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    icn: {
        color: palette.white,
        padding: '3%',
    },

    not_yet_view: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },

    not_yet_message: {
        color: palette.white
    },

    tbo_tr: {
        flex: 1,
        justifyContent: 'center',
        padding: '2%',
    },

    tbo_tr2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2%',
    },

    duration: {
        color: 'grey'
    },

    amount: {
        justifyContent: 'flex-end',
        flex: 1,
        textAlign: 'right',
        color: 'green',
    },
    e_title: {
        color: 'white',
        fontWeight: 'bold',
    },

    e_title2: {
        color: 'white',
        marginTop: 10,
        textAlign: 'center'
    },
    e_title3: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    transaction: {
        width: '100%',
        borderRadius: 5,
        height: '30%',
        backgroundColor: '#353839',
        gap: 2,
    },

    balance_txt: {
        color: 'white',
        fontSize: 24
    },

    j_button: {
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flex: 1,
        borderRadius: 5,
        backgroundColor: 'transparent',
        width: '100%'
    },

    job_parent: {
        width: Dimensions.get('window').width * 0.35,
        marginHorizontal: 5,
        borderRadius: 5,
        borderWidth: 1,
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center', 
    },
});

export default c_styles