import { Dimensions, StyleSheet, Text } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { ScheduleContext } from '../context/ScheduleContext';
import { UserContext } from '../context/UserContext';
import { SettingsContext } from '../context/SettingsContext';

import { Calendar, LocaleConfig } from 'react-native-calendars';

import { globalStyles } from '../assets/globalStyles';

import { getWeekdayFromMonth } from '../utils/getWeekdayFromMonth';
import { getMonth, getYear } from '../utils/dateHelper';

import { daysBlocked } from '../services/schedules/daysBlocked';

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

export const CalendarComponent = () => {
    const [deniedDaysData, setDeniedDaysData] = useState(null)
    const [weekdaysBlocked, setWeekdaysBlocked] = useState([])
    const [lastMonthSelected, setLastMonthSelected] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { schedule, setSchedule } = useContext(ScheduleContext)
    const { userData } = useContext(UserContext)
    const { settings } = useContext(SettingsContext)

    LocaleConfig.defaultLocale = 'pt-br';

    useEffect(() => {

        const deniedDays = async () => {
            setDeniedDaysData(await daysBlocked(userData.uid, false));
        }

        if (deniedDaysData === null) deniedDays()

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

    }, [lastMonthSelected])

    useEffect(() => {
        setSchedule({ ...schedule, schedule: null })

    }, [schedule.day])

    const markedDatesCalendar = {
        ...deniedDaysData,
        ...weekdaysBlocked,
        [schedule.day]: {
            selected: true,
            marked: true,
            selectedColor: globalStyles.orangeColor,
        },
    };

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
    };

    const date = new Date();
    const year = date.getFullYear() + 1
    const month = 12
    const day = 25

    const handleOnMonthChange = (data) => {
        setIsLoading(true)
        setLastMonthSelected(data)
    }

    const handleDayPress = (date) => {
        if (isLoading) return
        setSchedule({ ...schedule, day: date })
    }

    return (
        <>
            <Text style={styles.text}>Escolha um dia</Text>

            <Calendar
                context={{ date: '' }}
                minDate={date.toString()}
                maxDate={`${year}-${month}-${day}`}
                markedDates={{ ...markedDatesCalendar }}
                onDayPress={day => handleDayPress(day.dateString)}
                onMonthChange={(data) => handleOnMonthChange(data.dateString)}
                style={styleCalendar}
                displayLoadingIndicator={isLoading}
                theme={themeCalendar}
            />
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "#000000",
        fontFamily: globalStyles.fontFamilyBold,
        width: "100%",
        fontSize: globalStyles.fontSizeSmall,
        marginTop: 30,
        marginBottom: 10,
    },
})