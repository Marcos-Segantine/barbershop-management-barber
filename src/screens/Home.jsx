import { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, View, Image, ScrollView } from "react-native"

import { globalStyles } from "../assets/globalStyles"
import { FreeTimeImage } from "../assets/imgs/FreeTimeImage"
import DefaultPicture from "../assets/icons/DefaultPicture.png"

import { Button } from "../components/Button"
import { HeaderScreensMenu } from "../components/HeaderScreensMenu"
import { Menu } from "../components/Menu"
import { Loading } from "../components/Loading"

import { SomethingWrongContext } from "../context/SomethingWrongContext"
import { UserContext } from "../context/UserContext"

import { fetchDataSchedulesClients } from "../services/schedules/fetchDataSchedulesClients"
import { getCurrentSchedule } from "../services/schedules/getCurrentSchedule"

import { formatDate } from "../utils/formatDate"
import { getDayOfWeek } from "../utils/getDayOfWeek"
import { formatPhoneNumber } from "../utils/formatPhoneNumber"

import { handleScheduleDoneHome } from "../handlers/handleScheduleDoneHome"

import firestore from '@react-native-firebase/firestore';

export const Home = ({ navigation }) => {
    const [schedulesOfProfessional, setSchedulesOfProfessional] = useState(null)
    const [scheduleEarlier, setScheduleEarlier] = useState(null)

    const { userData } = useContext(UserContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)

    const schedulesMonthRef = firestore().collection('schedules_month')

    useEffect(() => {
        const unsubscribe = schedulesMonthRef.onSnapshot(async () => {
            userData && fetchDataSchedulesClients(setSchedulesOfProfessional, userData.name, setSomethingWrong)
        });

        return () => unsubscribe();
    }, [userData])

    useEffect(() => {
        !!schedulesOfProfessional && getCurrentSchedule(schedulesOfProfessional, setScheduleEarlier)

    }, [schedulesOfProfessional]);

    if (schedulesOfProfessional === null || scheduleEarlier === null) return <Loading flexSize={1} />

    if (!schedulesOfProfessional?.length) return (
        <>
            <View style={[globalStyles.container, { flex: 1, justifyContent: "space-between" }]}>
                <HeaderScreensMenu screenName={"No momento, sua agenda está vazia"} />

                <FreeTimeImage width={400} height={"60%"} />

                <Button
                    text={"Agendar horário"}
                    action={() => navigation.navigate("GetClient")}
                />
            </View>

            <Menu />
        </>
    )

    const dayFormatted = scheduleEarlier.day && formatDate(scheduleEarlier.day).split(",")[0] + " - " + getDayOfWeek(scheduleEarlier.day)
    const services = scheduleEarlier.services && scheduleEarlier.services.map(service => service.name).join(", ")

    return (
        <>
            <ScrollView contentContainerStyle={[globalStyles.container, { justifyContent: "space-between" }]}>
                <HeaderScreensMenu screenName={dayFormatted} />
                <View style={styles.contentDate}>
                    <Text style={styles.scheduleHour}>{scheduleEarlier && scheduleEarlier.schedule}</Text>
                </View>

                {
                    scheduleEarlier?.profilePicture ?
                        <Image src={scheduleEarlier.profilePicture} style={{ width: 200, height: 200, borderRadius: 150 }} /> :
                        <Image source={DefaultPicture} style={{ width: 200, height: 200, borderRadius: 150 }} />
                }

                <Text style={styles.clientName}>{scheduleEarlier && scheduleEarlier.name}</Text>

                <View style={{ alignItems: 'flex-start', marginTop: 25 }}>
                    <Text style={styles.description}>Email: <Text style={styles.info}>{scheduleEarlier && scheduleEarlier.email}</Text></Text>
                    <Text style={styles.description}>Celular: <Text style={styles.info}>{scheduleEarlier && formatPhoneNumber(scheduleEarlier.phone, setSomethingWrong)}</Text></Text>
                    <Text style={styles.description}>Serviços: <Text style={styles.info}>{services}</Text></Text>
                </View>

                <Button
                    text={"Feito"}
                    addStyles={{ marginTop: 22 }}
                    action={() => handleScheduleDoneHome(
                        setScheduleEarlier,
                        scheduleEarlier,
                        setSomethingWrong,
                        setSchedulesOfProfessional,
                        userData,
                    )}
                />
            </ScrollView>

            <Menu />
        </>
    )
}

const styles = StyleSheet.create({
    contentDate: {
        width: "100%",
    },

    scheduleHour: {
        fontSize: globalStyles.fontSizeMedium,
        color: "#000000",
        marginTop: 12,
        fontFamily: "800",
        textAlign: "center"
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
        fontFamily: "400",
    },

    contentButtons: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: 30,
    }
})