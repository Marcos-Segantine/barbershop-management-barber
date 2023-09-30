import { useContext, useEffect, useState } from "react"
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native"

import { ComeBack } from "../components/ComeBack"
import { Loading } from "../components/Loading"
import { Button } from "../components/Button"
import { DefaultModal } from "../components/modals/DefaultModal"

import { getAllTimesFromProfessional } from "../services/schedules/getAllTimesFromProfessional"
import { blockedTimes } from "../services/schedules/blockedTimes"

import { Calendar, LocaleConfig } from "react-native-calendars"

import { globalStyles } from "../assets/globalStyles"
import { DataUpdated } from "../assets/imgs/DataUpdated"

import { UserContext } from "../context/UserContext"

import { sortByHour } from "../utils/sortByHour"

LocaleConfig.locales['pt-br'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ],
    monthNamesShort: [
        'jan',
        'fev',
        'mar',
        'abr',
        'maio',
        'jun',
        'jul',
        'ago',
        'set',
        'out',
        'nov',
        'dez',
    ],
    dayNames: [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Terç', 'Qua', 'Qui', 'Sex', 'Sáb'],
};

export const BlockSpecificTimes = ({ navigation }) => {
    const [day, setDay] = useState(null)
    const [timesFromDaySelected, setTimesFromDaySelected] = useState(null)
    const [timesBlockedFromEachDay, setTimesBlockedFromEachDay] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [modalContent, setModalContent] = useState(null)

    const { userData } = useContext(UserContext)

    useEffect(() => {

        (async () => {
            if (userData) setTimesBlockedFromEachDay(await blockedTimes(userData.uid))

            if (!!(!userData || day === null)) return

            const date = new Date(Object.keys(day)[0])
            const weekDay = date.getDay() + 1;
            const dayOfWeek = weekDay <= 5 ? "weekday" : weekDay === 6 ? "saturday" : "sunday"

            const data = await getAllTimesFromProfessional(userData.uid)

            setTimesFromDaySelected(sortByHour(data[dayOfWeek]))

        })();

    }, [day, userData])

    LocaleConfig.defaultLocale = 'pt-br';

    const themeCalendar = {
        calendarBackground: globalStyles.champagneColor,
        dayTextColor: '#000000',
        selectedDayTextColor: globalStyles.champagneColor,
        selectedDayBackgroundColor: '#000000',
        textDisabledColor: '#00000040',
        textSectionTitleColor: '#000000',
        arrowColor: '#000000',
        monthTextColor: '#000000',
        textDayHeaderFontWeight: '700',
    };

    const { width } = Dimensions.get('screen')
    const styleCalendar = {
        width: width - 20,
        padding: 5,
        borderRadius: 20,
        marginBottom: 20
    };

    const handleDay = (day) => {
        setDay((prevDays) => ({
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
        await blockedTimes(userData.uid, timesBlockedFromEachDay)
        setModalContent({
            image: <DataUpdated />,
            mainMessage: "Atualizado com sucesso!",
            message: "Os horários selecionados foram bloqueados.",
            firstButtonText: "Continuar",
            firstButtonAction: () => {
                navigation.goBack()
                setModalContent(null)
            }
        })
        setIsLoading(false)
    }

    // console.log(timesBlockedFromEachDay);

    const daysWithBlockedTimes = {}

    for (const day in timesBlockedFromEachDay) {
        if (timesBlockedFromEachDay[day].length === 0) continue

        daysWithBlockedTimes[day] = {
            selected: true,
            marked: true,
            selectedColor: globalStyles.orangeColor,
        }
    }

    const markedDays = {
        ...day,
        ...daysWithBlockedTimes
    }

    if(isLoading) return <Loading flexSize={1} />

    return (
        <ScrollView contentContainerStyle={globalStyles.container}>
            <ComeBack text={"Bloquear Horários"} />
            <DefaultModal modalContent={modalContent} />

            <Text style={styles.title}>Selecione o dia no calendario e quais horários você quer bloquear.</Text>
            <Text style={styles.text}>Os dias que tiverem horários bloqueados ficarão marcados.</Text>

            <Calendar
                context={{ date: '' }}
                minDate={String(new Date())}
                markedDates={markedDays}
                onDayPress={day => handleDay(day.dateString)}
                style={styleCalendar}
                theme={themeCalendar}
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
        color: "#00000090",
        textAlign: "center",
        width: "100%",
        marginBottom: 20
    }
})