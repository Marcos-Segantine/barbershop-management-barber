import { useContext, useEffect, useState } from "react"
import { StyleSheet, View, Text, Pressable } from "react-native"

import { globalStyles } from "../assets/globalStyles"

import { ComeBack } from "../components/ComeBack"
import { CheckBox } from "../components/CheckBox"

import { UserContext } from "../context/UserContext"

import { handleAccessAutomatically } from "../handlers/handleAccessAutomatically"
import { handleAlertConcludeSchedule } from "../handlers/handleAlertConcludeSchedule"

import AsyncStorage from "@react-native-async-storage/async-storage"

export const Security = ({ navigation }) => {
    const [accessAutomatically, setAccessAutomatically] = useState(null)
    const [alertConcludeSchedule, setAlertConcludeSchedule] = useState(null)

    const { userData } = useContext(UserContext)

    useEffect(() => {
        const getAsyncValue = async (string, setter, method = null) => {
            const result = await AsyncStorage.getItem(string)

            if (method !== null) {
                method(result)

                return
            }

            setter(result === "true" ? true : result)
        }

        getAsyncValue("@barber_app__access_automatically", setAccessAutomatically, async (result) => {
            if (result === null) {
                await AsyncStorage.setItem("@barber_app__access_automatically", "true")
                setAccessAutomatically(true)
            } else {
                await AsyncStorage.setItem("@barber_app__access_automatically", result)
                setAccessAutomatically(result === "true" ? true : false)
            }
        })
        getAsyncValue("@barber_app__alert_conclude_schedule", setAlertConcludeSchedule, async (result) => {
            if (result === null) {
                await AsyncStorage.setItem("@barber_app__alert_conclude_schedule", "true")
                setAlertConcludeSchedule(true)
            } else if (result === "true") {
                await AsyncStorage.setItem("@barber_app__alert_conclude_schedule", "true")
                setAlertConcludeSchedule(result)
            }
            else {
                await AsyncStorage.setItem("@barber_app__alert_conclude_schedule", "false")
                setAlertConcludeSchedule(false)
            }
        })

    }, [])

    return (
        <View style={globalStyles.container}>
            <ComeBack text={"Segurança"} />

            <View style={styles.content}>
                <CheckBox
                    text={"Acesso automático"}
                    action={() => handleAccessAutomatically(!accessAutomatically, setAccessAutomatically, userData?.email)}
                    state={accessAutomatically}
                />

                <CheckBox
                    text={"Alertar ao concluir agendamento"}
                    action={() => handleAlertConcludeSchedule(!alertConcludeSchedule, setAlertConcludeSchedule)}
                    state={alertConcludeSchedule}
                />

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
})
