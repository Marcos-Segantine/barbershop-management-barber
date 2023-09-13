import { StyleSheet, Text, View, Modal, Pressable } from "react-native"
import { useState } from "react"

import { globalStyles } from "../../assets/globalStyles"

import { Button } from "../Button"

export const Filter = ({ visible, setShowModalFilter, dateToFilter, setDateToFilter }) => {
    const [dateToFilterTemp, setDateToFilterTemp] = useState(dateToFilter)

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
                        <Pressable
                            style={dateToFilterTemp[0] === "2023" ? [styles.item, { backgroundColor: globalStyles.orangeColor }] : styles.item}
                            onPress={() => handleYear("2023")}
                        >
                            <Text style={dateToFilterTemp[0] === "2023" ? [styles.itemText, { color: "white" }] : styles.itemText}>2023</Text>
                        </Pressable>

                        <Pressable
                            style={dateToFilterTemp[0] === "2024" ? [styles.item, { backgroundColor: globalStyles.orangeColor }] : styles.item}
                            onPress={() => handleYear("2024")}
                        >
                            <Text style={dateToFilterTemp[0] === "2024" ? [styles.itemText, { color: "white" }] : styles.itemText}>2024</Text>
                        </Pressable>

                        <Pressable
                            style={dateToFilterTemp[0] === "2025" ? [styles.item, { backgroundColor: globalStyles.orangeColor }] : styles.item}
                            onPress={() => handleYear("2025")}
                        >
                            <Text style={dateToFilterTemp[0] === "2025" ? [styles.itemText, { color: "white" }] : styles.itemText}>2025</Text>
                        </Pressable>
                    </View>

                    <Text style={[styles.description, { marginTop: 30 }]}>Mês</Text>

                    <View style={[styles.contentMonth, {}]}>
                        <Pressable style={dateToFilterTemp[1] === "01" ? [styles.item, { backgroundColor: globalStyles.orangeColor, marginBottom: 5 }] : [styles.item, { marginBottom: 5 }]}>
                            <Text
                                style={dateToFilterTemp[1] === "01" ? [styles.itemText, { color: "white" }] : styles.itemText}
                                onPress={() => handleMonth("01")}
                            >
                                Jan</Text>
                        </Pressable>

                        <Pressable style={dateToFilterTemp[1] === "02" ? [styles.item, { backgroundColor: globalStyles.orangeColor, marginBottom: 5 }] : [styles.item, { marginBottom: 5 }]}>
                            <Text
                                style={dateToFilterTemp[1] === "02" ? [styles.itemText, { color: "white" }] : styles.itemText}
                                onPress={() => handleMonth("02")}
                            >
                                Fev</Text>
                        </Pressable>

                        <Pressable style={dateToFilterTemp[1] === "03" ? [styles.item, { backgroundColor: globalStyles.orangeColor, marginBottom: 5 }] : [styles.item, { marginBottom: 5 }]}>
                            <Text
                                style={dateToFilterTemp[1] === "03" ? [styles.itemText, { color: "white" }] : styles.itemText}
                                onPress={() => handleMonth("03")}
                            >
                                Mar</Text>
                        </Pressable>

                        <Pressable style={dateToFilterTemp[1] === "04" ? [styles.item, { backgroundColor: globalStyles.orangeColor, marginBottom: 5 }] : [styles.item, { marginBottom: 5 }]}>
                            <Text
                                style={dateToFilterTemp[1] === "04" ? [styles.itemText, { color: "white" }] : styles.itemText}
                                onPress={() => handleMonth("04")}
                            >
                                Abr</Text>
                        </Pressable>

                        <Pressable style={dateToFilterTemp[1] === "05" ? [styles.item, { backgroundColor: globalStyles.orangeColor, marginBottom: 5 }] : [styles.item, { marginBottom: 5 }]}>
                            <Text
                                style={dateToFilterTemp[1] === "05" ? [styles.itemText, { color: "white" }] : styles.itemText}
                                onPress={() => handleMonth("05")}
                            >
                                Mai</Text>
                        </Pressable>

                        <Pressable style={dateToFilterTemp[1] === "06" ? [styles.item, { backgroundColor: globalStyles.orangeColor, marginBottom: 5 }] : [styles.item, { marginBottom: 5 }]}>
                            <Text
                                style={dateToFilterTemp[1] === "06" ? [styles.itemText, { color: "white" }] : styles.itemText}
                                onPress={() => handleMonth("06")}
                            >
                                Jun</Text>
                        </Pressable>
                        <Pressable style={dateToFilterTemp[1] === "07" ? [styles.item, { backgroundColor: globalStyles.orangeColor, marginBottom: 5 }] : [styles.item, { marginBottom: 5 }]}>
                            <Text
                                style={dateToFilterTemp[1] === "07" ? [styles.itemText, { color: "white" }] : styles.itemText}
                                onPress={() => handleMonth("07")}
                            >
                                Jul</Text>
                        </Pressable>

                        <Pressable style={dateToFilterTemp[1] === "08" ? [styles.item, { backgroundColor: globalStyles.orangeColor, marginBottom: 5 }] : [styles.item, { marginBottom: 5 }]}>
                            <Text
                                style={dateToFilterTemp[1] === "08" ? [styles.itemText, { color: "white" }] : styles.itemText}
                                onPress={() => handleMonth("08")}
                            >
                                Ago</Text>
                        </Pressable>

                        <Pressable style={dateToFilterTemp[1] === "09" ? [styles.item, { backgroundColor: globalStyles.orangeColor, marginBottom: 5 }] : [styles.item, { marginBottom: 5 }]}>
                            <Text
                                style={dateToFilterTemp[1] === "09" ? [styles.itemText, { color: "white" }] : styles.itemText}
                                onPress={() => handleMonth("09")}
                            >
                                Set</Text>
                        </Pressable>
                        <Pressable style={dateToFilterTemp[1] === "10" ? [styles.item, { backgroundColor: globalStyles.orangeColor, marginBottom: 5 }] : [styles.item, { marginBottom: 5 }]}>
                            <Text
                                style={dateToFilterTemp[1] === "10" ? [styles.itemText, { color: "white" }] : styles.itemText}
                                onPress={() => handleMonth("10")}
                            >
                                Out</Text>
                        </Pressable>

                        <Pressable style={dateToFilterTemp[1] === "11" ? [styles.item, { backgroundColor: globalStyles.orangeColor, marginBottom: 5 }] : [styles.item, { marginBottom: 5 }]}>
                            <Text
                                style={dateToFilterTemp[1] === "11" ? [styles.itemText, { color: "white" }] : styles.itemText}
                                onPress={() => handleMonth("11")}
                            >
                                Nov</Text>
                        </Pressable>

                        <Pressable style={dateToFilterTemp[1] === "12" ? [styles.item, { backgroundColor: globalStyles.orangeColor, marginBottom: 5 }] : [styles.item, { marginBottom: 5 }]}>
                            <Text
                                style={dateToFilterTemp[1] === "12" ? [styles.itemText, { color: "white" }] : styles.itemText}
                                onPress={() => handleMonth("12")}
                            >
                                Dez</Text>
                        </Pressable>

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