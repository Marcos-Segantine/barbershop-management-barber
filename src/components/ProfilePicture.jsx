import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { useEffect, useState } from "react"

import { EditProfilePicture } from "../assets/icons/EditProfilePictureIcon"
import DefaultPicture from "../assets/icons/DefaultPicture.png"

import AsyncStorage from "@react-native-async-storage/async-storage"

export const ProfilePicture = ({ setNewProfilePicture, profilePicture = null }) => {
    const [pictureCached, setPictureCached] = useState(null)

    useEffect(() => {

        (async () => {

            setPictureCached(await AsyncStorage.getItem("@barber_app_barber__profilePicture"));

        })();

    }, [])

    if (pictureCached) {
        return (
            <Image source={{ uri: `data:image/png;base64,${pictureCached}` }} style={{ width: 200, height: 200, borderRadius: 150 }} />
        )
    }

    return (
        <View style={profilePicture ? { padding: 10, marginTop: 30, } : { borderRadius: 150, marginTop: 30 }}>
            {
                profilePicture ?
                    <Image source={{ uri: `data:image/png;base64,${profilePicture}` }} style={{ width: 200, height: 200, borderRadius: 150 }} /> :
                    <Image source={DefaultPicture} style={{ width: 200, height: 200, borderRadius: 150 }} />
            }

            {
                !!setNewProfilePicture &&
                <TouchableOpacity TouchableOpacity style={styles.contentEditPicture} activeOpacity={.8} onPress={() => setNewProfilePicture()}>
                    <EditProfilePicture width={40} height={40} />
                </TouchableOpacity>
            }

        </View >
    )
}

const styles = StyleSheet.create({
    contentEditPicture: {
        backgroundColor: '#fc9501',
        position: 'absolute',
        bottom: 15,
        padding: 3,
        borderRadius: 10,
        right: 15,
        padding: 5,
    },
})