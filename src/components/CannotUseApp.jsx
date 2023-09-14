import { StyleSheet, Text, View } from "react-native";

import LottieView from "lottie-react-native";

import { globalStyles } from "../assets/globalStyles";

import { Contact } from "./modals/Contact";
import { useState } from "react";

export const CannotUseApp = ({ width = "100%", height = "40%" }) => {
    const [contactModal, setContactModal] = useState(false);
    const handleContact = () => setContactModal(true)

    return (
        <View style={styles.container}>
            <Contact
                modalContact={contactModal}
                setModalVisible={setContactModal}
            />

            <LottieView
                source={require("../assets/animations/accessDenied.json")}
                loop
                autoPlay
                style={{ width, height, }}
            />

            <Text style={styles.title}>No momento você não pode acessar o aplicativo</Text>
            <Text style={styles.text}>Para mais informações entre em
                <Text style={styles.contactButtonText} onPress={handleContact}> contato </Text>
                conosco.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        fontSize: globalStyles.fontSizeLarger,
        fontFamily: globalStyles.fontFamilyBold,
        color: globalStyles.orangeColor,
        textAlign: "center"
    },

    text: {
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyMedium,
        marginTop: 20
    },

    contactButtonText: {
        color: globalStyles.orangeColor,
        fontFamily: globalStyles.fontFamilyBold,
    }
})
