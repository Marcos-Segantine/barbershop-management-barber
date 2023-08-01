import { useContext, useEffect, useState } from "react"
import { StyleSheet, View, Text, Image, Pressable } from "react-native"

import { globalStyles } from "../assets/globalStyles"
import DefaultPicture from "../assets/icons/DefaultPicture.png"

import { ScheduleContext } from "../context/ScheduleContext"

import { Loading } from "./Loading"

import { getAvailableProfessional } from "../services/schedules/getAvailableProfessional"
import { getAllProfessionals } from "../services/schedules/getAllProfessionals"

export const Professionals = ({ preferProfessional }) => {
    const [availableProfessional, setAvailableProfessional] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { schedule, setSchedule } = useContext(ScheduleContext)

    const professionalSelected = [styles.professional, { borderColor: globalStyles.orangeColor }]

    const handleProfessionalSelected = async (professionalName, professionalUid) => {
        setSchedule({ ...schedule, professional: professionalName, professionalUid: professionalUid })
    }

    useEffect(() => {

        (async () => {

            if (schedule.day && schedule.schedule && !preferProfessional) {
                await getAvailableProfessional(schedule, setAvailableProfessional, setIsLoading)
                setIsLoading(false)
            } else if (preferProfessional) {
                setAvailableProfessional(await getAllProfessionals())
            }

        })();

    }, [schedule.day, schedule.schedule])

    if (!preferProfessional && isLoading) return <Loading />

    return (
        <View style={styles.container}>
            {
                preferProfessional && <Text style={[styles.text, { marginTop: 50 }]}>Escolha o profissional de preferência</Text>
            }

            {
                !preferProfessional &&
                (
                    schedule.day, schedule.schedule ?
                        <Text style={[styles.text, { marginTop: 50 }]}>Profissional disponíveis</Text> :
                        <Text style={[styles.text, { marginTop: 50 }]}>Escolha um horário e dia para ver quais profissionais estão disponíveis</Text>
                )
            }

            {
                availableProfessional && (
                    availableProfessional.map((professional, index) => (

                        <Pressable
                            style={schedule.professional === professional.name ? professionalSelected : styles.professional}
                            activeOpacity={.8}
                            onPress={() => handleProfessionalSelected(professional.name, professional.professionalUid)}
                            key={index}
                        >
                            <Text style={styles.professionalName}>{professional.name}</Text>

                            {
                                professional?.profilePicture ?
                                    <Image source={{ uri: professional.profilePicture }} style={styles.img} /> :
                                    <Image source={DefaultPicture} style={styles.img} />
                            }

                        </Pressable>

                    )
                    )
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

    professional: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: "#00000010",
        paddingHorizontal: 20,
        paddingVertical: 5,
    },

    img: {
        width: 130,
        height: 130,
        borderRadius: 150,
    },

    professionalName: {
        fontSize: globalStyles.fontSizeMedium,
        fontWeight: "bold",
        color: "#000000",
    },

    text: {
        color: "#000000",
        fontWeight: globalStyles.fontFamilyBold,
        width: "100%",
        fontSize: globalStyles.fontSizeSmall,
        marginTop: 30,
        marginBottom: 10,
    },
})