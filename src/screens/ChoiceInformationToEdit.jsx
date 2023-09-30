import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native"

import { globalStyles } from "../assets/globalStyles"
import { EditProfileImage } from "../assets/imgs/EditProfileImage"
import { EditSchedulesImage } from "../assets/imgs/EditSchedulesImage"
import { EditServicesImage } from "../assets/imgs/EditServicesImage"
import { DaysBlocked } from "../assets/imgs/BlockedDays"

import { ComeBack } from "../components/ComeBack"

export const ChoiceInformationToEdit = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={globalStyles.container}>
            <ComeBack text={"Editar Informações"} />

            <TouchableOpacity style={[styles.content, { marginTop: 50 }]} activeOpacity={0.6} onPress={() => navigation.navigate("FillProfile", { isToUpdateProfessionalData: true })}>
                <EditProfileImage height={250} width={250} />
                <Text style={styles.text}>Editar Informações de Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.content} activeOpacity={0.6} onPress={() => navigation.navigate("EditSchedulesOfWork")}>
                <EditSchedulesImage height={250} width={250} />
                <Text style={styles.text}>Editar Horários de Trabalho</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.content} activeOpacity={0.6} onPress={() => navigation.navigate("EditServices")}>
                <EditServicesImage height={250} width={250} />
                <Text style={styles.text}>Editar Serviços</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.content} activeOpacity={0.6} onPress={() => navigation.navigate("BlockSpecificDays")}>
                <DaysBlocked height={250} width={250} />
                <Text style={styles.text}>Bloquear dias</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        alignItems: "center",
        borderWidth: 1,
        borderColor: globalStyles.orangeColor,
        borderRadius: 20,
        paddingVertical: 25,
        marginVertical: 15,
    },

    text: {
        color: "#000000",
        fontSize: globalStyles.fontSizeMedium,
        fontFamily: globalStyles.fontFamilyBold,
        textAlign: "center",
    }
})