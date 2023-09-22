import { Modal, StyleSheet, View, Text, Image } from "react-native"
import { useContext } from "react"

import { useNavigation } from "@react-navigation/native"

import { globalStyles } from "../../assets/globalStyles"
import DefaultPicture from "../../assets/icons/DefaultPicture.png"

import { ScheduleContext } from "../../context/ScheduleContext"

import { formatPhoneNumber } from "../../utils/formatPhoneNumber"

import { Button } from "../Button"

export const ShowClientInfo = ({
    modalShowUser,
    setModalShowUser,
    isToClearScheduleContext
}) => {
    if (!modalShowUser) return

    const navigation = useNavigation()

    const { schedule, setSchedule } = useContext(ScheduleContext)
    const { setSomethingWrong } = useContext(ScheduleContext)

    const handleAction = (action = "confirm") => {
        if (action === 'cancel') {
            setModalShowUser(null)
            setSchedule({ ...schedule, client: null })
            return
        }
        else {
            setModalShowUser(null)
            navigation.navigate("AddSchedule", { headerText: "Novo Agendamento", scheduleToUpdate: null, isToUpdateSchedule: false, isToClearScheduleContext, })
        }
    }

    return (
        <Modal
            visible={!!modalShowUser}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={{ fontSize: globalStyles.fontSizeMedium, color: "#000000", fontFamily: globalStyles.fontFamilyBold, marginBottom: 20 }}>Refere-se a este cliente?</Text>

                    <View>
                        {
                            schedule?.client?.profilePicture ?
                                <Image
                                    src={schedule?.client?.profilePicture}
                                    style={{ borderRadius: 150, width: 220, height: 220, alignSelf: "center" }}
                                /> :
                                <Image source={DefaultPicture} style={{ width: 220, height: 220, alignSelf: "center" }} />
                        }

                    </View>

                    <Text style={styles.clientName}>{modalShowUser.name}</Text>

                    <View style={{ alignItems: 'flex-start', marginTop: 25 }}>
                        <Text style={styles.description}>Email: <Text style={styles.info}>{modalShowUser.email}</Text></Text>
                        <Text style={styles.description}>Celular: <Text style={styles.info}>{formatPhoneNumber(modalShowUser.phone, setSomethingWrong)}</Text></Text>
                    </View>

                    <View style={styles.contentButtons}>
                        <Button
                            text={"Não"}
                            addStyles={{ backgroundColor: "#fff8ef", width: "45%" }}
                            addStylesText={{ color: globalStyles.orangeColor }}
                            action={() => handleAction("cancel")}
                        />
                        <Button
                            text={"Sim, continuar"}
                            addStyles={{ width: "45%" }}
                            action={handleAction}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000090',
        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        alignItems: 'center',
        width: "85%",
        paddingVertical: 20,
        position: "relative",
    },

    clientName: {
        color: "#000000",
        fontSize: globalStyles.fontSizeMedium,
        marginTop: 30,
        fontFamily: globalStyles.fontFamilyBold,
        maxWidth: "80%",
        textAlign: 'center',
    },

    description: {
        color: "#000000",
        fontSize: globalStyles.fontSizeSmall,
        marginVertical: 8,
        fontFamily: globalStyles.fontFamilyBold,
        maxWidth: "80%",
        textAlign: 'center',
    },

    info: {
        color: "#000000",
        fontSize: globalStyles.fontSizeSmall,
        marginVertical: 15,
        maxWidth: "80%",
        textAlign: 'center',
        fontFamily: globalStyles.fontFamilyBold,
    },

    contentButtons: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: "10%",
    }
})
