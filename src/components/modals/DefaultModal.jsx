import { Modal, View, StyleSheet, Text, Image } from "react-native"

import { globalStyles } from "../../assets/globalStyles"

import { Button } from "../Button"

export const DefaultModal = ({ modalContent }) => {
    if (!modalContent) return

    console.log(typeof modalContent.image);

    return (
        <Modal
            visible={!!modalContent}
            transparent={true}
            animationType={"fade"}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    {
                        typeof modalContent.image === "object" ?
                            modalContent.image :
                            <Image source={modalContent.image} style={{ width: "100%", height: 250 }} />


                    }

                    <View style={{ width: "100%", alignItems: "center" }}>
                        <Text style={styles.mainMessage}>{modalContent.mainMessage && modalContent.mainMessage}</Text>
                        <Text style={styles.message}>{modalContent.message && modalContent.message}</Text>
                    </View>

                    <View style={{ width: "100%", alignItems: "center", ...modalContent?.contentButtonsStyles }}>
                        <Button
                            text={modalContent.firstButtonText && modalContent.firstButtonText}
                            addStyles={modalContent.firstButtonStyles && modalContent.firstButtonStyles}
                            addStylesText={modalContent.firstButtonTextStyles && modalContent.firstButtonTextStyles}
                            action={modalContent.firstButtonAction && modalContent.firstButtonAction}
                        />

                        {
                            modalContent.secondButtonText && (
                                <Button
                                    text={modalContent.secondButtonText && modalContent.secondButtonText}
                                    addStyles={modalContent.secondButtonStyles ?
                                        { ...modalContent.secondButtonStyles, marginTop: 10, backgroundColor: globalStyles.champagneColor, color: globalStyles.orangeColor } :
                                        { marginTop: 10, backgroundColor: globalStyles.champagneColor, color: globalStyles.orangeColor }}
                                    addStylesText={modalContent.secondButtonTextStyles ? modalContent.secondButtonTextStyles : { color: globalStyles.orangeColor }}
                                    action={modalContent.secondButtonAction && modalContent.secondButtonAction}
                                />
                            )
                        }
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
        width: "90%",
        justifyContent: "space-around",
        paddingBottom: 20,
        paddingHorizontal: 5,
        overflow: "hidden"
    },

    mainMessage: {
        color: globalStyles.orangeColor,
        fontSize: globalStyles.fontSizeMedium,
        fontFamily: globalStyles.fontFamilyBold,
        textAlign: 'center',
    },

    message: {
        color: "#000000",
        fontSize: globalStyles.fontSizeSmall,
        marginVertical: 20,
        fontFamily: globalStyles.fontFamilyBold,
        maxWidth: "90%",
        textAlign: 'center',
    },
})
