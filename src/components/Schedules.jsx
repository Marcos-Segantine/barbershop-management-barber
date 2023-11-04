import { useContext, useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, Text, View } from "react-native"
import { ScheduleContext } from "../context/ScheduleContext"
import { UserContext } from "../context/UserContext"

import { globalStyles } from "../assets/globalStyles"

import { getAvailableTimesByProfessional } from "../services/schedules/getAvailableTimesByProfessional"
import { getAllTimes } from "../services/schedules/getAllTimes"

import { getDay, getMonth } from "../utils/dateHelper"
import { sortByHour } from "../utils/sortByHour"

import { Loading } from "./Loading"
import { SomethingWrongContext } from "../context/SomethingWrongContext"

export const Schedules = ({ preferProfessional }) => {
    const [availableTimes, setAvailableTimes] = useState(null)
    const [allTimes, setAllTimes] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { schedule, setSchedule } = useContext(ScheduleContext)
    const { userData } = useContext(UserContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)

    const day = schedule.day && `${getDay(schedule.day, setSomethingWrong)} de ${getMonth(schedule.day, setSomethingWrong)}`

    useEffect(() => {

        (async () => {

            if (!!(schedule.professional && schedule.day) && preferProfessional) {
                const data = await getAvailableTimesByProfessional(userData.uid, schedule, setIsLoading, setSomethingWrong)
                setAvailableTimes(sortByHour(data, setSomethingWrong))
                setIsLoading(false)

            }
            else if (!preferProfessional) {
                const data = await getAllTimes(setSomethingWrong)
                setAllTimes(sortByHour(data, setSomethingWrong))
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
                        <Text style={styles.text}>Infelizmente {schedule.professionalGender?.toLowerCase() === "feminino" ? "a" : "o"} {schedule.professional} não tem nenhum horário vago no dia {day}</Text>
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