import { useContext, useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, TextInput, Text, Pressable } from "react-native"

import { globalStyles } from "../assets/globalStyles"
import { Button } from "../components/Button"
import { ComeBack } from "../components/ComeBack"
import { Loading } from "../components/Loading"
import { DefaultModal } from "../components/modals/DefaultModal"

import { CreateNewPersonContext } from "../context/CreateNewPerson"
import { SomethingWrongContext } from "../context/SomethingWrongContext"
import { UserContext } from "../context/UserContext"

import { formatPrice } from "../utils/formatPrice"

import { verifyFieldsOfNewService } from "../services/user/verifyFieldsOfNewService"
import { createPerson } from "../services/user/createPerson"
import { getServicesOfProfessional } from "../services/user/getServicesOfProfessional"
import { updateProfessionalServices } from "../services/user/updateProfessionalServices"

import { CloseIcon } from "../assets/icons/CloseIcon"
import { MessageErrorAuthImage } from "../assets/imgs/MessageErrorAuthImage"

export const EditServices = ({ navigation }) => {
    const [currentServices, setCurrentServices] = useState([])
    const [newService, setNewService] = useState({})
    const [error, setError] = useState(null)

    const [isNewBarber, setIsNewBarber] = useState(null)

    const { createNewPerson, setCreateNewPearson } = useContext(CreateNewPersonContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)
    const { userData } = useContext(UserContext)

    useEffect(() => {

        if (createNewPerson?.newPerson) setIsNewBarber(true)
        else {
            userData && getServicesOfProfessional(setCurrentServices, userData.uid, setSomethingWrong)
            setIsNewBarber(false)
        }

    }, [createNewPerson, userData])

    const handleNewService = () => {
        if (!newService.name?.trim() || !newService.price?.trim()) {
            setError({
                image: <MessageErrorAuthImage />,
                mainMessage: "Campos Vazios !",
                message: "Por favor preencha todos os campos",
                firstButtonText: "Entendido",
                firstButtonAction: () => setError(null)
            })

            return
        }

        else if (verifyFieldsOfNewService(newService.name, newService.price, currentServices, setError)) {
            setError(null)

            setCurrentServices([...currentServices, newService].reverse())
            setNewService({ name: "", price: "" })
        }

    }

    const handleRemoveService = (serviceToRemove) => {
        setCurrentServices(currentServices.filter(service => service.name !== serviceToRemove))
    }

    const handleContinue = async () => {

        if (createNewPerson?.newPerson && userData === null) {
            await createPerson({ ...createNewPerson, services: [...currentServices].sort((a, b) => a.name.localeCompare(b.name)) })
            navigation.navigate("Login", { emailProfessionalCreated: createNewPerson.email, passwordProfessionalCreated: createNewPerson.password })
            setCreateNewPearson(null)

            return
        } else if (createNewPerson?.newPerson && userData !== null) {
            await createPerson({ ...createNewPerson, services: [...currentServices].sort((a, b) => a.name.localeCompare(b.name)) })
            navigation.navigate("Profile")
            setCreateNewPearson(null)

            return
        }

        updateProfessionalServices(userData.uid, currentServices, setSomethingWrong)
        navigation.navigate("ChoiceInformationToEdit")
    }

    if (isNewBarber === null) return <Loading flexSize={1} />

    return (
        <ScrollView contentContainerStyle={globalStyles.container}>
            <DefaultModal
                modalContent={error}
            />
            <ComeBack text={"Editar seus Serviços"} />

            <View style={styles.content}>
                <Text style={styles.text}>Insira os seus serviços no campo abaixo.</Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Insira um novo serviço"}
                    placeholderTextColor={"#00000050"}
                    value={newService.name}
                    onChangeText={text => setNewService({ ...newService, name: text })}
                />

                <TextInput
                    style={styles.input}
                    placeholder={"Preço do serviço"}
                    placeholderTextColor={"#00000050"}
                    value={newService.price}
                    onChangeText={text => setNewService({ ...newService, price: text })}
                    keyboardType="numeric"
                />

                <Button
                    text={"Adicionar"}
                    addStyles={{ marginTop: 20, width: "100%" }}
                    action={handleNewService}
                    isToBlockButton={!newService.name && !newService.price}
                />

                <View style={[styles.contentServices]}>
                    {
                        !!currentServices.length &&
                        (
                            currentServices.map((service, index) => {
                                return (
                                    <View style={styles.service} key={index}>
                                        <Pressable style={styles.removeIcon} onPress={() => handleRemoveService(service.name)}>
                                            <CloseIcon width={35} height={35} />
                                        </Pressable>
                                        <Text style={styles.serviceText}><Text style={{ fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall }}>Serviço:</Text> {service.name}</Text>
                                        <Text style={styles.serviceText}><Text style={{ fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall }}>Preço:</Text> {formatPrice(service.price)}</Text>
                                    </View>
                                )
                            })
                        )
                    }

                </View>
            </View>
            {
                !!currentServices.length &&
                (
                    <Button
                        text={"Confirmar"}
                        addStyles={{ marginTop: 30, width: "100%" }}
                        action={handleContinue}
                    />
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        marginTop: 50,
    },

    text: {
        color: "#000000",
        marginVertical: 5,
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyMedium,
    },

    input: {
        width: "100%",
        backgroundColor: "#fafafa",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "transparent",
        marginTop: 20,
        color: "#000000",
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyMedium,
    },

    contentServices: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 30,
        width: "100%",
    },

    service: {
        width: "100%",
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#00000010",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5
    },

    serviceText: {
        color: "#000000",
        marginVertical: 5,
        fontFamily: globalStyles.fontFamilyMedium,
        fontSize: globalStyles.fontSizeSmall,
    },

    removeIcon: {
        position: "absolute",
        right: 10,
        top: 5,
        padding: 10
    },

    messageIfBarberIsNotOld: {
        color: "#00000090",
        textAlign: "center",
        marginTop: 15,
    },
})
