import { SafeAreaView, Text, StyleSheet, View, Image } from "react-native"
import { useContext, useEffect, useState } from "react";

import { globalStyles } from "../assets/globalStyles"

import { SomethingWrongContext } from "../context/SomethingWrongContext";

import { verifyIfUserLogged } from "../validation/verifyIfUserLogged";

import { CannotUseApp } from "../components/CannotUseApp";

export const Welcome = ({ navigation }) => {
    const [blockAccessData, setBlockAccessData] = useState(null)

    const { setSomethingWrong } = useContext(SomethingWrongContext)

    useEffect(() => {
        ((async () => {

            const response = await fetch('https://southamerica-east1-barber-ddb8a.cloudfunctions.net/canUseApp');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            if (data.response === "true") {
                verifyIfUserLogged(navigation, setSomethingWrong);
            }
            else if (data.response === "[maintenance]") {
                setBlockAccessData({
                    mainMessage: "Estamos em manutenção por favor aguarde um momento, agradecemos sua compressão.",
                    showContact: false
                })
            }
            else if (data.response === "[update required]") {
                setBlockAccessData({
                    mainMessage: "Por favor atualize o aplicativo para a versão mais recente.",
                    showContact: false
                })
            }
            else {
                setBlockAccessData({
                    mainMessage: "Você não pode acessar o aplicativo agora.",
                    showContact: true
                })
            }

        }))();

    }, []);

    if (blockAccessData !== null) return <CannotUseApp data={blockAccessData} />

    return (
        <SafeAreaView style={styles.container}>

            <Image
                style={styles.img}
                source={require("../assets/imgs/welcomeImage.jpg")}
            />

            <View style={styles.content}>
                <Text style={styles.title}>Seja Bem-Vindo a</Text>
                <Text style={styles.companyName}>WD3 Barbearia</Text>
                <Text style={{ color: "#FFFFFF", fontSize: globalStyles.fontSizeSmall, fontFamily: globalStyles.fontFamilyLight }}>The best app for barbers in Nova Ponte</Text>
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
        color: "#FFFFFF",
    },

    companyName: {
        color: globalStyles.orangeColor,
        fontFamily: globalStyles.fontFamilyBold,
        fontSize: globalStyles.fontSizeLarger,
        marginTop: 10,
        marginBottom: 20,
    },
})