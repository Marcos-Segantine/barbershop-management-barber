import { StyleSheet, PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;

export const globalStyles = StyleSheet.create({
    orangeColor: "#fc9501",
    orangeColorDarker: "#b16401",
    champagneColor: "#fff8ef",
    fontFamilyMedium: "Satoshi-Medium",
    fontFamilyBold: "700", // Satoshi-Bold
    fontFamilyRegular: "Satoshi-Regular",
    fontFamilyLight: "Satoshi-Light",
    fontSizeVerySmall: getFontSize(12),
    fontSizeSmall: getFontSize(16),
    fontSizeMedium: getFontSize(26),
    fontSizeLarger: getFontSize(32),
    fontSizeVeryLarger: getFontSize(42),
    container: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
})
