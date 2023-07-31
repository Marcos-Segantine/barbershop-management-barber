import { useContext, useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native"

import { UserContext } from "../context/UserContext"
import { SomethingWrongContext } from "../context/SomethingWrongContext"

import { EmailIcon } from "../assets/icons/EmailIcon"
import { PadlockIcon } from "../assets/icons/PadlockIcon"
import { globalStyles } from "../assets/globalStyles"
import { LoginImage } from "../assets/imgs/LoginImage"

import { Button } from "../components/Button"
import { ComeBack } from "../components/ComeBack"
import { Loading } from "../components/Loading"
import { DefaultModal } from "../components/modals/DefaultModal"

import { signInWithEmailAndPassword } from "../services/auth/signInWithEmailAndPassword"
import { CreateNewPersonContext } from "../context/CreateNewPerson"

export const Login = ({ navigation, route }) => {
    const { emailProfessionalCreated, passwordProfessionalCreated } = route.params

    const [inputSelected, setInputSelected] = useState("")
    const [email, setEmail] = useState(emailProfessionalCreated || "")
    const [password, setPassword] = useState(passwordProfessionalCreated || "")

    const [isLoading, setIsLoading] = useState(false)
    const [modalInfo, setModalInfo] = useState(null)

    const { setUserData } = useContext(UserContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)
    const { createNewPerson, setCreateNewPearson } = useContext(CreateNewPersonContext)

    const handleFocusInput = (field) => setInputSelected(field)

    const handleLogin = () => {
        setInputSelected("")

        signInWithEmailAndPassword(
            email,
            password,
            setUserData,
            setEmail,
            setPassword,
            setIsLoading,
            setSomethingWrong,
            setModalInfo,
            navigation
        )
    }

    const handleRegister = () => {
        setInputSelected("")

        setCreateNewPearson({
            ...createNewPerson,
            newPerson: "professional"
        })

        navigation.navigate("FillProfile", { isToUpdateProfessionalData: false })

        setEmail("")
        setPassword("")
    }

    const styleEmail = inputSelected === 'email' ? [styles.input, { backgroundColor: '#fff8ec', borderColor: '#fc9501', borderWidth: 1 }] : styles.input
    const stylePassword = inputSelected === 'password' ? [styles.input, { backgroundColor: '#fff8ec', borderColor: '#fc9501', borderWidth: 1 }] : styles.input

    if (isLoading) return <Loading flexSize={1} />

    return (
        <ScrollView contentContainerStyle={globalStyles.container}>
            <ComeBack />
            
            <DefaultModal 
                modalContent={modalInfo}
            />

            <Text style={styles.title}>
                Login
            </Text>

            <View style={styles.contentInput}>
                <View style={styleEmail}>
                    <EmailIcon />

                    <TextInput
                        style={{ color: "#000000", width: "100%" }}
                        placeholder={"Email"}
                        value={email}
                        placeholderTextColor={"#00000050"}
                        onFocus={() => handleFocusInput("email")}
                        onChangeText={text => setEmail(text)}
                        keyboardType="email-address"
                    />
                </View>

                <View style={stylePassword}>
                    <PadlockIcon />

                    <TextInput
                        style={{ color: "#000000", width: "100%" }}
                        placeholder={"Senha"}
                        value={password}
                        placeholderTextColor={"#00000050"}
                        secureTextEntry={true}
                        onFocus={() => handleFocusInput("password")}
                        onChangeText={text => setPassword(text)}
                    />
                </View>
            </View>

            <Button
                text={"Login"}
                action={handleLogin}
            />

            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
                <TouchableOpacity
                    onPress={handleRegister}
                >
                    <Text style={styles.linksAuth}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                    <Text style={styles.linksAuth}>Esqueceu a senha?</Text>
                </TouchableOpacity>
            </View>

            <LoginImage />

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 52,
        color: "#000000",
        fontWeight: "bold",
        marginLeft: 25,
    },

    contentInput: {
        marginTop: "10%",
        marginBottom: "10%",
        width: "100%",
        alignItems: 'center',
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
    },

    inputFocused: {
        backgroundColor: "#fff8ec"
    },

    linksAuth: {
        color: globalStyles.orangeColor,
        fontWeight: globalStyles.fontFamilyBold,
        fontSize: 16,
        marginTop: 20,
    },
})
