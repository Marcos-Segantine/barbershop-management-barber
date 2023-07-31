import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"

import { ArrowComeBack } from "../assets/icons/ArrowComeBackIcon"
import { globalStyles } from "../assets/globalStyles"

import { SomethingWrong } from "./modals/SomethingWrong"

import { getPreviousScreensName } from "../utils/getPreviousScreensName"

import { handleNavigation } from "../handlers/handleNavigation"

import { useContext } from "react"

import { ScheduleContext } from "../context/ScheduleContext"
import { UserContext } from "../context/UserContext"

export const ComeBack = ({ text }) => {
    const navigation = useNavigation()

    const { setSchedule } = useContext(ScheduleContext)
    const { userData } = useContext(UserContext)

    const handleComeBack = () => {
        const [previousScreen, lastScreen] = getPreviousScreensName(navigation)

        handleNavigation(
            previousScreen,
            lastScreen,
            navigation,
            userData,
            setSchedule
        )
    }

    return (
        <View style={styles.container}>
            <SomethingWrong />

            <TouchableOpacity onPress={handleComeBack}>
                <ArrowComeBack />
            </TouchableOpacity>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "95  %",
        paddingRight: 10,
    },

    text: {
        color: '#000000',
        fontSize: globalStyles.fontSizeLarger,
    }
})