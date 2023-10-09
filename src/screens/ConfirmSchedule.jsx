import { ScrollView, View, Text, StyleSheet } from "react-native"
import { useContext, useEffect, useState } from "react"

import { useIsFocused } from "@react-navigation/native"

import { ComeBack } from "../components/ComeBack"
import { Button } from "../components/Button"
import { Loading } from "../components/Loading"
import { DefaultModal } from "../components/modals/DefaultModal"

import { ScheduleContext } from "../context/ScheduleContext"
import { SomethingWrongContext } from "../context/SomethingWrongContext"

import { globalStyles } from "../assets/globalStyles"

import { formatDate } from "../utils/formatDate"
import { formatPrice } from "../utils/formatPrice"
import { getDayOfWeek } from "../utils/getDayOfWeek"
import { getNameLastName } from "../utils/getNameLastName"

import { handleConfirmationNewSchedule } from "../handlers/handleConfirmationNewSchedule"

export const ConfirmSchedule = ({ navigation, route }) => {
    const [modalContent, setModalContent] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const { schedule } = useContext(ScheduleContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)

    const { scheduleToUpdate, isToUpdateSchedule } = route.params

    const dateFormatted = schedule && formatDate(schedule.day, setSomethingWrong)
    const phoneFormatted = schedule.client?.phone && schedule.client.phone

    const isFocused = useIsFocused();

    useEffect(() => {
        schedule.scheduleUid = schedule.client && `${schedule.client.uid}-${schedule.day}-${schedule.professionalUid}-${schedule.schedule}`;

    }, [isFocused]);

    const totalPriceServicesSelected = schedule.services && formatPrice(schedule.services.reduce((acc, service) => acc + Number(service.price), 0))

    if (isLoading) return <Loading flexSize={1} />

    return (
        <ScrollView
            contentContainerStyle={[globalStyles.container, { paddingBottom: "20%" }]}
            overScrollMode="never"
            bounces={false}
        >
            <DefaultModal
                modalContent={modalContent}
            />

            <ComeBack text={"Confirmar Agendamento"} />

            <View style={{ width: "100%", alignItems: 'center' }}>
                <View style={styles.content}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styles.describe}>Endereço</Text>
                        <Text style={styles.info}>Alameda dos Jacarandas Parque, 123</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styles.describe}>Nome</Text>
                        <Text style={styles.info}>{schedule?.client && schedule.client.name}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styles.describe}>Celular</Text>
                        <Text style={styles.info}>{phoneFormatted}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styles.describe}>Dia da Semana</Text>
                        <Text style={styles.info}>{getDayOfWeek(schedule.day)}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styles.describe}>Data</Text>
                        <Text style={styles.info}>{dateFormatted}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styles.describe}>Horário</Text>
                        <Text style={styles.info}>{schedule.schedule}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styles.describe}>Profissional</Text>
                        <Text style={styles.info}>{getNameLastName(schedule.professional)}</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    {
                        schedule.services &&
                        (
                            schedule.services.map((service, index) => {
                                return (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }} key={index}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.describe}>{service.name}</Text>
                                        </View>
                                        <Text style={styles.info}>{formatPrice(service.price)}</Text>
                                    </View>
                                )
                            })
                        )
                    }

                    <View style={styles.fieldTotal}>
                        <Text style={styles.describe}>Total</Text>
                        <Text style={styles.info}>{totalPriceServicesSelected}</Text>
                    </View>
                </View>
            </View>

            <Button
                text={"Confirmar Horário"}
                action={() => handleConfirmationNewSchedule(
                    setIsLoading,
                    schedule,
                    isToUpdateSchedule,
                    scheduleToUpdate,
                    setModalContent,
                    setSomethingWrong,
                    navigation,
                )}
                addStyles={{ marginTop: "5%" }}
            />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        width: "100%",
        padding: 15,
        marginVertical: 10,
    },

    describe: {
        color: "#00000070",
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
    },

    info: {
        fontSize: globalStyles.fontSizeSmall,
        color: "#000000",
        fontFamily: globalStyles.fontFamilyBold,
        maxWidth: "75%",
    },

    fieldTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        borderTopWidth: .8,
        borderTopColor: "#000000",
        paddingTop: 10,
    },
})
