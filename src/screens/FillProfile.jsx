import { useContext, useEffect, useState } from "react"
import { TextInput, View, ScrollView, StyleSheet, TouchableOpacity, Image, Text } from "react-native"

import { Button } from "../components/Button"
import { ComeBack } from "../components/ComeBack"
import { Loading } from "../components/Loading"
import { DefaultModal } from "../components/modals/DefaultModal"

import { EditProfilePicture } from "../assets/icons/EditProfilePictureIcon"
import { globalStyles } from "../assets/globalStyles"
import DefaultPicture from "../assets/icons/DefaultPicture.png"

import { UserContext } from "../context/UserContext"
import { CreateNewPersonContext } from "../context/CreateNewPerson"

import { handleConfirmFillProfile } from "../handlers/handleConfirmFillProfile"

import { launchImageLibrary } from 'react-native-image-picker';

import { generateNewUid } from "../utils/generateNewUid"
import { formatInputPhoneNumber } from "../utils/formatInputPhoneNumber"

import CheckBox from '@react-native-community/checkbox';

export const FillProfile = ({ navigation, route }) => {
    const { userData, setUserData } = useContext(UserContext)
    const { createNewPerson, setCreateNewPearson } = useContext(CreateNewPersonContext)

    const [picture, setPicture] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [modalContent, setModalContent] = useState(null)

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
            uid = generateNewUid()
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

    useEffect(() => {
        setCreateNewPearson({
            ...createNewPerson, name: "", email: "", phone: ""
        })

    }, [])

    console.log(createNewPerson);

    const headerText = !!createNewPerson?.newPerson ? createNewPerson.newPerson === "client" ? "Dados do cliente" : "Dados do profissional" : "Atualizar seu perfil"

    if (isLoading) return <Loading flexSize={1} />

    return (
        <ScrollView contentContainerStyle={globalStyles.container}>
            <ComeBack text={headerText} />

            <DefaultModal
                modalContent={modalContent}
            />

            {
                isToUpdateProfessionalData &&
                <Text style={{ color: "#000000", fontFamily: globalStyles.fontFamilyBold, marginVertical: 20, fontSize: globalStyles.fontSizeSmall }}>
                    AVISO: <Text style={{ fontSize: globalStyles.fontSizeSmall, fontFamily: globalStyles.fontFamilyMedium }}>As informações dos campos vazios não serão atualizadas</Text>
                </Text>
            }

            <View style={picture ? { padding: 10, marginTop: 30, } : { borderRadius: 150, marginTop: 30 }}>
                {
                    picture ?
                        <Image source={{ uri: `data:image/png;base64,${picture}` }} style={{ width: 200, height: 200, borderRadius: 150 }} /> :
                        <Image source={DefaultPicture} style={{ width: 200, height: 200, borderRadius: 150 }} />
                }

                <TouchableOpacity style={styles.contentEditPicture} activeOpacity={.8} onPress={setNewProfilePicture}>
                    <EditProfilePicture width={40} height={40} />
                </TouchableOpacity>
            </View>

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
                    value={formatInputPhoneNumber(createNewPerson?.phone)}
                    onChangeText={text => createNewPerson?.phone.length <= 14 && setCreateNewPearson({ ...createNewPerson, phone: text })}
                    keyboardType="numeric"
                />

                <Text style={{ color: "#000000", fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall, width: "100%", marginTop: 20 }}>Gênero</Text>

                <View style={styles.contentGenderOptions}>
                    <View style={styles.contentCheckbox}>
                        <CheckBox
                            tintColors={{ true: globalStyles.orangeColor, false: globalStyles.orangeColor }}
                            disabled={false}
                            value={male}
                            onValueChange={(newValue) => { setMale(newValue), setFame(false), setOtherGender(false) }}
                        />

                        <Text style={styles.text}>Masculino</Text>
                    </View>

                    <View style={[styles.contentCheckbox, { justifyContent: "center" }]}>
                        <CheckBox
                            tintColors={{ true: globalStyles.orangeColor, false: globalStyles.orangeColor }}
                            disabled={false}
                            value={fame}
                            onValueChange={(newValue) => { setFame(newValue), setMale(false), setOtherGender(false) }}
                        />

                        <Text style={styles.text}>Feminino</Text>
                    </View>

                    <View style={styles.contentCheckbox}>
                        <CheckBox
                            tintColors={{ true: globalStyles.orangeColor, false: globalStyles.orangeColor }}
                            disabled={false}
                            value={otherGender}
                            onValueChange={(newValue) => { setOtherGender(newValue), setFame(false), setMale(false) }}
                        />

                        <Text style={styles.text}>Outro</Text>
                    </View>
                </View>
            </View>

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

    contentEditPicture: {
        backgroundColor: '#fc9501',
        position: 'absolute',
        bottom: 15,
        padding: 3,
        borderRadius: 10,
        right: 15,
        padding: 5,
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
        fontSize: globalStyles.fontSizeSmall
    }
})
