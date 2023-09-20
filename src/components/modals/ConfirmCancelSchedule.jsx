import { useNavigation } from "@react-navigation/native"
import { Modal, View, StyleSheet, Text, TouchableOpacity } from "react-native"

import { globalStyles } from "../../assets/globalStyles"

import { cancelSchedule } from "../../services/schedules/cancelSchedule"

export const ConfirmCancelSchedule = ({ confirmCancelScheduleVisible, setConfirmCancelSchedule, scheduleInfo }) => {

    const navigation = useNavigation()

    const handleCancelSchedule = async () => {
        cancelSchedule(scheduleInfo.clientUid, scheduleInfo)
        setConfirmCancelSchedule(false)

        navigation.navigate("SchedulesClients")
    }

    return (
        <Modal
            visible={confirmCancelScheduleVisible}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.mainMessage}>Cancelar Horário</Text>
                    <Text style={styles.middleMessage}>Você tem certeza que deseja cancelar seu horário?</Text>
                    <Text>Essa ação não pode ser desfeita</Text>

                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: globalStyles.orangeColor }]}
                            activeOpacity={.8}
                            onPress={() => setConfirmCancelSchedule(false)}
                        >
                            <Text style={{ fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall, color: '#FFFFFF' }}>Não</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btn}
                            activeOpacity={.8}
                            onPress={handleCancelSchedule}
                        >
                            <Text style={{ fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall, color: globalStyles.orangeColor }}>Sim, cancelar horário</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: "#00000090",
    },

    content: {
        flex: .35,
        backgroundColor: "#FFFFFF",
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        alignItems: 'center',
        paddingVertical: 25,
        justifyContent: 'space-around',
    },

    mainMessage: {
        color: "#FF0000",
        fontFamily: globalStyles.fontFamilyBold,
        fontSize: globalStyles.fontSizeMedium,
    },
    
    middleMessage: {
        fontFamily: globalStyles.fontFamilyBold,
        fontSize: globalStyles.fontSizeSmall,
        color: "#000000",
        width: "80%",
        textAlign: "center",
    },

    btn: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#00000020",
        width: "45%",
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: '#fff8ef',
        borderColor: "transparent"
    },
})