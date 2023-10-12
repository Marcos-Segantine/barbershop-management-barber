import { View, Modal, StyleSheet, Text, TextInput } from "react-native"
import { useState, useContext } from "react"

import { UserContext } from "../../context/UserContext"

import { globalStyles } from "../../assets/globalStyles"
import { GetNewPhoneNumberImage } from "../../assets/imgs/GetNewPhoneNumberImage"
import { MessageErrorAuthImage } from "../../assets/imgs/MessageErrorAuthImage"

import { Button } from "../Button"
import { DefaultModal } from "./DefaultModal"

import { isValidPhoneNumber } from "../../validation/isValidPhoneNumber"

import { formatInputPhoneNumber } from "../../utils/formatInputPhoneNumber"
import { verifyIfDataAlreadyExist } from "../../validation/verifyIfDataAlreadyExist"

export const GetNewPhoneNumber = ({ visible, setVisible, setTimer, setIsLoading }) => {
    const [newPhone, setNewPhone] = useState("")
    const [modalContent, setModalContent] = useState(null)

    const { userData, setUserData } = useContext(UserContext)

    const handleConfirm = () => {
        if (newPhone.trim().length === 0) {
            setModalContent({
                image: <MessageErrorAuthImage />,
                mainMessage: "Campo Vazio !",
                message: "Por favor preencha o campo para que seja possivel adicionar um novo telefone",
                firstButtonText: "Entendido",
                firstButtonAction: () => setModalContent(null),
            })

            return
        }
        else if (newPhone === userData.phone) {
            setVisible(false)
            setNewPhone("")

            return
        }

        const isPhoneValid = isValidPhoneNumber(newPhone)

        if (!isPhoneValid) {
            setModalContent({
                image: <MessageErrorAuthImage />,
                mainMessage: "Número Inválido",
                message: "O número de telefone inserido não é válido. Por favor, verifique o número de telefone que você inseriu. Lembre de colocar o DDD. Exemplo: (99) 99999-9999",
                firstButtonText: "Tentar Novamente",
                firstButtonAction: () => setModalContent(null),
                secondButtonText: "Voltar",
                secondButtonAction: () => {
                    setModalContent(null)
                    setNewPhone("")
                    setVisible(false)
                }
            })

            return
        }

        const phoneExist = verifyIfDataAlreadyExist("phone", newPhone)

        if (phoneExist) {
            setModalContent({
                image: <MessageErrorAuthImage />,
                mainMessage: "Telefone ja existente",
                message: "O telefone que voce digitou ja existe. Por favor, utilize outro.",
                firstButtonText: "Tentar Novamente",
                firstButtonAction: () => setModalContent(null),
            })

            return
        }

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
                <DefaultModal modalContent={modalContent} />
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