import { StyleSheet, PixelRatio } from "react-native";

import { LocaleConfig } from "react-native-calendars";
import { getScreenDimensions } from "../utils/getScreenDimensions";
import { useContext } from "react";
import { SomethingWrongContext } from "../context/SomethingWrongContext";

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;

const { setSomethingWrong } = useContext(SomethingWrongContext)

const width = getScreenDimensions("width", null, setSomethingWrong);

export const globalStyles = StyleSheet.create({
    orangeColor: "#fc9501",
    orangeColorDarker: "#b16401",
    champagneColor: "#fff8ef",
    fontFamilyMedium: "Satoshi-Medium",
    fontFamilyBold: "Satoshi-Bold",
    fontFamilyLight: "Satoshi-Light",
    fontSizeVerySmall: getFontSize(12),
    fontSizeSmall: getFontSize(16),
    fontSizeMedium: getFontSize(26),
    fontSizeLarger: getFontSize(32),
    fontSizeVeryLarger: getFontSize(42),
    container: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    themeCalendar: {
        calendarBackground: "#fff8ef",
        dayTextColor: '#000000',
        selectedDayTextColor: "#fff8ef",
        selectedDayBackgroundColor: '#000000',
        textDisabledColor: '#00000040',
        textSectionTitleColor: '#000000',
        arrowColor: '#000000',
        monthTextColor: '#000000',
        textDayHeaderFontWeight: '700',
    },

    styleCalendar: {
        width: width - 20,
        padding: 5,
        borderRadius: 20,
        marginBottom: 20
    },

})
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