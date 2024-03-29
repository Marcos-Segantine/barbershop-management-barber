import { useContext, useState } from "react"
import { TextInput, View, ScrollView, StyleSheet, Text } from "react-native"

import { Button } from "../components/Button"
import { ComeBack } from "../components/ComeBack"
import { Loading } from "../components/Loading"
import { DefaultModal } from "../components/modals/DefaultModal"
import { Contact } from "../components/modals/Contact"
import { ProfilePicture } from "../components/ProfilePicture"

import { globalStyles } from "../assets/globalStyles"

import { UserContext } from "../context/UserContext"
import { CreateNewPersonContext } from "../context/CreateNewPerson"
import { SomethingWrongContext } from "../context/SomethingWrongContext"

import { handleConfirmFillProfile } from "../handlers/handleConfirmFillProfile"

import { launchImageLibrary } from 'react-native-image-picker';

import { generateNewUid } from "../utils/generateNewUid"
import { formatInputPhoneNumber } from "../utils/formatInputPhoneNumber"

import CheckBox from '@react-native-community/checkbox';

export const FillProfile = ({ navigation, route }) => {
    const { userData, setUserData } = useContext(UserContext)
    const { createNewPerson, setCreateNewPearson } = useContext(CreateNewPersonContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)

    const [picture, setPicture] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const [contact, setContact] = useState(false)

    const [male, setMale] = useState(false)
    const [fame, setFame] = useState(false)
    const [otherGender, setOtherGender] = useState(false)

    const { isToUpdateProfessionalData } = route.params

    const setNewProfilePicture = async () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
        };

        let uid = null

        if (!isToUpdateProfessionalData) {
            uid = generateNewUid(setSomethingWrong)
            setCreateNewPearson({ ...createNewPerson, uid: uid })
        }
        else uid = userData.uid

        launchImageLibrary(options, (response) => {
            if (response.assets && response.assets.length > 0) {
                const pathPic = response.assets[0].base64;
                if (pathPic) {
                    setCreateNewPearson({ ...createNewPerson, profilePicture: pathPic })
                    setPicture(pathPic);
                }
            }
        });
    }

    const handlePhoneNumber = (phone) => {
        if (phone.length > 15) {
            phone = phone.split("").slice(0, 15).join("")
            setCreateNewPearson({ ...createNewPerson, phone: formatInputPhoneNumber(phone) })

            return
        }

        setCreateNewPearson({ ...createNewPerson, phone: formatInputPhoneNumber(phone) })
    }

    const headerText = !!createNewPerson?.newPerson ? createNewPerson.newPerson === "client" ? "Dados do Cliente" : "Dados do Profissional" : "Atualizar Perfil"

    if (isLoading) return <Loading flexSize={1} />

    return (
        <ScrollView
            contentContainerStyle={globalStyles.container}
            overScrollMode="never"
            bounces={false}
            showsVerticalScrollIndicator={false}
        >
            <ComeBack text={headerText} action={() => setCreateNewPearson(null)} />

            <DefaultModal
                modalContent={modalContent}
            />

            <Contact
                modalContact={contact}
                setModalVisible={setContact}
            />

            {
                isToUpdateProfessionalData &&
                <Text style={{ color: "#000000", fontFamily: globalStyles.fontFamilyBold, marginVertical: 20, fontSize: globalStyles.fontSizeSmall }}>
                    Atenção: <Text style={{ fontSize: globalStyles.fontSizeSmall, fontFamily: globalStyles.fontFamilyMedium }}>Os campos em branco permanecerão sem mudanças nas informações.</Text>
                </Text>
            }

            <ProfilePicture
                setNewProfilePicture={setNewProfilePicture}
                profilePicture={createNewPerson?.profilePicture || userData?.profilePicture}
                isCreatingAccount={isToUpdateProfessionalData ? false : true}
                creatingNewAccount={createNewPerson}
            />

            <View style={styles.contentInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    value={createNewPerson?.name}
                    placeholderTextColor={"#00000050"}
                    onChangeText={text => setCreateNewPearson({ ...createNewPerson, name: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={createNewPerson?.email}
                    placeholderTextColor={"#00000050"}
                    onChangeText={text => setCreateNewPearson({ ...createNewPerson, email: text })}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Número de celular"
                    placeholderTextColor={"#00000050"}
                    value={formatInputPhoneNumber(createNewPerson?.phone, setCreateNewPearson, createNewPerson, setSomethingWrong)}
                    onChangeText={text => handlePhoneNumber(text)}
                    keyboardType="numeric"
                />

                <Text style={{ color: "#000000", fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall, width: "100%", marginTop: 20 }}>Gênero</Text>

                <View style={styles.contentGenderOptions}>
                    <View style={styles.contentCheckbox}>
                        <CheckBox
                            onTintColor={globalStyles.orangeColor}
                            onFillColor={globalStyles.orangeColor}
                            onCheckColor={"#FFFFFF"}
                            onAnimationType={"one-stroke"}
                            offAnimationType={"one-stroke"}
                            animationDuration={0.3}
                            disabled={false}
                            value={male}
                            onValueChange={(newValue) => { setMale(newValue), setFame(false), setOtherGender(false) }}
                        />

                        <Text style={styles.text}>Masculino</Text>
                    </View>

                    <View style={[styles.contentCheckbox, { justifyContent: "center" }]}>
                        <CheckBox
                            onTintColor={globalStyles.orangeColor}
                            onFillColor={globalStyles.orangeColor}
                            onCheckColor={"#FFFFFF"}
                            onAnimationType={"one-stroke"}
                            offAnimationType={"one-stroke"}
                            animationDuration={0.3}
                            disabled={false}
                            value={fame}
                            onValueChange={(newValue) => { setFame(newValue), setMale(false), setOtherGender(false) }}
                        />

                        <Text style={styles.text}>Feminino</Text>
                    </View>

                    <View style={styles.contentCheckbox}>
                        <CheckBox
                            onTintColor={globalStyles.orangeColor}
                            onFillColor={globalStyles.orangeColor}
                            onCheckColor={"#FFFFFF"}
                            onAnimationType={"one-stroke"}
                            offAnimationType={"one-stroke"}
                            animationDuration={0.3}
                            disabled={false}
                            value={otherGender}
                            onValueChange={(newValue) => { setOtherGender(newValue), setFame(false), setMale(false) }}
                        />

                        <Text style={styles.text}>Outro</Text>
                    </View>
                </View>
            </View>

            {
                isToUpdateProfessionalData &&
                <Text style={styles.alertBottom}>Não é aconselhável modificar constantemente suas informações.</Text>
            }

            <Button
                text={"Confirmar"}
                action={() => handleConfirmFillProfile(
                    setIsLoading,
                    { male, fame, otherGender },
                    picture,
                    isToUpdateProfessionalData,
                    createNewPerson,
                    userData,
                    setModalContent,
                    setUserData,
                    setCreateNewPearson,
                    navigation,
                    setContact,
                    setSomethingWrong
                )}
            />

        </ScrollView >
    )
}

const styles = StyleSheet.create({
    contentInput: {
        marginTop: "10%",
        marginBottom: "10%",
        width: "100%",
        alignItems: 'center'
    },

    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#fafafa",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "transparent",
        marginTop: 10,
        paddingHorizontal: 20,
        color: "#000000",
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyMedium
    },

    contentGenderOptions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        marginTop: 20
    },

    contentCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "50%",
        marginVertical: 5,
    },

    text: {
        color: "#000000",
        fontFamily: globalStyles.fontFamilyBold,
        fontSize: globalStyles.fontSizeSmall,
        marginLeft: 5,
    },

    alertBottom: {
        color: "#00000060",
        fontSize: globalStyles.fontSizeVerySmall,
        fontFamily: globalStyles.fontFamilyBold,
        textAlign: "center",
        marginBottom: 10,
        width: "80%",
    }
})
