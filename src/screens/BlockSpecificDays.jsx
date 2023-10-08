import { Text, ScrollView, StyleSheet } from "react-native"
import { useContext, useEffect, useState } from "react";

import { Calendar, LocaleConfig } from 'react-native-calendars';

import { ComeBack } from "../components/ComeBack";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";

import { globalStyles } from "../assets/globalStyles";
import { DataUpdated } from "../assets/imgs/DataUpdated";

import { daysBlocked } from "../services/schedules/daysBlocked";

import { UserContext } from "../context/UserContext";

import { DefaultModal } from "../components/modals/DefaultModal";
import { SettingsContext } from "../context/SettingsContext";

import { getWeekdayFromMonth } from "../utils/getWeekdayFromMonth";
import { getMonth, getYear } from "../utils/dateHelper";

export const BlockSpecificDays = ({ navigation }) => {
    const [days, setDays] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const [weekdaysBlocked, setWeekdaysBlocked] = useState([])
    const [lastMonthSelected, setLastMonthSelected] = useState(null)

    const { userData } = useContext(UserContext)
    const { settings } = useContext(SettingsContext)

    LocaleConfig.defaultLocale = 'pt-br';

    useEffect(() => {

        const deniedDays = async () => {
            const data = await daysBlocked(userData.uid, false)

            for (const date in data) {
                data[date] = {
                    selected: true,
                    marked: true,
                    selectedColor: globalStyles.orangeColor,
                }
            }

            setDays(data);
        }

        if (days === null) deniedDays()

        const settingsBlockedWeekdays = () => {
            const formatDeniedDays = (data) => {
                const result = {}

                for (const day of data) {
                    result[day] = {
                        disableTouchEvent: true,
                        disabled: true
                    }
                }

                return result
            }

            if (lastMonthSelected === null) {
                const date = new Date()
                const currentYear = date.getFullYear()
                const currentMonth = date.getMonth() + 1
                const monthFormatted = currentMonth < 10 ? `0${currentMonth}` : currentMonth

                const data = []

                for (const weekday of settings.blockedWeekdays) {
                    data.push(getWeekdayFromMonth(weekday, monthFormatted, currentYear))

                    const result = []

                    for (const dates of data) {

                        for (const day of dates) {
                            const dayFormatted = day < 10 ? `0${day}` : day
                            result.push(`${currentYear}-${monthFormatted}-${dayFormatted}`)

                        }
                    }

                    setWeekdaysBlocked(formatDeniedDays(result));
                }

                return
            }
            else {

                const data = []

                for (const weekday of settings.blockedWeekdays) {
                    data.push(getWeekdayFromMonth(weekday, getMonth(lastMonthSelected), getYear(lastMonthSelected)))

                    const result = []

                    for (const dates of data) {

                        for (const day of dates) {
                            const currentYear = getYear(lastMonthSelected)
                            const currentMonth = getMonth(lastMonthSelected)
                            const dayFormatted = day < 10 ? `0${day}` : day

                            result.push(`${currentYear}-${currentMonth}-${dayFormatted}`)
                        }
                    }

                    setWeekdaysBlocked(formatDeniedDays(result));
                }

                return
            }

        }

        settingsBlockedWeekdays()
        setIsLoading(false)

    }, [lastMonthSelected, userData])

    const date = new Date();
    const year = date.getFullYear() + 1
    const month = 12
    const day = 25

    const handleDays = (day) => {
        if (days[day] !== undefined) {
            // Day is already selected, unselect it
            const updatedDays = { ...days };
            delete updatedDays[day];
            setDays(updatedDays);
        } else {
            // Day is not selected, select it
            setDays((prevDays) => ({
                ...prevDays,
                [day]: {
                    selected: true,
                    marked: true,
                    selectedColor: globalStyles.orangeColor,
                },
            }));
        }
    };

    const handleConfirm = async () => {
        setIsLoading(true)

        await daysBlocked(userData.uid, false, days)

        setIsLoading(false)
        setModalContent({
            image: <DataUpdated />,
            mainMessage: "Atualizado com sucesso!",
            message: "Agora não haverá mais agendamentos nos dias selecionados.",
            firstButtonText: "Continuar",
            firstButtonAction: () => {
                navigation.goBack()
                setModalContent(null)
            }
        })
    }

    if (isLoading) return <Loading flexSize={1} />

    return (
        <ScrollView
            contentContainerStyle={globalStyles.container}
            overScrollMode="never"
            bounces={false}
        >
            <ComeBack text={"Bloquear Dias"} />
            <DefaultModal modalContent={modalContent} />

            <Text style={styles.title}>Selecione no calendário os dias que ficarão indisponiveis para os seus clientes.</Text>
            <Text style={styles.text}>Os dias marcados serão bloqueados.</Text>

            <Calendar
                context={{ date: '' }}
                minDate={date.toString()}
                maxDate={`${year}-${month}-${day}`}
                markedDates={{ ...days, ...weekdaysBlocked }}
                onDayPress={day => handleDays(day.dateString)}
                onMonthChange={(data) => setLastMonthSelected(data.dateString)}
                style={globalStyles.styleCalendar}
                theme={globalStyles.themeCalendar}
            />

            <Button
                text={'Confirmar'}
                action={handleConfirm}
                addStyles={{ marginTop: 20 }}
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
        marginTop: 30,
        marginBottom: 20
    },

    text: {
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
        color: "#000000",
        width: "100%"
    },
})