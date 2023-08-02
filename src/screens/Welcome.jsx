import { SafeAreaView, Text, StyleSheet, View, Image } from "react-native"
import { useContext, useEffect } from "react";

import { globalStyles } from "../assets/globalStyles"

import { SomethingWrongContext } from "../context/SomethingWrongContext";

import { verifyIfUserLogged } from "../validation/verifyIfUserLogged";

export const Welcome = ({ navigation }) => {
    const { setSomethingWrong } = useContext(SomethingWrongContext)

    useEffect(() => {
        verifyIfUserLogged(navigation, setSomethingWrong)
    }, [])

    return (
        <SafeAreaView style={styles.container}>

            <Image
                style={styles.img}
                source={require("../assets/imgs/welcomeImage.jpg")}
            />

            <View style={styles.content}>
                <Text style={styles.title}>Seja Bem-Vindo a</Text>
                <Text style={styles.companyName}>WD3 Barbearia</Text>
                <Text style={{ color: "#FFFFFF" }}>The best app for barbers in Nova Ponte</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    img: {
        width: "100%",
        height: "100%"
    },

    content: {
        height: "30%",
        width: "100%",
        position: 'absolute',
        bottom: 0,
        paddingLeft: "10%",
    },

    title: {
        fontSize: globalStyles.fontSizeMedium,
        fontFamily: globalStyles.fontFamilyBold,
        color: "#FFFFFF"
    },

    companyName: {
        color: globalStyles.orangeColor,
        fontFamily: globalStyles.fontFamilyBold,
        fontSize: globalStyles.fontSizeLarger,
        marginTop: 10,
        marginBottom: 20,
    },
})