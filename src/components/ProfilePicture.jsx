import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { useEffect, useState } from "react"

import { EditProfilePicture } from "../assets/icons/EditProfilePictureIcon"
import DefaultPicture from "../assets/icons/DefaultPicture.png"

import AsyncStorage from "@react-native-async-storage/async-storage"

export const ProfilePicture = ({ setNewProfilePicture, profilePicture, creatingNewAccount, isCreatingAccount }) => {
    const [pictureCached, setPictureCached] = useState(null)

    useEffect(() => {

        (async () => {

            setPictureCached(await AsyncStorage.getItem("@barber_app_barber__profilePicture"));

        })();

    }, [])

    useEffect(() => {

        (async () => {

            if (creatingNewAccount) {
                await AsyncStorage.removeItem("@barber_app_barber__profilePicture")
            }

        })();

    }, [])

    if (isCreatingAccount === false) {
        return (
            <View style={styles.contentPicture}>
                {
                    profilePicture ?
                        <Image source={{ uri: profilePicture }} style={styles.img} /> :
                        <Image source={DefaultPicture} style={styles.img} />
                }

                {
                    !!setNewProfilePicture &&
                    <TouchableOpacity TouchableOpacity style={styles.contentEditPicture} activeOpacity={.8} onPress={() => setNewProfilePicture()}>
                        <EditProfilePicture width={40} height={40} />
                    </TouchableOpacity>
                }
            </View>
        )
    }

    if (creatingNewAccount?.newPerson == "client") {
        return (
            <View style={styles.contentPicture}>
                {
                    creatingNewAccount.profilePicture ?
                        <Image source={{ uri: `data:image/png;base64,${profilePicture}` }} style={styles.img} /> :
                        <Image source={DefaultPicture} style={styles.img} />
                }

                <TouchableOpacity TouchableOpacity style={styles.contentEditPicture} activeOpacity={.8} onPress={() => setNewProfilePicture()}>
                    <EditProfilePicture width={40} height={40} />
                </TouchableOpacity>

            </View>
        )
    }
    else if (creatingNewAccount !== null) {
        return (
            <View style={styles.contentPicture}>
                {
                    creatingNewAccount.profilePicture ?
                        <Image source={{ uri: `data:image/png;base64,${creatingNewAccount.profilePicture}` }} style={styles.img} /> :
                        <Image source={DefaultPicture} style={styles.img} />
                }


                <TouchableOpacity TouchableOpacity style={styles.contentEditPicture} activeOpacity={.8} onPress={() => setNewProfilePicture()}>
                    <EditProfilePicture width={40} height={40} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.contentPicture}>
            {
                profilePicture ?
                    <Image source={{ uri: profilePicture }} style={styles.img} /> :
                    <Image source={DefaultPicture} style={styles.img} />
            }

            {
                !!setNewProfilePicture &&
                <TouchableOpacity TouchableOpacity style={styles.contentEditPicture} activeOpacity={.8} onPress={() => setNewProfilePicture()}>
                    <EditProfilePicture width={40} height={40} />
                </TouchableOpacity>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    contentPicture: {
        width: 250,
        height: 250,
        borderRadius: 150,
        marginTop: 20
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

    img: {
        width: "100%",
        height: "100%",
        borderRadius: 150,
    }
})