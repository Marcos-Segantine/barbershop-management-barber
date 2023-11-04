import { StyleSheet, Text, TextInput, ScrollView } from "react-native"
import { useContext, useState } from "react"

import { globalStyles } from "../assets/globalStyles"
import { ForgotPasswordImage } from "../assets/imgs/ForgotPasswordImage"
import { ResetPasswordEmailSend } from "../assets/imgs/ResetPasswordEmailSend"

import { Button } from "../components/Button"
import { ComeBack } from "../components/ComeBack"
import { DefaultModal } from "../components/modals/DefaultModal"
import { Loading } from "../components/Loading"

import { getUserDataByEmailOrPhone } from "../services/user/getUserDataByEmailOrPhone"

import { SomethingWrongContext } from "../context/SomethingWrongContext"

import auth from '@react-native-firebase/auth';

import { formatInputPhoneNumber } from "../utils/formatInputPhoneNumber"

export const ForgotPassword = ({ navigation }) => {
    const [modalContent, setModalContent] = useState(null)
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [inputSelected, setInputSelected] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { setSomethingWrong } = useContext(SomethingWrongContext)

    const styleEmail = inputSelected === 'email' ? [styles.input, { backgroundColor: '#fff8ec', borderColor: '#fc9501', borderWidth: 1 }] : styles.input
    const stylePhone = inputSelected === 'phone' ? [styles.input, { backgroundColor: '#fff8ec', borderColor: '#fc9501', borderWidth: 1 }] : styles.input

    const handleFocusInput = text => setInputSelected(text)

    const handlePhoneNumber = (phone) => {
        if (phone.length > 15) {
            phone = phone.split("").slice(0, 15).join("")
            setPhone(formatInputPhoneNumber(phone, setSomethingWrong))

            return
        }

        setPhone(formatInputPhoneNumber(phone, setSomethingWrong))
    }

    const handleConfirm = async () => {
        setIsLoading(true)
        setInputSelected(null)

        const data = await getUserDataByEmailOrPhone(
            email,
            phone,
            setModalContent,
            setSomethingWrong,
            "barbers",
        )

        if (!data) {
            setEmail("")
            setPhone("")

            setIsLoading(false)
            return
        }

        await auth().sendPasswordResetEmail(data.email)

        setIsLoading(false)

        setModalContent({
            image: <ResetPasswordEmailSend width={"100%"} />,
            mainMessage: "Email enviado",
            message: "Foi enviado um email para que você possa redefinir sua senha. Verifique sua caixa de spam se não o encontrar.",
            firstButtonText: "Entendido",
            firstButtonAction: () => {
                setModalContent(null)
                navigation.navigate("Login")
            },
        })
    }

    if (isLoading) return <Loading flexSize={1} />

    return (
        <ScrollView
            contentContainerStyle={globalStyles.container}
            overScrollMode="never"
            bounces={false}
        >
            <ComeBack text={"Resetar senha"} />
            <DefaultModal modalContent={modalContent} />

            <ForgotPasswordImage width={"100%"} height={300} />

            <Text style={styles.title}>Informe seu email ou número de telefone</Text>

            <TextInput
                style={styleEmail}
                placeholder="Email"
                placeholderTextColor="#00000050"
                keyboardType="email-address"
                onFocus={() => handleFocusInput("email")}
                onChangeText={text => setEmail(text)}
            />

            <TextInput
                style={stylePhone}
                placeholder="Número de telefone"
                placeholderTextColor="#00000050"
                keyboardType="number-pad"
                onFocus={() => handleFocusInput("phone")}
                onChangeText={text => handlePhoneNumber(text)}
                value={phone}
            />

            <Button
                action={handleConfirm}
                text={"Confirmar"}
                addStyles={{ marginTop: 20, marginBottom: 30 }}
                isToBlockButton={email?.trim() === "" && phone?.trim() === ""}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        color: globalStyles.orangeColor,
        fontSize: globalStyles.fontSizeMedium,
        fontFamily: globalStyles.fontFamilyBold,
        marginTop: 10,
        textAlign: "center"
    },

    input: {
        width: "100%",
        backgroundColor: "#fafafa",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "transparent",
        marginTop: 20,
        paddingHorizontal: 20,
        color: "#000000",
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: globalStyles.fontSizeSmall
    },

})
