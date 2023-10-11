import { StyleSheet, Text, View } from "react-native";

import LottieView from "lottie-react-native";
import { globalStyles } from "../assets/globalStyles";

export const Loading = ({ flexSize = .2, width = 200, height = 200, text = null }) => {
    return (
        <View style={{ flex: flexSize, justifyContent: "center", alignItems: "center" }}>
            <LottieView
                source={require("../assets/animations/loading.json")}
                loop
                autoPlay
                style={{ width, height, }}
            />
            {
                text &&
                <Text style={styles.text}>{text}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "#00000070",
        width: "80%",
        fontSize: globalStyles.fontSizeVerySmall,
        fontFamily: globalStyles.fontFamilyBold,
        textAlign: "center",
        width: "100%"
    }
})