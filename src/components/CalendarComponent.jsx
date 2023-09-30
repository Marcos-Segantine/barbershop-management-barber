import { Dimensions, StyleSheet, Text } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { ScheduleContext } from '../context/ScheduleContext';
import { UserContext } from '../context/UserContext';

import { Calendar, LocaleConfig } from 'react-native-calendars';

import { globalStyles } from '../assets/globalStyles';

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
    const [deniedDays, setDeniedDays] = useState({})

    const { schedule, setSchedule } = useContext(ScheduleContext)
    const { userData } = useContext(UserContext)

    LocaleConfig.defaultLocale = 'pt-br';

    useEffect(() => {

        (async () => {

            setDeniedDays(await daysBlocked(userData.uid, false));

        })();

    }, [])

    
    const markedDatesCalendar = {
        ...deniedDays,
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

    return (
        <>
            <Text style={styles.text}>Escolha um dia</Text>

            <Calendar
                context={{ date: '' }}
                minDate={String(new Date())}
                markedDates={markedDatesCalendar}
                onDayPress={day =>
                    setSchedule({ ...schedule, day: day.dateString })
                }
                style={styleCalendar}
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