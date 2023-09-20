import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

import NetInfo from "@react-native-community/netinfo";

import { NoInternetImage } from "../../assets/imgs/NoInternetImage";
import { globalStyles } from "../../assets/globalStyles";

export const NetInformation = () => {
    const [isConnected, setIsConnected] = useState(null);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (isConnected !== null && !isConnected) && (
        <Modal
            animationType="slide"
            transparent={true}
        >
            <View style={styles.container}>
                <NoInternetImage width={"100%"} height={"55%"} />

                <Text style={styles.title}>Sem conexão com a internet</Text>
                <Text style={styles.text}>Por favor, verifique sua conexão com a internet</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
    },

    title: {
        color: globalStyles.orangeColor,
        fontSize: globalStyles.fontSizeLarger,
        fontFamily: globalStyles.fontFamilyBold,
        textAlign: "center"
    },

    text: {
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyMedium,
        color: "#000000",
        textAlign: 'center',
        maxWidth: "80%",
        marginTop: 15,
    }
})