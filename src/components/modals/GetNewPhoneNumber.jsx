import { View, Modal, StyleSheet, Text, TextInput } from "react-native"
import { useState, useContext } from "react"

import { globalStyles } from "../../assets/globalStyles"
import { GetNewPhoneNumberImage } from "../../assets/imgs/GetNewPhoneNumberImage"

import { Button } from "../Button"

import { formatInputPhoneNumber } from "../../utils/formatInputPhoneNumber"
import { UserContext } from "../../context/UserContext"

export const GetNewPhoneNumber = ({ visible, setVisible, setTimer, setIsLoading }) => {
    const [newPhone, setNewPhone] = useState("")

    const { userData, setUserData } = useContext(UserContext)

    const handleConfirm = () => {
        setIsLoading(true)
        setVisible(false)
        setUserData({ ...userData, phone: newPhone })
        setTimer(300)
        setNewPhone("")
    }

    const handlePhoneNumber = (phone) => {
        if (phone.length > 15) {
            phone = phone.split("").slice(0, 15).join("")
            setNewPhone(formatInputPhoneNumber(phone))

            return
        }

        setNewPhone(formatInputPhoneNumber(phone))
    }

    return (
        <Modal
            visible={visible}
            animationType={"slide"}
            transparent={true}
        >
            <View style={styles.container}>
                <GetNewPhoneNumberImage width={"100%"} height={"55%"} />

                <Text style={styles.text}>Por favor, digite o seu novo número de telefone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="(DD) DDDDD - DDDD"
                    placeholderTextColor={"#00000050"}
                    value={newPhone}
                    onChangeText={text => handlePhoneNumber(text)}
                    keyboardType="numeric"
                />

                <Button
                    text={"Confirmar"}
                    action={handleConfirm}
                    addStyles={{ marginTop: 25 }}
                />
                <Button
                    text={"Cancelar"}
                    action={() => setVisible(null)}
                    addStyles={{ marginTop: 10, backgroundColor: globalStyles.champagneColor }}
                    addStylesText={{ color: globalStyles.orangeColor }}
                />
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

    input: {
        width: "90%",
        backgroundColor: "#fafafa",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "transparent",
        marginTop: 20,
        paddingHorizontal: 20,
        color: "#000000",
        flexDirection: 'row',
        alignItems: 'center',
    },

    text: {
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
        color: "#000000",
    }
})