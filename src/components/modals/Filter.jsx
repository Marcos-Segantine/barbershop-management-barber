import { StyleSheet, Text, View, Modal, Pressable } from "react-native"
import { useEffect, useState } from "react"

import { globalStyles } from "../../assets/globalStyles"
import { CloseIcon } from "../../assets/icons/CloseIcon"

import { Button } from "../Button"

import { getMonthName } from "../../utils/getMonthName"

export const Filter = ({ visible, setShowModalFilter, dateToFilter, setDateToFilter }) => {
    const [dateToFilterTemp, setDateToFilterTemp] = useState(dateToFilter)

    const currentYear = +new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1

    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    const years = [String(currentYear), String(currentYear + 1), String(currentYear + 2)]

    useEffect(() => {
        if (+dateToFilterTemp[0] === +currentYear) {
            if (+dateToFilterTemp[1] < +currentMonth) {
                const monthFormatted = currentMonth < 10 ? `0${currentMonth}` : currentMonth
                const yearFormatted = String(currentYear)

                setDateToFilterTemp([yearFormatted, monthFormatted])
            }
        }

    }, [dateToFilterTemp[0]])

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
                            years.map((year) => {
                                if (dateToFilterTemp[0] === year) {
                                    return (
                                        <Pressable
                                            key={year}
                                            style={[styles.item, { backgroundColor: globalStyles.orangeColor }]}
                                            onPress={() => handleYear(year)}
                                        >
                                            <View style={{ backgroundColor: "#e74c3c", width: 20, height: 20, borderRadius: 20, position: "absolute", top: -5, right: -5, justifyContent: "center", alignItems: "center" }}>
                                                <CloseIcon width={16} height={16} color="white" />
                                            </View>

                                            <Text style={[styles.itemText, { color: "white" }]}>{year}</Text>
                                        </Pressable>
                                    )
                                }

                                return (
                                    <Pressable
                                        key={year}
                                        style={styles.item}
                                        onPress={() => handleYear(year)}
                                    >
                                        <Text style={styles.itemText}>{year}</Text>
                                    </Pressable>
                                )
                            })
                        }

                    </View>

                    <Text style={[styles.description, { marginTop: 30 }]}>Mês</Text>

                    <View style={[styles.contentMonth, {}]}>
                        {
                            months.map(month => {
                                if (dateToFilterTemp[1] === month) {
                                    return (
                                        <Pressable
                                            key={month}
                                            style={[styles.item, { backgroundColor: globalStyles.orangeColor, marginBottom: 5 }]}
                                            onPress={() => handleMonth(month)}
                                        >
                                            <View style={{ backgroundColor: "#e74c3c", width: 20, height: 20, borderRadius: 20, position: "absolute", top: -5, right: -5, justifyContent: "center", alignItems: "center" }}>
                                                <CloseIcon width={16} height={16} color="white" />
                                            </View>

                                            <Text
                                                style={[styles.itemText, { color: "white" }]}
                                            >
                                                {getMonthName(month, true)}
                                            </Text>
                                        </Pressable>
                                    )
                                }

                                else if (Number(month) < currentMonth && +dateToFilterTemp[0] === +currentYear) {
                                    return (
                                        <Pressable
                                            key={month}
                                            style={[styles.item, { marginBottom: 5, backgroundColor: "#D9DDDC", borderColor: "#D9DDDC" }]}
                                        >
                                            <Text
                                                style={[styles.itemText, { color: "#808080" }]}
                                            >
                                                {getMonthName(month, true)}
                                            </Text>
                                        </Pressable>
                                    )
                                }

                                return (
                                    <Pressable
                                        key={month}
                                        style={[styles.item, { marginBottom: 5 }]}
                                        onPress={() => handleMonth(month)}
                                    >
                                        <Text
                                            style={styles.itemText}
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