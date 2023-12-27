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
import { AlertValidatePhoneNumber } from "../components/modals/AlertValidatePhoneNumber"

import { SomethingWrongContext } from "../context/SomethingWrongContext"
import { UserContext } from "../context/UserContext"

import { fetchDataSchedulesClients } from "../services/schedules/fetchDataSchedulesClients"
import { getCurrentSchedule } from "../services/schedules/getCurrentSchedule"

import { formatDate } from "../utils/formatDate"
import { getDayOfWeek } from "../utils/getDayOfWeek"
import { getNameLastName } from "../utils/getNameLastName"

import firestore from '@react-native-firebase/firestore';
import { cancelSchedule } from "../services/schedules/cancelSchedule"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { getPreviousScreensName } from "../utils/getPreviousScreensName"

export const Home = ({ navigation }) => {
    const [schedulesOfProfessional, setSchedulesOfProfessional] = useState(null)
    const [scheduleEarlier, setScheduleEarlier] = useState(null)
    const [modalContent, setModalContent] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showModalPhoneNotValidated, setShowModalPhoneNotValidated] = useState(false)

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
        (async () => {

            const [previousScreen, lastScreen] = getPreviousScreensName(navigation, setSomethingWrong)

            const time = await AsyncStorage.getItem("@barber_app__phone_verification_time")
            if (time) {

                const hour = time.split(":").map(Number)[0]
                const currentHour = +new Date().getHours()

                if (
                    !userData?.phoneNumberValidated &&
                    previousScreen === "Welcome" && lastScreen === "Home" &&
                    currentHour > (hour + 6)
                ) {
                    setShowModalPhoneNotValidated(true)
                }
            } else {
                if (
                    !userData?.phoneNumberValidated &&
                    previousScreen === "Welcome" && lastScreen === "Home"
                ) {
                    setShowModalPhoneNotValidated(true)
                }
            }

        })();

    }, [userData])

    useEffect(() => {
        !!schedulesOfProfessional && getCurrentSchedule(schedulesOfProfessional, setScheduleEarlier, setIsLoading, setSomethingWrong)

    }, [schedulesOfProfessional]);

    const handleDone = async () => {

        const isToShowModal = await AsyncStorage.getItem("@barber_app__alert_conclude_schedule")

        if (isToShowModal === "false") {
            setIsLoading(true)

            await cancelSchedule(
                scheduleEarlier.clientUid,
                scheduleEarlier,
                setSomethingWrong,
            )

            setModalContent(null)

            return
        }
        else if (isToShowModal === null) {
            await AsyncStorage.setItem("@barber_app__alert_conclude_schedule", "true")

            setModalContent({
                image: <ConfirmScheduleDone />,
                firstButtonText: "Confirmar",
                secondButtonText: "Cancelar",
                mainMessage: "Ateção",
                message: "Se você confirmar o agendamento, ele será totalmente apagado.",
                firstButtonAction: () => {
                    setIsLoading(true)

                    cancelSchedule(
                        scheduleEarlier.clientUid,
                        scheduleEarlier,
                        setSomethingWrong,
                    )
                    setModalContent(null)
                },

                secondButtonAction: () => setModalContent(null)
            })

            return
        }

        setModalContent({
            image: <ConfirmScheduleDone />,
            firstButtonText: "Confirmar",
            secondButtonText: "Cancelar",
            mainMessage: "Atenção",
            message: "Se você confirmar o agendamento, ele será totalmente apagado.",
            firstButtonAction: () => {
                setIsLoading(true)

                cancelSchedule(
                    scheduleEarlier.clientUid,
                    scheduleEarlier,
                    setSomethingWrong,
                )
                setModalContent(null)
            },

            secondButtonAction: () => setModalContent(null)
        })

    }

    if (isLoading || schedulesOfProfessional === null || scheduleEarlier === null) return <Loading flexSize={1} />

    if (!schedulesOfProfessional?.length) return (
        <>
            <View style={[globalStyles.container, { flex: 1, justifyContent: "space-between" }]}>
                <HeaderScreensMenu screenName={"Agenda Vazia"} />
                <AlertValidatePhoneNumber
                    visible={showModalPhoneNotValidated}
                    setVisible={setShowModalPhoneNotValidated}
                />

                <FreeTimeImage width={"100%"} height={"60%"} />

                <Button
                    text={"Agendar Horário"}
                    action={() => navigation.navigate("GetClient")}
                />
            </View>

            <Menu />
        </>
    )

    const dayFormatted = scheduleEarlier.day && formatDate(scheduleEarlier.day).split(",")[0]

    return (
        <>
            <ScrollView
                contentContainerStyle={[globalStyles.container, { justifyContent: "space-between" }]}
                overScrollMode="never"
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <DefaultModal
                    modalContent={modalContent}
                />
                <AlertValidatePhoneNumber
                    visible={showModalPhoneNotValidated}
                    setVisible={setShowModalPhoneNotValidated}
                />

                <HeaderScreensMenu screenName={dayFormatted} />

                <View style={styles.contentPicture}>
                    {
                        scheduleEarlier?.profilePicture ?
                            <Image src={scheduleEarlier.profilePicture} style={styles.img} /> :
                            <Image source={DefaultPicture} style={styles.img} />
                    }
                </View>

                <Text style={styles.clientName}>{scheduleEarlier?.name && getNameLastName(scheduleEarlier.name, setSomethingWrong, false)}</Text>

                <View style={{ alignItems: 'flex-start', marginTop: 20, width: "100%" }}>
                    <Text style={styles.description}>Dia: <Text style={styles.info}>{getDayOfWeek(scheduleEarlier.day, setSomethingWrong)}</Text></Text>
                    <Text style={styles.description}>Hora: <Text style={styles.info}>{scheduleEarlier && scheduleEarlier.schedule}</Text></Text>
                    <Text style={styles.description}>Celular: <Text style={styles.info}>{scheduleEarlier && scheduleEarlier.phone}</Text></Text>
                    <View style={styles.servicesList}>
                        <Text style={styles.description}>Serviço(s):</Text>
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
        fontFamily: globalStyles.fontFamilyBold,
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
        marginLeft: 15,
        maxWidth: "80%",
        flexDirection: "row",
        alignItems: "center",
    },

    contentButtons: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: 30,
    },

    contentPicture: {
        width: 250,
        height: 250,
        borderRadius: 150,
    },

    img: {
        width: "100%",
        height: "100%",
        borderRadius: 150,
    }
})