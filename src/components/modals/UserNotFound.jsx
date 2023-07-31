import { Modal, View, StyleSheet, Text, Image } from "react-native"

import UserNotFoundImage from "../../assets/imgs/UserNotFoundImage.jpg"
import { globalStyles } from "../../assets/globalStyles"

import { Button } from "../Button"

export const UserNotFound = ({ notFoundUserVisible, setNotFoundUserVisible }) => {
    return (
        <Modal
            visible={notFoundUserVisible}
            transparent={true}
            animationType={"fade"}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image source={UserNotFoundImage} style={{ width: 300, height: 220, marginTop: "20%" }} />
                    <View style={{ width: "100%", alignItems: "center" }}>
                        <Text style={styles.mainMessage}>Cliente não encontrado</Text>
                        <Text style={styles.message}>Não existe nenhum cliente cadastrado com o email ou celular informado.</Text>

                        <Button
                            text={"Tentar novamente"}
                            addStyles={{ marginBottom: 10 }}
                            action={() => setNotFoundUserVisible(false)}
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
        justifyContent: "center",
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

    content: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "80%",
        height: "70%"
    }
})
