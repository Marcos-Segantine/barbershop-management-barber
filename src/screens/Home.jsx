import { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, View, Image, ScrollView } from "react-native"

import { globalStyles } from "../assets/globalStyles"
import { FreeTimeImage } from "../assets/imgs/FreeTimeImage"
import DefaultPicture from "../assets/icons/DefaultPicture.png"
import { ConfirmScheduleDone } from "../assets/imgs/ConfirmScheduleDone"

import { Button } from "../components/Button"
import { HeaderScreensMenu } from "../components/HeaderScreensMenu"
import { Menu } from "../components/Menu"
import { Loading } from "../components/Loading"
import { DefaultModal } from "../components/modals/DefaultModal"

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
    const [modalContent, setModalContent] = useState(null)

    const { userData } = useContext(UserContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)

    const schedulesMonthRef = firestore().collection('schedules_month')

    useEffect(() => {
        const unsubscribe = schedulesMonthRef.onSnapshot(async () => {
            userData && fetchDataSchedulesClients(setSchedulesOfProfessional, userData.uid, setSomethingWrong)
        });

        return () => unsubscribe();
    }, [userData])

    useEffect(() => {
        !!schedulesOfProfessional && getCurrentSchedule(schedulesOfProfessional, setScheduleEarlier)

    }, [schedulesOfProfessional]);

    const handleDone = () => {
        setModalContent({
            image: <ConfirmScheduleDone />,
            firstButtonText: "Confirmar",
            secondButtonText: "Cancelar",
            mainMessage: "Ateção",
            message: "Caso você confirme o agendamento será completamente apagado.",
            firstButtonAction: () => {
                handleScheduleDoneHome(
                    setScheduleEarlier,
                    scheduleEarlier,
                    setSomethingWrong,
                    setSchedulesOfProfessional,
                    userData,
                )
                setModalContent(null)
            },

            secondButtonAction: () => setModalContent(null)
        })

    }

    if (schedulesOfProfessional === null || scheduleEarlier === null) return <Loading flexSize={1} />

    if (!schedulesOfProfessional?.length) return (
        <>
            <View style={[globalStyles.container, { flex: 1, justifyContent: "space-between" }]}>
                <HeaderScreensMenu screenName={"No momento, sua agenda está vazia"} />

                <FreeTimeImage width={"100%"} height={"60%"} />

                <Button
                    text={"Agendar horário"}
                    action={() => navigation.navigate("GetClient")}
                />
            </View>

            <Menu />
        </>
    )

    const dayFormatted = scheduleEarlier.day && formatDate(scheduleEarlier.day).split(",")[0]

    return (
        <>
            <ScrollView contentContainerStyle={[globalStyles.container, { justifyContent: "space-between" }]}>
                <DefaultModal
                    modalContent={modalContent}
                />

                <HeaderScreensMenu screenName={dayFormatted} />
                {
                    scheduleEarlier?.profilePicture ?
                        <Image src={scheduleEarlier.profilePicture} style={{ width: 200, height: 200, borderRadius: 150 }} /> :
                        <Image source={DefaultPicture} style={{ width: 200, height: 200, borderRadius: 150 }} />
                }

                <Text style={styles.clientName}>{scheduleEarlier && scheduleEarlier.name.split(" ").splice(0, 2).join(" ")}</Text>

                <View style={{ alignItems: 'flex-start', marginTop: 20, width: "100%" }}>
                    <Text style={styles.description}>Dia: <Text style={styles.info}>{getDayOfWeek(scheduleEarlier.day)}</Text></Text>
                    <Text style={styles.description}>Hora: <Text style={styles.info}>{scheduleEarlier && scheduleEarlier.schedule}</Text></Text>
                    <Text style={styles.description}>Celular: <Text style={styles.info}>{scheduleEarlier && formatPhoneNumber(scheduleEarlier.phone, setSomethingWrong)}</Text></Text>
                    <View style={styles.servicesList}>
                        <Text style={styles.description}>Serviços:</Text>
                        {
                            scheduleEarlier?.services && scheduleEarlier.services.map((service, index) => {
                                return (
                                    <View key={index} style={styles.serviceContentList}>
                                        <View style={{ width: 8, height: 8, borderRadius: 150, backgroundColor: "black", marginRight: 10 }}></View>
                                        <Text style={[styles.info, { marginVertical: 0 }]}>{service.name}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <Text style={styles.description}>Email: <Text style={styles.info}>{scheduleEarlier && scheduleEarlier.email}</Text></Text>
                </View>

                <Button
                    text={"Feito"}
                    addStyles={{ marginTop: 22 }}
                    action={handleDone}
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
        fontFamily: globalStyles.fontFamilyMedium,
    },

    servicesList: {
        color: "#000000",
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
        maxWidth: "80%",
        textAlign: 'center',
        alignItems: "flex-start"
    },

    serviceContentList: {
        fontSize: globalStyles.fontSizeSmall,
        marginVertical: 5,
        maxWidth: "80%",
        flexDirection: "row",
        alignItems: "center",
    },

    contentButtons: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: 30,
    }
})