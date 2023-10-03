import { View, StyleSheet, Pressable, Text } from "react-native"

import { globalStyles } from "../assets/globalStyles"

export const CheckBox = ({ text, action, state }) => {
    return (
        <View style={styles.contentField}>
            <Text style={styles.text}>
                {text}
            </Text>
            <Pressable
                onPress={action}
                style={{ width: 75, height: 30, borderRadius: 100, backgroundColor: state ? globalStyles.orangeColor : "#B8B8B8", padding: 2 }}
            >
                <View style={state ? styles.buttonCheck : [styles.buttonCheck, { backgroundColor: "#F2F2F2", left: 2 }]}></View>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    contentField: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        marginTop: 15
    },

    text: {
        marginLeft: 10,
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
        color: "#000000",
    },

    buttonCheck: {
        backgroundColor: "#FFFFFF",
        width: 35,
        height: "100%",
        borderRadius: 300,
        position: "absolute",
        right: 2,
        top: 2
    }
})