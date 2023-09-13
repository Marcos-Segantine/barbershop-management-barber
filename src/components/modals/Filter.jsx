import { StyleSheet, Text, View, Modal, Pressable } from "react-native"
import { useState } from "react"

import { globalStyles } from "../../assets/globalStyles"

import { Button } from "../Button"

import { getMonthName } from "../../utils/getMonthName"

export const Filter = ({ visible, setShowModalFilter, dateToFilter, setDateToFilter }) => {
    const [dateToFilterTemp, setDateToFilterTemp] = useState(dateToFilter)

    const currentYear = +new Date().getFullYear()

    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    const years = [String(currentYear), String(currentYear + 1), String(currentYear + 2)]

    const handleYear = (newYear) => {
        if (newYear === dateToFilterTemp[0]) {
            setDateToFilterTemp([null, dateToFilterTemp[1]])

            return
        }

        setDateToFilterTemp([newYear, dateToFilterTemp[1]])
    }

    const handleMonth = (newMonth) => {
        if (newMonth === dateToFilterTemp[1]) {
            setDateToFilterTemp([dateToFilterTemp[0], null])

            return
        }

        setDateToFilterTemp([dateToFilterTemp[0], newMonth])
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType={"fade"}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Aplicar Filtros</Text>

                    <Text style={styles.description}>Ano</Text>

                    <View style={styles.contentYear}>
                        {
                            years.map(year => {
                                return (
                                    <Pressable
                                        style={dateToFilterTemp[0] === year ? [styles.item, { backgroundColor: globalStyles.orangeColor }] : styles.item}
                                        onPress={() => handleYear(year)}
                                    >
                                        <Text style={dateToFilterTemp[0] === year ? [styles.itemText, { color: "white" }] : styles.itemText}>{year}</Text>
                                    </Pressable>
                                )
                            })
                        }

                    </View>

                    <Text style={[styles.description, { marginTop: 30 }]}>Mês</Text>

                    <View style={[styles.contentMonth, {}]}>
                        {
                            months.map(month => {
                                return (
                                    <Pressable style={dateToFilterTemp[1] === month ? [styles.item, { backgroundColor: globalStyles.orangeColor, marginBottom: 5 }] : [styles.item, { marginBottom: 5 }]}>
                                        <Text
                                            style={dateToFilterTemp[1] === month ? [styles.itemText, { color: "white" }] : styles.itemText}
                                            onPress={() => handleMonth(month)}
                                        >
                                            {getMonthName(month, true)}
                                        </Text>
                                    </Pressable>
                                )
                            })
                        }

                    </View>

                    <View style={styles.contentButtons}>
                        <Button
                            text={"Cancelar"}
                            addStyles={{ width: "45%", backgroundColor: globalStyles.champagneColor }}
                            addStylesText={{ color: globalStyles.orangeColor }}
                            action={() => setShowModalFilter(false)}
                        />
                        <Button
                            text={"Confirmar"}
                            addStyles={{ width: "45%" }}
                            action={() => {
                                setDateToFilter(dateToFilterTemp)
                                setShowModalFilter(false)
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000090',
        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        alignItems: 'center',
        width: "85%",
        justifyContent: "space-around",
        paddingVertical: 20,
        paddingHorizontal: 15
    },

    title: {
        color: globalStyles.orangeColor,
        fontFamily: globalStyles.fontFamilyBold,
        fontSize: globalStyles.fontSizeLarger,
        marginBottom: 20,
    },

    description: {
        fontSize: globalStyles.fontSizeMedium,
        color: "#000000",
        fontFamily: globalStyles.fontFamilyBold,
        width: "100%"
    },

    contentYear: {
        width: "100%",
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    contentMonth: {
        width: "100%",
        marginTop: 15,
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: "space-between",
    },

    item: {
        width: "30%",
        paddingVertical: 10,
        borderColor: globalStyles.orangeColor,
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: "center"
    },

    itemText: {
        color: globalStyles.orangeColor,
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
        textAlign: 'center'
    },

    contentButtons: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20
    },
})