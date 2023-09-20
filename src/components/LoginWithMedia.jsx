import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useContext } from "react"

import { UserContext } from "../context/UserContext"

import { AppleIcon } from "../assets/icons/AppleIcon"
import { FabebookIcon } from "../assets/icons/FacebookIcon"
import { GoogleIcon } from "../assets/icons/GoogleIcon"

import { signInWithGoogle } from "../services/auth/signInWithGoogle"

import { useNavigation } from "@react-navigation/native"
import { globalStyles } from "../assets/globalStyles"

export const LoginWithMedia = ({ isToShowJustIcon }) => {
    const navigation = useNavigation()

    const { setUserData } = useContext(UserContext)

    return (
        <>
            {
                isToShowJustIcon ?
                    (
                        <View style={styles.contentIcons}>
                            <TouchableOpacity style={styles.buttonJustIcon} onPress={() => signInWithGoogle(navigation, setUserData)}>
                                <GoogleIcon />
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.buttonJustIcon, styles.buttonDisabled, { marginHorizontal: 15 }]} disabled={true}>
                                <FabebookIcon />
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.buttonJustIcon, styles.buttonDisabled]} disabled={true}>
                                <AppleIcon />
                            </TouchableOpacity>
                        </View>
                    ) :
                    (
                        <>
                            <TouchableOpacity style={styles.button} onPress={() => signInWithGoogle(navigation, setUserData)}>
                                <GoogleIcon />
                                <Text style={styles.text}>Continue com o Google</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, styles.buttonDisabled]} disabled={true}>
                                <FabebookIcon />
                                <Text style={styles.text}>Continue com o Facebook</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, styles.buttonDisabled]} disabled={true}>
                                <AppleIcon />
                                <Text style={styles.text}>Continue com o Apple</Text>
                            </TouchableOpacity>
                        </>
                    )
            }

        </>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: .5,
        borderColor: "#00000030",
        borderRadius: 10,
        width: "100%",
        paddingVertical: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonJustIcon: {
        borderWidth: .5,
        borderColor: "#00000030",
        borderRadius: 10,
        width: "20%",
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonDisabled: {
        backgroundColor: '#DCDCDC70',
    },

    text: {
        color: '#000000',
        marginLeft: 10,
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyMedium
    },

    contentIcons: {
        flexDirection: 'row'
    }
})