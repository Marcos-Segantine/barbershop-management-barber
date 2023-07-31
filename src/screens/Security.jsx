import { useContext, useState } from "react"
import { StyleSheet, View, Text, Pressable } from "react-native"

import { globalStyles } from "../assets/globalStyles"

import { ComeBack } from "../components/ComeBack"

import { UserContext } from "../context/UserContext"

import { handleRememberEmailPassword } from "../handlers/handleRememberEmailPassword"

import AsyncStorage from '@react-native-async-storage/async-storage';

export const Security = ({ navigation }) => {
    const [isToRememberEmailAndPassword, setIsToRememberEmailAndPassword] = useState(async () => !!await AsyncStorage.getItem('@barber_app__email'))

    const { userData } = useContext(UserContext)

    return (
        <View style={globalStyles.container}>
            <ComeBack text={"Segurança"} />

            <View style={styles.content}>
                <View style={styles.contentField}>
                    <Text style={styles.text}>
                        Lembrar meu email e senha
                    </Text>
                    <Pressable
                        style={styles.button}
                        onPress={async () => setIsToRememberEmailAndPassword(await handleRememberEmailPassword(
                            userData.email,
                            isToRememberEmailAndPassword
                        ))}
                    >
                        <Text style={[styles.text, { marginLeft: 0, fontSize: globalStyles.fontSizeVerySmall }]}>
                            {isToRememberEmailAndPassword ? "Sim" : "Não"}
                        </Text>
                    </Pressable>

                </View>
                <Pressable
                    style={styles.changePasswordButton}
                    onPress={() => navigation.navigate("CreateNewPassword", { isToUpdateUserPassword: true })}
                >
                    <Text style={[styles.text, { textAlign: "center", color: globalStyles.orangeColor }]}>
                        Atualizar senha
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        marginTop: 50,
        alignItems: "center",
    },

    contentField: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    text: {
        marginLeft: 10,
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
        color: "#000000",
    },

    button: {
        borderWidth: 1,
        borderColor: "#e1e1e1",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 5,
    },

    changePasswordButton: {
        backgroundColor: globalStyles.champagneColor,
        width: "85%",
        borderRadius: 20,
        paddingVertical: 15,
        marginTop: 30,
    }
})
