import { useContext, useEffect, useState } from "react"
import { View, StyleSheet, TextInput, Text, ScrollView, TouchableOpacity, Pressable } from "react-native"

import { globalStyles } from "../assets/globalStyles"
import { CloseIcon } from "../assets/icons/CloseIcon"
import { MessageErrorAuthImage } from "../assets/imgs/MessageErrorAuthImage"

import { ComeBack } from "../components/ComeBack"
import { Loading } from "../components/Loading"
import { Button } from "../components/Button"
import { DefaultModal } from "../components/modals/DefaultModal"

import { getAllSchedulesOfProfessional } from "../services/schedules/getAllSchedulesOfProfessional"
import { updateProfessionalSchedules } from "../services/user/updateProfessionalSchedules"

import { CreateNewPersonContext } from "../context/CreateNewPerson"
import { UserContext } from "../context/UserContext"
import { SomethingWrongContext } from "../context/SomethingWrongContext"

import { isTimeFormat } from "../utils/isTimeFormat"

export const EditSchedulesOfWork = ({ navigation }) => {
    const [currentTimes, setCurrentTimes] = useState({
        weekday: [],
        saturday: [],
        sunday: []
    })
    const [newSchedule, setNewSchedule] = useState("")
    const [dayOfWeek, setDayOfWeek] = useState("weekday")
    const [error, setError] = useState(false)

    const { setSomethingWrong } = useContext(SomethingWrongContext)
    const { createNewPerson, setCreateNewPearson } = useContext(CreateNewPersonContext)
    const { userData } = useContext(UserContext)

    useEffect(() => {
        if (!createNewPerson.newPerson) {
            userData && getAllSchedulesOfProfessional(userData.uid, setCurrentTimes)
        }

    }, [userData, createNewPerson])

    const handleNewSchedule = () => {
        if (!newSchedule.trim()) {
            setError({
                image: <MessageErrorAuthImage />,
                mainMessage: "Campo Vazio !",
                message: "Por favor preencha o campo para que seja possivel adicionar um novo horário",
                firstButtonText: "Entendido",
                firstButtonAction: () => setError(null)
            })

            setNewSchedule("")
            return
        }
        else if (!isTimeFormat(newSchedule.trim())) {
            setError({
                image: <MessageErrorAuthImage />,
                mainMessage: "Horário Inválido !",
                message: "Por favor preencha o campo corretamente, siga o exemplo: 12:00, 13:30, 23:45...",
                firstButtonText: "Entendido",
                firstButtonAction: () => setError(null)
            })

            setNewSchedule("")
            return
        }
        else if (currentTimes[dayOfWeek].includes(newSchedule)) {
            setError({
                image: <MessageErrorAuthImage />,
                mainMessage: "Horário já cadastrado",
                message: "O horário que você inseriu já foi registrado",
                firstButtonText: "Entendido",
                firstButtonAction: () => setError(null)
            })

            setNewSchedule("")
            return
        }

        setError(null)

        setCurrentTimes({ ...currentTimes, [dayOfWeek]: [...currentTimes[dayOfWeek], newSchedule] })
        setNewSchedule("")
    }

    const handleRemoveSchedule = (scheduleToRemove) => {
        setCurrentTimes({ ...currentTimes, [dayOfWeek]: currentTimes[dayOfWeek].filter(schedule => schedule !== scheduleToRemove) })
    }

    const handleConfirm = () => {
        if (createNewPerson.newPerson) {
            setCreateNewPearson({ ...createNewPerson, workHour: currentTimes })

            navigation.navigate("EditServices")
            return
        }

        updateProfessionalSchedules(userData.uid, currentTimes, setSomethingWrong)
        navigation.navigate("ChoiceInformationToEdit")
    }

    if (currentTimes === null) return <Loading />

    return (
        <ScrollView contentContainerStyle={[globalStyles.container, { paddingBottom: 150 }]}>
            <DefaultModal
                modalContent={error}
            />
            <ComeBack text={"Editar Horários de Trabalho"} />

            {
                currentTimes &&
                <View style={styles.content}>
                    <Text style={styles.text}>Insira os horário de atendimento no campo abaixo.</Text>
                    <Text style={styles.text}>
                        O formato inserido deve ser de um modo em especifico, por exemplo:
                        <Text style={{ fontFamily: globalStyles.fontFamilyBold }}>12:00</Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={"Horário de Trabalho"}
                        placeholderTextColor={"#00000050"}
                        value={newSchedule}
                        onChangeText={text => setNewSchedule(text)}
                    />

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                        <Button
                            text={"seg. á sex."}
                            addStyles={dayOfWeek === "weekday" ?
                                { width: "32%", backgroundColor: globalStyles.orangeColor }
                                :
                                { width: "32%", backgroundColor: globalStyles.champagneColor }}
                            addStylesText={dayOfWeek === "weekday" ?
                                { color: "#FFFFFF" } : { color: globalStyles.orangeColor }
                            }
                            action={() => setDayOfWeek("weekday")}
                        />

                        <Button
                            text={"Sábados"}
                            addStyles={dayOfWeek === "saturday" ?
                                { width: "32%", backgroundColor: globalStyles.orangeColor } :
                                { width: "32%", backgroundColor: globalStyles.champagneColor }}
                            addStylesText={dayOfWeek === "saturday" ?
                                { color: "#FFFFFF" } : { color: globalStyles.orangeColor }
                            }
                            action={() => setDayOfWeek("saturday")}
                        />

                        <Button
                            text={"Domingos"}
                            addStyles={dayOfWeek === "sunday" ?
                                { width: "32%", backgroundColor: globalStyles.orangeColor }
                                :
                                { width: "32%", backgroundColor: globalStyles.champagneColor }}
                            addStylesText={dayOfWeek === "sunday" ?
                                { color: "#FFFFFF" } : { color: globalStyles.orangeColor }
                            }
                            action={() => setDayOfWeek("sunday")}
                        />
                    </View>

                    <Button
                        text={"Adicionar"}
                        addStyles={{ marginTop: 10, width: "100%" }}
                        action={handleNewSchedule}
                        isToBlockButton={newSchedule === ""}
                    />

                    <View style={styles.contentSchedules}>

                        {
                            currentTimes[dayOfWeek] &&
                            (
                                currentTimes[dayOfWeek].map((time, index) => (
                                    <View
                                        style={{ alignItems: "flex-end", }}
                                        key={index}
                                    >

                                        <Pressable onPress={() => handleRemoveSchedule(time)}>
                                            <CloseIcon />
                                        </Pressable>

                                        <TouchableOpacity
                                            style={styles.schedule}
                                            onPress={() => { }}
                                        >
                                            <Text style={styles.time}>{time}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            )
                        }

                    </View>
                </View>
            }

            <Button
                text={"Confirmar"}
                action={handleConfirm}
                addStyles={{ alignSelf: "center", marginTop: 50 }}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        marginTop: 10,
        minHeight: "65%"
    },

    text: {
        color: "#000000",
        marginVertical: 5,
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
    },

    contentSchedules: {
        marginTop: 50,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: "100%",
    },

    schedule: {
        width: 100,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: globalStyles.orangeColor,
        backgroundColor: globalStyles.orangeColor,
        margin: 2,
    },

    time: {
        fontFamily: globalStyles.fontFamilyBold,
        fontSize: globalStyles.fontSizeSmall,
        color: '#FFFFFF'
    },

    errorMessage: {
        color: "#FF0000",
        textAlign: "center",
        marginVertical: 15,
        fontFamily: globalStyles.fontFamilyBold,
        fontSize: globalStyles.fontSizeSmall,
    }
})
