import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import { useContext, useEffect } from "react"

import { useNavigation, useNavigationState } from "@react-navigation/native"

import { HomeIcon, HomeIconSelected } from "../assets/icons/HomeIcon"
import { SchedulesIcon, SchedulesIconSelected } from "../assets/icons/Schedules.Icon"
import { ProfileIcon, ProfileIconSelected } from "../assets/icons/ProfileIcon"
import { NewScheduleIcon, NewScheduleIconSelected } from "../assets/icons/NewScheduleIcon"

import { MenuItemContext } from "../context/MenuItemSelected"

import { verifyScreenName } from "../services/navigation/verifyScreenName"
import { globalStyles } from "../assets/globalStyles"

export const Menu = () => {
    const { itemSelected, setItemSelected } = useContext(MenuItemContext)

    const navigation = useNavigation()

    const stateNavigation = useNavigationState(stateNavigation => stateNavigation);

    useEffect(() => {
        setItemSelected(verifyScreenName(stateNavigation))

    }, [stateNavigation]);

    const handleNavigation = (navigateTo, routeParam = {}) => {
        navigation.navigate(navigateTo, routeParam)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => handleNavigation('Home')}>
                {
                    itemSelected === 'Home' ?
                        <HomeIconSelected /> :
                        <HomeIcon />
                }
                <Text style={itemSelected === 'Home' ? { fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall, color: "#fc9501" } : { fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall, color: "#000000" }}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => handleNavigation('GetClient', { headerText: "Agendar Novo Horário", scheduleToUpdate: null, isToUpdateSchedule: false, isToClearScheduleContext: true })}>
                {
                    itemSelected === 'GetClient' ?
                        <NewScheduleIconSelected /> :
                        <NewScheduleIcon />
                }
                <Text style={itemSelected === 'GetClient' ? { fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall, color: "#fc9501" } : { fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall, color: "#000000" }}>Agendar horário</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => handleNavigation('SchedulesClients')}>
                {
                    itemSelected === 'SchedulesClients' ?
                        <SchedulesIconSelected /> :
                        <SchedulesIcon />
                }
                <Text style={itemSelected === 'SchedulesClients' ? { fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall, color: "#fc9501" } : { fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall, color: "#000000" }}>Meus horários</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => handleNavigation('Profile')}>
                {
                    itemSelected === 'Profile' ?
                        <ProfileIconSelected /> :
                        <ProfileIcon />
                }
                <Text style={itemSelected === 'Profile' ? { fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall, color: "#fc9501" } : { fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall, color: "#000000" }}>Perfil</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 110,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 30,
        borderWidth: .2,
        backgroundColor: "#F2F2F2"
    },

    text: {
        color: "#000000",
    }
})
