import { StyleSheet, Text, View, Modal, Pressable } from "react-native"

import { globalStyles } from "../../assets/globalStyles"

import { Button } from "../Button"

export const Filter = ({ visible, showModalFilter, setShowModalFilter }) => {
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
                        <Pressable style={styles.item}>
                            <Text style={styles.itemText}>2023</Text>
                        </Pressable>

                        <Pressable style={styles.item}>
                            <Text style={styles.itemText}>2023</Text>
                        </Pressable>

                        <Pressable style={styles.item}>
                            <Text style={styles.itemText}>2023</Text>
                        </Pressable>
                    </View>

                    <Text style={[styles.description, { marginTop: 30 }]}>Mês</Text>

                    <View style={[styles.contentMonth, {}]}>
                        <Pressable style={[styles.item, { marginBottom: 5 }]}>
                            <Text style={styles.itemText}>Jan</Text>
                        </Pressable>

                        <Pressable style={[styles.item, { marginBottom: 5 }]}>
                            <Text style={styles.itemText}>Fev</Text>
                        </Pressable>

                        <Pressable style={[styles.item, { marginBottom: 5 }]}>
                            <Text style={styles.itemText}>Mar</Text>
                        </Pressable>

                        <Pressable style={[styles.item, { marginBottom: 5 }]}>
                            <Text style={styles.itemText}>Abr</Text>
                        </Pressable>

                        <Pressable style={[styles.item, { marginBottom: 5 }]}>
                            <Text style={styles.itemText}>Mai</Text>
                        </Pressable>

                        <Pressable style={[styles.item, { marginBottom: 5 }]}>
                            <Text style={styles.itemText}>Jun</Text>
                        </Pressable>
                        <Pressable style={[styles.item, { marginBottom: 5 }]}>
                            <Text style={styles.itemText}>Jul</Text>
                        </Pressable>

                        <Pressable style={[styles.item, { marginBottom: 5 }]}>
                            <Text style={styles.itemText}>Ago</Text>
                        </Pressable>

                        <Pressable style={[styles.item, { marginBottom: 5 }]}>
                            <Text style={styles.itemText}>Set</Text>
                        </Pressable>
                        <Pressable style={[styles.item, { marginBottom: 5 }]}>
                            <Text style={styles.itemText}>Out</Text>
                        </Pressable>

                        <Pressable style={[styles.item, { marginBottom: 5 }]}>
                            <Text style={styles.itemText}>Nov</Text>
                        </Pressable>

                        <Pressable style={[styles.item, { marginBottom: 5 }]}>
                            <Text style={styles.itemText}>Dez</Text>
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