import { useContext, useEffect, useState } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"

import { ComeBack } from "../components/ComeBack"
import { Loading } from "../components/Loading"
import { Button } from "../components/Button"
import { DefaultModal } from "../components/modals/DefaultModal"

import { getAllTimesFromProfessional } from "../services/schedules/getAllTimesFromProfessional"
import { blockedTimes } from "../services/schedules/blockedTimes"
import { daysBlocked } from "../services/schedules/daysBlocked"

import { Calendar, LocaleConfig } from "react-native-calendars"

import { globalStyles } from "../assets/globalStyles"
import { DataUpdated } from "../assets/imgs/DataUpdated"

import { UserContext } from "../context/UserContext"

import { sortByHour } from "../utils/sortByHour"
import { SettingsContext } from "../context/SettingsContext"
import { SomethingWrongContext } from "../context/SomethingWrongContext"

import { getBlockedDeniedWeekdays } from "../validation/getBlockedDeniedWeekdays"

export const BlockSpecificTimes = ({ navigation }) => {
    const [day, setDay] = useState(null)
    const [blockedDays, setBlockedDays] = useState(null)
    const [timesFromDaySelected, setTimesFromDaySelected] = useState(null)
    const [timesBlockedFromEachDay, setTimesBlockedFromEachDay] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const [weekdaysBlocked, setWeekdaysBlocked] = useState([])
    const [lastMonthSelected, setLastMonthSelected] = useState(null)

    const { userData } = useContext(UserContext)
    const { settings } = useContext(SettingsContext)
    const {setSomethingWrong} = useContext(SomethingWrongContext)

    useEffect(() => {

        (async () => {
            if (userData && timesFromDaySelected === null) {
                setTimesBlockedFromEachDay(await blockedTimes(userData.uid))

                setBlockedDays(await daysBlocked(userData.uid, false, null, setSomethingWrong))
            }

            if (!!(!userData || day === null)) return

            const date = new Date(Object.keys(day)[0])
            const weekDay = date.getDay() + 1;
            const dayOfWeek = weekDay <= 5 ? "weekday" : weekDay === 6 ? "saturday" : "sunday"

            const data = await getAllTimesFromProfessional(userData.uid, setSomethingWrong)

            setTimesFromDaySelected(sortByHour(data[dayOfWeek], setSomethingWrong))

        })();

    }, [day, userData])

    useEffect(() => {

        getBlockedDeniedWeekdays(lastMonthSelected, settings, setWeekdaysBlocked, setIsLoading, setSomethingWrong)

    }, [lastMonthSelected])


    LocaleConfig.defaultLocale = 'pt-br';

    const date = new Date();
    const year = date.getFullYear() + 1
    const month = 12
    const maxDay = 25

    const handleDay = (day) => {
        setDay(() => ({
            [day]: {
                selected: true,
                marked: true,
                selectedColor: globalStyles.orangeColor,
            },
        }));
    };

    const handleTime = (time) => {
        const propName = Object.keys(day)[0]

        const dataTemp = { ...timesBlockedFromEachDay }

        if (dataTemp[propName]) {
            if (dataTemp[propName].length === 1) {
                delete dataTemp[propName]
                setTimesBlockedFromEachDay(dataTemp)
                return
            }

            if (dataTemp[propName].includes(time)) {
                dataTemp[propName] = dataTemp[propName].filter(item => item !== time)
                setTimesBlockedFromEachDay(dataTemp)

                return
            }

            dataTemp[propName].push(time)
            setTimesBlockedFromEachDay(dataTemp)

        }
        else setTimesBlockedFromEachDay({ ...dataTemp, [propName]: [time] });
    }

    const handleConfirm = async () => {
        setIsLoading(true)
        await blockedTimes(userData.uid, timesBlockedFromEachDay, setSomethingWrong)
        setModalContent({
            image: <DataUpdated />,
            mainMessage: "Atualizado com Sucesso!",
            message: "Nos horários dos dias selecionados, não é mais permitido que os usuários agendem.",
            firstButtonText: "Continuar",
            firstButtonAction: () => {
                navigation.goBack()
                setModalContent(null)
            }
        })
        setIsLoading(false)
    }

    const daysWithBlockedTimes = {}

    for (const day in timesBlockedFromEachDay) {
        if (timesBlockedFromEachDay[day].length === 0) continue

        daysWithBlockedTimes[day] = {
            selected: true,
            marked: true,
            selectedColor: "#00000050",
        }
    }

    const markedDays = {
        ...daysWithBlockedTimes,
        ...blockedDays,
        ...day,
        ...weekdaysBlocked,
    }

    if (isLoading) return <Loading flexSize={1} />

    return (
        <ScrollView
            contentContainerStyle={globalStyles.container}
            overScrollMode="never"
            bounces={false}
        >
            <ComeBack text={"Bloquear Horários"} />
            <DefaultModal modalContent={modalContent} />

            <Text style={styles.title}>Selecione o dia no calendário e quais horários você quer bloquear.</Text>
            <Text style={styles.text}>Os dias que tiverem horários bloqueados ficarão marcados.</Text>

            <Calendar
                context={{ date: '' }}
                minDate={date.toString()}
                maxDate={`${year}-${month}-${maxDay}`}
                markedDates={markedDays}
                onDayPress={day => handleDay(day.dateString)}
                onMonthChange={(data) => setLastMonthSelected(data.dateString)}
                style={globalStyles.styleCalendar}
                theme={globalStyles.themeCalendar}
            />

            <View style={styles.content}>
                {
                    (timesFromDaySelected && day) && <Text style={styles.description}>Os horários selecionados serão bloqueados</Text>
                }

                {
                    day &&
                    (
                        <>
                            {

                                timesFromDaySelected ?
                                    timesFromDaySelected.map((time, index) => {
                                        const timesBlocked = timesBlockedFromEachDay[Object.keys(day)[0]]
                                        if (timesBlocked) {
                                            return (
                                                <TouchableOpacity
                                                    style={timesBlocked.includes(time) ? [styles.schedule, { backgroundColor: globalStyles.orangeColor }] : styles.schedule}
                                                    onPress={() => handleTime(time)}
                                                    key={index}
                                                >
                                                    <Text style={timesBlocked.includes(time) ? [styles.time, { color: "#FFFFFF" }] : styles.time}>{time}</Text>
                                                </TouchableOpacity>
                                            )
                                        }

                                        return (
                                            <TouchableOpacity
                                                style={styles.schedule}
                                                onPress={() => handleTime(time)}
                                                key={index}
                                            >
                                                <Text style={styles.time}>{time}</Text>
                                            </TouchableOpacity>
                                        )
                                    }) :
                                    <Loading />
                            }
                        </>
                    )
                }
            </View>

            <Button
                text={"Confirmar"}
                action={handleConfirm}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyMedium,
        color: "#000000",
        width: "100%",
        marginVertical: 20,
    },

    text: {
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
        color: "#000000",
        width: "100%"
    },

    content: {
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

    description: {
        fontSize: globalStyles.fontSizeVerySmall,
        fontFamily: globalStyles.fontFamilyBold,
        color: "#00000080",
        textAlign: "center",
        width: "100%",
        marginBottom: 20
    }
})