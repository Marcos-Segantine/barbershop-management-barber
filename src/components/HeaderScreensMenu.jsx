import { View, Text, StyleSheet, BackHandler } from "react-native"
import { useContext, useEffect } from "react";

import { globalStyles } from "../assets/globalStyles"

import { getPreviousScreensName } from "../utils/getPreviousScreensName";

import { handleNavigation } from "../handlers/handleNavigation";

import { useNavigation } from "@react-navigation/native";

import { ScheduleContext } from "../context/ScheduleContext";
import { UserContext } from "../context/UserContext";

export const HeaderScreensMenu = ({ screenName }) => {
    const navigation = useNavigation();

    const { setSchedule } = useContext(ScheduleContext)
    const { userData } = useContext(UserContext)

    useEffect(() => {

        BackHandler.addEventListener('hardwareBackPress', () => {
            const [previousScreen, lastScreen] = getPreviousScreensName(navigation)
            return handleNavigation(previousScreen, lastScreen, navigation, userData, setSchedule)
        })

    }, [])

    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor: '#fefefe',
                borderRadius: 100,
                width: 60,
                height: 60,
            }}>

            </View>
            <Text style={styles.text}>
                {screenName}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "90%",
        marginBottom: 50,
        paddingRight: 15,

    },

    text: {
        fontSize: globalStyles.fontSizeMedium,
        fontFamily: globalStyles.fontFamilyBold,
        color: '#000000',
        marginLeft: "3%",
        letterSpacing: -0.5,
    }
})