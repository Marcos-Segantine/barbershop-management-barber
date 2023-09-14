import { Modal, View, Text, StyleSheet } from "react-native"

import { Button } from "../Button"

import { ContactImage } from "../../assets/imgs/ContactImage"
import { globalStyles } from "../../assets/globalStyles"

export const Contact = ({ modalContact, setModalVisible }) => {
    return (
        <Modal
            visible={modalContact}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.container}>

                <ContactImage width={"100%"} height={"45%"} />

                <View style={styles.content}>

                    <View style={styles.contact}>
                        <Text style={styles.info}>
                            <Text style={{ fontFamily: globalStyles.fontFamilyBold }}>Nome: </Text>
                            Contato 1
                        </Text>
                        <Text style={styles.info}>
                            <Text style={{ fontFamily: globalStyles.fontFamilyBold }}>Número: </Text>
                            Contato 1
                        </Text>
                    </View>

                    <View style={styles.contact}>
                        <Text style={styles.info}>
                            <Text style={{ fontFamily: globalStyles.fontFamilyBold }}>Nome: </Text>
                            Contato 1
                        </Text>
                        <Text style={styles.info}>
                            <Text style={{ fontFamily: globalStyles.fontFamilyBold }}>Número: </Text>
                            Contato 1
                        </Text>
                    </View>

                    <View style={styles.contact}>
                        <Text style={styles.info}>
                            <Text style={{ fontFamily: globalStyles.fontFamilyBold }}>Nome: </Text>
                            Contato 1
                        </Text>
                        <Text style={styles.info}>
                            <Text style={{ fontFamily: globalStyles.fontFamilyBold }}>Número: </Text>
                            Contato 1
                        </Text>
                    </View>
                </View>

                <Button
                    text={"Confirmar"}
                    action={() => setModalVisible(false)}
                    addStyles={{ width: "100%" }}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: "space-around",
        paddingBottom: 20,
        paddingHorizontal: "5%",
    },

    content: {
        width: "100%",
    },

    contact: {
        marginBottom: 15
    },

    info: {
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyMedium,
        color: "#000000"
    }
})