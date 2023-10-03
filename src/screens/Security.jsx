import { useContext, useEffect, useState } from "react"
import { StyleSheet, View, Text, Pressable } from "react-native"

import { globalStyles } from "../assets/globalStyles"

import { ComeBack } from "../components/ComeBack"

import { UserContext } from "../context/UserContext"

import { handleAccessAutomatically } from "../handlers/handleAccessAutomatically"
import { handleAlertConcludeSchedule } from "../handlers/handleAlertConcludeSchedule"

import AsyncStorage from "@react-native-async-storage/async-storage"

export const Security = ({ navigation }) => {
    const [accessAutomatically, setAccessAutomatically] = useState(null)
    const [alertConcludeSchedule, setAlertConcludeSchedule] = useState(null)

    const { userData } = useContext(UserContext)

    useEffect(() => {
        const getAsyncValue = async (string, setter) => {
            const result = await AsyncStorage.getItem(string)
            setter(result === "true" ? true : false)
        }

        getAsyncValue("@barber_app__access_automatically", setAccessAutomatically)
        getAsyncValue("@barber_app__alert_conclude_schedule", setAlertConcludeSchedule)

    }, [])

    return (
        <View style={globalStyles.container}>
            <ComeBack text={"Segurança"} />

            <View style={styles.content}>
                <View style={styles.contentField}>
                    <Text style={styles.text}>
                        Acesso automático
                    </Text>
                    <Pressable
                        onPress={() => handleAccessAutomatically(!accessAutomatically, setAccessAutomatically, userData?.email)}
                        style={{ width: 75, height: 30, borderRadius: 100, backgroundColor: accessAutomatically ? globalStyles.orangeColor : "#B8B8B8", padding: 2 }}
                    >
                        <View style={accessAutomatically ? styles.buttonCheck : [styles.buttonCheck, { backgroundColor: "#F2F2F2", left: 2 }]}></View>
                    </Pressable>

                </View>

                <View style={styles.contentField}>
                    <Text style={styles.text}>
                        Alertar ao concluir agendamento
                    </Text>
                    <Pressable
                        onPress={() => handleAlertConcludeSchedule(!alertConcludeSchedule, setAlertConcludeSchedule)}
                        style={{ width: 75, height: 30, borderRadius: 100, backgroundColor: alertConcludeSchedule ? globalStyles.orangeColor : "#B8B8B8", padding: 2 }}
                    >
                        <View style={alertConcludeSchedule ? styles.buttonCheck : [styles.buttonCheck, { backgroundColor: "#F2F2F2", left: 2 }]}></View>
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
        alignContent: "center",
        alignItems: "center",
        marginTop: 15
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
    },

    buttonCheck: {
        backgroundColor: "#FFFFFF",
        width: 35,
        height: "100%",
        borderRadius: 300,
        position: "absolute",
        right: 2,
        top: 2
    }
})
