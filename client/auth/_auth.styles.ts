import { StyleSheet } from "react-native";
import { palette } from "../variables/_vars";

export const auth_styles = StyleSheet.create({
    header_container: {
        alignItems: 'center'
    },
    header: {
        color: palette.white,
        fontSize: 45,
        marginTop: '7%',
        marginBottom: '5%',
    },
    redirect_text: {
        fontSize: 15,
        color: palette.white,
        marginBottom: '5%'
    },

    button: {
        backgroundColor: palette.white,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 7
    },

    input_form: {
        marginTop: '5%',
        flexDirection: 'column',
        width: '90%',
        justifyContent: 'center',
        gap: 80,
        height: '65%'
    },

    text_input: {
        color: 'white',
        padding: 17,
        borderColor: palette.white,
        borderWidth: 1,
        borderRadius: 7,
        paddingLeft: 7
    },

    differ: {
        color: '#A9A9A9'
    }
})