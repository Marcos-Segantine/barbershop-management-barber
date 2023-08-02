import { useContext, useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, Text, View } from "react-native"
import {  ScheduleContext } from "../context/ScheduleContext"

import { globalStyles } from "../assets/globalStyles"

import { getAvailableTimesByProfessional } from "../services/schedules/getAvailableTimesByProfessional"
import { getAllTimes } from "../services/schedules/getAllTimes"
import { getDay } from "../utils/dateHelper"

import { Loading } from "./Loading"
import { UserContext } from "../context/UserContext"

export const Schedules = ({ preferProfessional }) => {
    const [availableTimes, setAvailableTimes] = useState(null)
    const [allTimes, setAllTimes] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { schedule, setSchedule } = useContext(ScheduleContext)
    const { userData } = useContext(UserContext)

    const day = schedule.day && getDay(schedule)

    useEffect(() => {

        (async () => {

            if (!!(schedule.professional && schedule.day) && preferProfessional) {
                setAvailableTimes(await getAvailableTimesByProfessional(userData.uid ,schedule, setIsLoading))
                setIsLoading(false)

            }
            else if (!preferProfessional) {
                setAllTimes(await getAllTimes())
                setIsLoading(false)
            }

        })();

    }, [schedule.professional, schedule.day])

    if (isLoading) return <Loading />

    return (
        <View style={styles.container}>
            {
                (preferProfessional && availableTimes) &&
                (
                    availableTimes.length ?
                        <Text style={styles.text}>Escolha um horário</Text> :
                        <Text style={styles.text}>Infelizmente o {schedule.professional} não tem nenhum horário vago no dia {day}</Text>
                )

            }

            {
                (preferProfessional && !availableTimes) &&
                (
                    <Text style={styles.text}>Por favor escolha um profissional e dia para que possamos conferir os horários disponíveis</Text>
                )
            }

            {
                (!preferProfessional) && <Text style={styles.text}>Escolha um horário</Text>
            }

            {
                preferProfessional ?
                    availableTimes && availableTimes.map((time, index) => {
                        return (
                            <TouchableOpacity
                                style={schedule.schedule === time ? [styles.schedule, { backgroundColor: globalStyles.orangeColor }] : styles.schedule}
                                onPress={() => setSchedule({ ...schedule, schedule: time })}
                                key={index}
                            >
                                <Text style={schedule.schedule === time ? [styles.time, { color: '#FFFFFF' }] : styles.time}>{time}</Text>
                            </TouchableOpacity>
                        )
                    }) :

                    allTimes.map((time, index) => {
                        return (
                            <TouchableOpacity
                                style={schedule.schedule === time ? [styles.schedule, { backgroundColor: globalStyles.orangeColor }] : styles.schedule}
                                onPress={() => setSchedule({ ...schedule, schedule: time })}
                                key={index}
                            >
                                <Text style={schedule.schedule === time ? [styles.time, { color: '#FFFFFF' }] : styles.time}>{time}</Text>
                            </TouchableOpacity>
                        )
                    })
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 50,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: "100%",
    },

    schedule: {
        width: 100,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: globalStyles.orangeColor,
        margin: 2,
    },

    time: {
        color: globalStyles.orangeColor,
        fontFamily: globalStyles.fontFamilyBold,
        fontSize: globalStyles.fontSizeSmall,
    },

    text: {
        color: "#000000",
        fontFamily: globalStyles.fontFamilyBold,
        width: "100%",
        fontSize: globalStyles.fontSizeSmall,
        marginTop: 30,
        marginBottom: 10,
    },
})