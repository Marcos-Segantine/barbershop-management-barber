import { useContext } from "react"
import { Modal, StyleSheet, View, Text } from "react-native"
import { SomethingWrongContext } from "../../context/SomethingWrongContext"

import { globalStyles } from "../../assets/globalStyles"
import { SomethingWrongImage } from "../../assets/imgs/SomethingWrongImage"

import { Button } from "../Button"
import { useNavigation } from "@react-navigation/native"

export const SomethingWrong = () => {
    const { somethingWrong, setSomethingWrong } = useContext(SomethingWrongContext)

    const navigation = useNavigation()

    const handleHome = () => {
        setSomethingWrong(false)
        navigation.navigate("Home")
    }

    return (
        <Modal
            visible={somethingWrong}
            transparent={true}
            animationType={"fade"}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <SomethingWrongImage height={"60%"} />

                    <Text style={styles.mainMessage}>Algo deu errado!</Text>
                    <Text style={styles.message}>Sentimos muito mas ocorreu um erro, por favor tente novamente mais tarde. Caso queira pode entrar em contato conosco</Text>

                    <Button
                        text={"Home"}
                        addStyles={{ marginBottom: 10 }}
                        action={handleHome}
                    />
                    <Button
                        text={"Nossos Contatos"}
                        addStyles={{ backgroundColor: "#fff8ef" }}
                        addStylesText={{ color: globalStyles.orangeColor }}
                    />
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
        width: "80%",
    },

    mainMessage: {
        color: globalStyles.orangeColor,
        fontSize: globalStyles.fontSizeMedium,
        fontWeight: globalStyles.fontFamilyBold,
    },

    message: {
        color: "#000000",
        fontSize: globalStyles.fontSizeSmall,
        marginVertical: 15,
        fontWeight: globalStyles.fontFamilyBold,
        maxWidth: "80%",
        textAlign: 'center',
    },
})
