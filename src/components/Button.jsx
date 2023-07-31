import { Text, TouchableOpacity, StyleSheet } from "react-native"

import { globalStyles } from "../assets/globalStyles"

export const Button = ({ text, action, addStyles, addStylesText, isToBlockButton }) => {
    return (
        <TouchableOpacity style={isToBlockButton ? [styles.button, { ...addStyles, backgroundColor: globalStyles.orangeColorDarker }] : [styles.button, { ...addStyles }]} activeOpacity={.8} onPress={action} disabled={isToBlockButton}>
            <Text style={[styles.text, { ...addStylesText }]}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "85%",
        backgroundColor: globalStyles.orangeColor,
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: 'center',
    },

    text: {
        color: "#FFFFFF",
        fontWeight: "bold",
    }
})
