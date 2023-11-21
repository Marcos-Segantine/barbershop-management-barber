import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Pressable } from "react-native"
import { useContext, useState } from "react"

import { ScheduleContext } from "../context/ScheduleContext"
import { SomethingWrongContext } from "../context/SomethingWrongContext"
import { CreateNewPersonContext } from "../context/CreateNewPerson"

import { HeaderScreensMenu } from "../components/HeaderScreensMenu"
import { Button } from "../components/Button"
import { Menu } from "../components/Menu"
import { ShowClientInfo } from "../components/modals/ShowClientInfo"
import { DefaultModal } from "../components/modals/DefaultModal"
import { Loading } from "../components/Loading"

import { EmailIcon } from "../assets/icons/EmailIcon"
import { SMSIcon } from "../assets/icons/SMSIcon"
import { globalStyles } from "../assets/globalStyles"

import { getUserDataByEmailOrPhone } from "../services/user/getUserDataByEmailOrPhone"

import { formatInputPhoneNumber } from "../utils/formatInputPhoneNumber"

export const GetClient = ({ navigation, route }) => {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const [inputSelected, setInputSelected] = useState(null)
    const [modalContent, setModalContent] = useState(null)
    const [clientData, setClientData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { schedule, setSchedule } = useContext(ScheduleContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)
    const { createNewPerson, setCreateNewPearson } = useContext(CreateNewPersonContext)

    const { isToClearScheduleContext } = route.params || {}

    const handlePhoneNumber = (phone) => {
        if (phone.length > 15) {
            phone = phone.split("").slice(0, 15).join("")
            setPhone(formatInputPhoneNumber(phone, setSomethingWrong))

            return
        }

        setPhone(formatInputPhoneNumber(phone, setSomethingWrong))
    }

    const handleConfirm = async () => {
        setInputSelected(null)
        setIsLoading(true)
        setPhone("")
        setEmail("")

        const clientData = await getUserDataByEmailOrPhone(
            email?.trim(),
            phone?.trim(),
            setModalContent,
            setSomethingWrong
        )

        if (clientData !== undefined) {
            setClientData(clientData)
            setSchedule({ ...schedule, client: { ...clientData } })
        }

        setIsLoading(false)
    }

    const handleNewClient = () => {
        setCreateNewPearson({ ...createNewPerson, newPerson: "client" })
        navigation.navigate("FillProfile", { isToUpdateProfessionalData: false })
    }

    const styleEmail = inputSelected === 'email' ? [styles.input, { backgroundColor: '#fff8ec', borderColor: '#fc9501', borderWidth: 1 }] : styles.input
    const stylePhone = inputSelected === 'phone' ? [styles.input, { backgroundColor: '#fff8ec', borderColor: '#fc9501', borderWidth: 1 }] : styles.input

    if (isLoading) return <Loading flexSize={1} />

    return (
        <>
            <ScrollView
                contentContainerStyle={globalStyles.container}
                overScrollMode="never"
                bounces={false}
            >
                <ShowClientInfo
                    modalShowUser={clientData}
                    setModalShowUser={setClientData}
                    isToClearScheduleContext={isToClearScheduleContext}
                />
                <DefaultModal
                    modalContent={modalContent}
                />

                <HeaderScreensMenu screenName={"Agendar Horário"} />

                <Text style={{ color: "#000000", fontSize: globalStyles.fontSizeSmall, fontFamily: globalStyles.fontFamilyMedium, marginTop: 30 }}>Preencha um dos campos abaixo com os dados do cliente que deseja agendar um horário.</Text>

                <View style={styles.contentContact}>
                    <View
                        style={styles.contact}
                        activeOpacity={.7}
                    >
                        <View style={styles.contentIcon}>
                            <EmailIcon width={40} height={40} color={globalStyles.orangeColor} />
                        </View>
                        <View style={{ marginLeft: 10, width: "70%", }}>
                            <Text style={styles.serviceContact}>Email</Text>
                            <TextInput
                                style={styleEmail}
                                placeholder={"Insira o email do cliente"}
                                placeholderTextColor={"#00000050"}
                                onChangeText={text => setEmail(text)}
                                keyboardType={"email-address"}
                                onFocus={() => setInputSelected("email")}
                            />
                        </View>
                    </View>

                    <View style={styles.lineOr}>
                        <Text style={styles.line}></Text>

                        <Text style={styles.textOr}>
                            ou
                        </Text>

                        <Text style={styles.line}></Text>
                    </View>

                    <View
                        style={styles.contact}
                        activeOpacity={.7}
                    >
                        <View style={styles.contentIcon}>
                            <SMSIcon />
                        </View>
                        <TouchableOpacity style={{ marginLeft: 10, width: "70%", }}>
                            <Text style={styles.serviceContact}>Celular</Text>
                            <TextInput
                                style={stylePhone}
                                placeholder={"Insira o número do cliente"}
                                placeholderTextColor={"#00000050"}
                                onChangeText={text => handlePhoneNumber(text)}
                                value={phone}
                                keyboardType={"number-pad"}
                                onFocus={() => setInputSelected("phone")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <Button text={"Confirmar"} action={handleConfirm} addStyles={{ marginTop: 30, marginBottom: 20 }} isToBlockButton={!email?.trim("") && !phone?.trim("") ? true : false} />

                <Pressable onPress={handleNewClient}>
                    <Text style={styles.alertInfo}>O cliente deve ter uma conta cadastrada. Caso ainda não tenha uma,
                        <Text style={{ color: globalStyles.orangeColor }}> registre-o clicando aqui.</Text>
                    </Text>
                </Pressable>
            </ScrollView>

            <Menu />
        </>
    )
}

const styles = StyleSheet.create({
    contentContact: {
        marginTop: 30,
        alignItems: 'center',
        width: "100%",
    },

    contact: {
        borderWidth: 2,
        borderRadius: 15,
        borderColor: 'transparent',
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },

    contentIcon: {
        width: 80,
        backgroundColor: '#fff8ec',
        borderRadius: 100,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },

    serviceContact: {
        color: '#00000070',
        fontFamily: globalStyles.fontFamilyBold,
        fontSize: globalStyles.fontSizeSmall,
    },

    contactData: {
        color: '#000000',
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
    },

    input: {
        color: "#000000",
        width: "100%",
        backgroundColor: "#FFFFFF80",
        borderRadius: 15,
        paddingLeft: 15,
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyMedium
    },

    lineOr: {
        width: "80%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    line: {
        borderTopWidth: .3,
        height: 0,
        width: "40%"
    },

    textOr: {
        color: '#00000080',
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
    },

    alertInfo: {
        color: "#00000090",
        fontSize: globalStyles.fontSizeVerySmall,
        textAlign: "center",
    }
})
