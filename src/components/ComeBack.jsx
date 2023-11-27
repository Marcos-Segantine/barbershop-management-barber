import { useContext } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"

import { useNavigation } from "@react-navigation/native"

import { ArrowComeBack } from "../assets/icons/ArrowComeBackIcon"
import { globalStyles } from "../assets/globalStyles"

import { SomethingWrong } from "./modals/SomethingWrong"

import { getPreviousScreensName } from "../utils/getPreviousScreensName"

import { handleNavigation } from "../handlers/handleNavigation"

import { SomethingWrongContext } from "../context/SomethingWrongContext"

export const ComeBack = ({ text }) => {
    const navigation = useNavigation()

    const { setSomethingWrong } = useContext(SomethingWrongContext)

    const handleComeBack = () => {
        const [previousScreen, lastScreen] = getPreviousScreensName(navigation)

        handleNavigation(
            previousScreen,
            lastScreen,
            navigation,
            setSomethingWrong
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
        width: "100%",
        paddingRight: 25,
    },

    text: {
        color: '#000000',
        fontSize: globalStyles.fontSizeMedium,
        fontFamily: globalStyles.fontFamilyBold
    }
})