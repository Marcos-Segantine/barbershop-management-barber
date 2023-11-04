import { useContext, useEffect, useRef, useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native"

import { Button } from "../components/Button"
import { ComeBack } from "../components/ComeBack"
import { Loading } from "../components/Loading"
import { DefaultModal } from "../components/modals/DefaultModal"
import { Contact } from "../components/modals/Contact"
import { GetNewPhoneNumber } from "../components/modals/GetNewPhoneNumber"

import { globalStyles } from "../assets/globalStyles"
import { GetCodePhoneValidation } from "../assets/imgs/GetCodePhoneValidation"
import { MessageErrorAuthImage } from "../assets/imgs/MessageErrorAuthImage"
import { ScheduleUnavailableNow } from "../assets/imgs/ScheduleUnavailableNow"

import { UserContext } from "../context/UserContext"

import { getScreenDimensions } from "../utils/getScreenDimensions"

import { handleError } from "../handlers/handleError"

import auth from '@react-native-firebase/auth';
import { SomethingWrongContext } from "../context/SomethingWrongContext"

import { userPhoneNumberValidated } from "../services/auth/userPhoneNumberValidated"

import AsyncStorage from "@react-native-async-storage/async-storage"

export const GetCode = ({ navigation }) => {
    const [confirm, setConfirm] = useState(null)
    const [code, setCode] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [modalContent, setModalContent] = useState(null)
    const [isToShowContactModal, setIsToShowContactModal] = useState(false)
    const [inputFocused, setInputFocused] = useState(null)
    const [changePhoneNumber, setChangePhoneNumber] = useState(false)
    const [timer, setTimer] = useState(0)

    const inputRefs = Array.from({ length: 6 }, () => useRef(null));

    const { userData } = useContext(UserContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)

    const verifyPhoneNumber = async () => {
        try {

            const phone = userData.phone.replace(/[^0-9]/g, '')

            const confirmation = await auth().verifyPhoneNumber("+55" + phone).catch(({ code, message }) => {
                if (code === "auth/too-many-requests") {
                    setIsLoading(false)

                    AsyncStorage.setItem("@barber_app__phone_verification_time", `${new Date().getHours()}:${new Date().getMinutes()}`)

                    setModalContent({
                        image: <MessageErrorAuthImage />,
                        mainMessage: "Erro de Validação",
                        message: "Observamos várias tentativas de verificação do seu número. Por razões de segurança, temporariamente bloquearemos o acesso.",
                        firstButtonText: "Página Inicial",
                        firstButtonAction: () => {
                            setModalContent(null)
                            navigation.navigate("Home")
                        },
                        secondButtonText: "Contato",
                        secondButtonAction: () => {
                            setIsLoading(false)
                            setIsToShowContactModal(true)
                        }
                    })
                }
                else if (message === "[auth/missing-client-identifier] This request is missing a valid app identifier, meaning that neither SafetyNet checks nor reCAPTCHA checks succeeded. Please try again, or check the logcat for more details.") {
                    setIsLoading(false)

                    setModalContent({
                        image: <MessageErrorAuthImage />,
                        mainMessage: "Erro na Verificação",
                        message: "Encontramos um erro ao tentar fazer a verificação reCAPTCHA, por favor não feche a nova página que abrir. Caso precise de ajuda pode entrar em contato conosco",
                        firstButtonText: "Tentar Novamente",
                        firstButtonAction: () => {
                            setIsLoading(true)
                            setModalContent(null)
                            verifyPhoneNumber()
                        },
                        secondButtonText: "Contato",
                        secondButtonAction: () => {
                            setIsLoading(false)
                            setIsToShowContactModal(true)
                        }
                    })

                }
                else {
                    setSomethingWrong(true)
                    handleError("GetCode - verifyPhoneNumber", message)
                }

            })

            if (!confirmation) return

            setConfirm(confirmation);
            setIsLoading(false)
            setTimer(300)

        } catch ({ message }) {
            setSomethingWrong(true)
            handleError("GetCode", message)

        }
    }

    useEffect(() => {
        // verifyPhoneNumber()

    }, [userData.phone])

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer === 0) return
            setTimer(timer - 1)
        }, 1000)

        return () => clearInterval(interval)

    }, [timer])

    const confirmCode = async () => {
        try {

            const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code.join(""));
            await auth().currentUser.linkWithCredential(credential);

            userPhoneNumberValidated(userData.uid, userData.phone)
            navigation.navigate("Home")

        } catch ({ code, message }) {
            if (code == 'auth/invalid-verification-code') {
                setIsLoading(false)

                setModalContent({
                    image: <MessageErrorAuthImage />,
                    mainMessage: "Código Incorreto",
                    message: "O código inserido está incorreto. Por favor, revise com cuidado o código que enviamos a você e tente novamente.",
                    firstButtonText: "Tentar Novamente",
                    firstButtonAction: () => {
                        setModalContent(null)
                    },
                })

            }
            else if (message === "[auth/unknown] User has already been linked to the given provider.") {

                setIsLoading(false)
                userPhoneNumberValidated(userData.uid, userData.phone)

                setModalContent({
                    image: <ScheduleUnavailableNow />,
                    mainMessage: "Houve um Engano",
                    message: "Parece que você já fez a validação do seu número de telefone, desculpe o incoveniente.",
                    firstButtonText: "Página Inicial",
                    firstButtonAction: () => {
                        setModalContent(null)
                        navigation.navigate("Home")
                    },
                })
            }
            else {
                setIsLoading(false)

                setModalContent({
                    image: <MessageErrorAuthImage />,
                    mainMessage: "Erro de Validação",
                    message: "Ocorreu um erro ao validar o seu número de telefone, por favor tente novamente mais tarde. Caso queira pode entrar em contato conosco",
                    firstButtonText: "Página Inicial",
                    firstButtonAction: () => {
                        setModalContent(null)
                        navigation.navigate("Home")
                    },
                    secondButtonText: "Contato",
                    secondButtonAction: setIsToShowContactModal(true)
                })

                handleError("GetCode", message)
            }
        }
    }

    const secondsToMinutes = (seconds) => {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;

        // Format the output as "minutes:seconds"
        var formattedTime = minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
        return formattedTime;
    }

    const contactAction = () => {
        setIsToShowContactModal(false)
        navigation.navigate("Home")
    }

    const handleCode = (currentCode) => {
        const input = code
        if (input.length > 5) return

        input.push(currentCode.split("").splice(-1)[0])
        setCode([...input])

        handleFocusInput()
    }

    const handleFocusInput = (index) => {
        const position = code.length
        if (position === 6) return

        setInputFocused(index || position);
        inputRefs[position].current?.focus();
    }

    const handleClear = () => {
        setCode([]);
        setInputFocused(0);
        inputRefs[0].current?.focus();
    }

    const handleCannotResendVerification = () => {
        setModalContent({
            image: <MessageErrorAuthImage />,
            mainMessage: "Aguarde um Momento",
            message: "Por favor, espere 5 minutos antes de tentar novamente. Agradecemos sua compreensão.",
            firstButtonText: "Entendido",
            firstButtonAction: () => setModalContent(null)
        })
    }

    const phoneHidden = userData?.phone.replace(/[^0-9]/g, '').split('').map((number, index) => index < 8 ? "*" : number).join('')

    // if (isLoading) return <Loading flexSize={1} text={"Este procedimento pode levar um tempo para ser concluído."} />

    return (
        <ScrollView contentContainerStyle={[globalStyles.container, { minHeight: "100%" }]}>
            <ComeBack text={"Código de Verificação"} />

            <GetCodePhoneValidation width={"100%"} height={getScreenDimensions("height", 50, setSomethingWrong)} />
            <DefaultModal modalContent={modalContent} />
            <Contact
                modalContact={isToShowContactModal}
                setModalVisible={setIsToShowContactModal}
                action={contactAction}
            />
            <GetNewPhoneNumber
                visible={changePhoneNumber}
                setVisible={setChangePhoneNumber}
                setTimer={setTimer}
                setIsLoading={setIsLoading}
            />

            <View style={{ width: "100%", alignItems: "center" }}>
                <Text style={styles.description}>Enviamos um código para o número {phoneHidden}.</Text>
                <Text style={styles.description}>Ensira-o no campo abaixo</Text>

                <TouchableOpacity onPress={handleClear} style={{ marginTop: 10, width: "100%" }}>
                    <Text style={{ fontSize: globalStyles.fontSizeVerySmall, fontFamily: globalStyles.fontFamilyBold, color: "#000000", textAlign: "right" }}>Apagar</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: 20 }}>
                    {
                        Array.from({ length: 6 }, (_, index) => index).map((index) => (
                            <TextInput
                                key={index}
                                ref={inputRefs[index]}
                                value={code[index] || ""}
                                style={inputFocused === index ? [styles.input, { borderColor: globalStyles.orangeColor }] : styles.input}
                                onFocus={() => handleFocusInput(index)}
                                keyboardType="numeric"
                                textAlign="center"
                                maxLength={1}
                                onChangeText={text => handleCode(text)}
                            />
                        ))
                    }

                </View>

                <View style={styles.contentHelpers}>
                    <TouchableOpacity onPress={() => setChangePhoneNumber(true)}>
                        <Text style={styles.helpersText}>Trocar de número</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={timer === 0 ? () => verifyPhoneNumber() : handleCannotResendVerification}>
                        <Text style={timer === 0 ? styles.helpersText : [styles.helpersText, { color: globalStyles.orangeColorDarker }]}>Não recebi o código</Text>
                    </TouchableOpacity>
                </View>

                {
                    timer !== 0 &&
                    <Text style={styles.timer}>{secondsToMinutes(timer)}</Text>
                }

                <Button
                    text={"Confirmar"}
                    addStyles={{ marginTop: 30 }}
                    action={() => confirmCode()}
                />

            </View>
        </ScrollView>
    )
}

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        width: (width - (width * (20 / 100))) / 6,
        height: (width - (width * (20 / 100))) / 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "white",
        color: "#000000",
        fontSize: globalStyles.fontSizeMedium,
        fontFamily: globalStyles.fontFamilyBold,
    },

    contentHelpers: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 5
    },

    helpersText: {
        color: globalStyles.orangeColor,
        fontSize: globalStyles.fontSizeVerySmall,
        fontFamily: globalStyles.fontFamilyBold,
    },

    description: {
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyRegular,
        color: "#000000",
        width: "100%"
    },

    timer: {
        color: "#000000",
        fontSize: globalStyles.fontSizeVerySmall,
        fontFamily: globalStyles.fontFamilyBold,
        width: "100%",
        marginTop: 10,
        textAlign: "right"
    }
})
