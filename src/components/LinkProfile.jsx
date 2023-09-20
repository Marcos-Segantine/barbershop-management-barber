import { TouchableOpacity, Text, StyleSheet, View } from "react-native"

import { ArrowRight } from "../assets/icons/ArrowRightIcon"
import { globalStyles } from "../assets/globalStyles"

export const LinkProfile = ({ text, icon, action }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={action}>
            <View style={{ flexDirection: 'row' }}>
                {icon}
                <Text style={styles.text}>{text}</Text>
            </View>

            <ArrowRight />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginVertical: 3,
        paddingHorizontal: 15,
    },

    text: {
        marginLeft: 10,
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyMedium,
        color: '#000000'
    }
})