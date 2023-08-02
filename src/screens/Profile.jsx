import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native"
import { useContext } from "react"

import { UserContext } from "../context/UserContext"
import { SomethingWrongContext } from "../context/SomethingWrongContext"
import { CreateNewPersonContext } from "../context/CreateNewPerson"

import { HeaderScreensMenu } from "../components/HeaderScreensMenu"
import { LinkProfile } from "../components/LinkProfile"
import { Menu } from "../components/Menu"

import { ProfileIcon } from "../assets/icons/ProfileIcon"
import { NotificationIcon } from "../assets/icons/NotificationIcon"
import { CheckIcon } from "../assets/icons/CheckIcon"
import { PadlockIcon } from "../assets/icons/PadlockIcon"
import { LogOutIcon } from "../assets/icons/LogOutIcon"
import AddProfessional from "../assets/icons/addProfessionalIcon.png"
import { globalStyles } from "../assets/globalStyles"
import { logOut } from "../services/user/logOut"
import DefaultPicture from "../assets/icons/DefaultPicture.png"

export const Profile = ({ navigation }) => {
  const { userData } = useContext(UserContext)
  const { setSomethingWrong } = useContext(SomethingWrongContext)

  const { createNewPerson, setCreateNewPearson } = useContext(CreateNewPersonContext)

  const handleEditProfile = () => {
    setCreateNewPearson({ ...createNewPerson, newPerson: null })
    navigation.navigate("ChoiceInformationToEdit")
  }

  const handleNewProfessional = () => {
    setCreateNewPearson({ ...createNewPerson, newPerson: "professional" })
    navigation.navigate("FillProfile", { isToUpdateProfessionalData: false })
  }

  const handleNewClient = () => {
    setCreateNewPearson({ ...createNewPerson, newPerson: "client" })
    navigation.navigate("FillProfile", { isToUpdateProfessionalData: false })
  }

  return (
    <>
      <ScrollView contentContainerStyle={globalStyles.container}>
        <HeaderScreensMenu screenName={"Perfil"} />

        <View style={{ alignItems: 'center' }}>
          <View>
            {
              userData?.profilePicture ?
                <Image src={userData.profilePicture} style={{ width: 200, height: 200, borderRadius: 150 }} /> :
                <Image source={DefaultPicture} style={{ width: 200, height: 200, borderRadius: 150 }} />
            }
          </View>

          <Text style={styles.userName}>{userData && userData.name}</Text>
          <Text style={styles.userEmail}>{userData && userData.email}</Text>
        </View>

        <View style={styles.content}>

          <LinkProfile
            text={"Editar Perfil"}
            icon={<ProfileIcon />}
            action={handleEditProfile}
          />
          <LinkProfile
            text={"Notificação"}
            icon={<NotificationIcon />}
          />
          <LinkProfile
            text={"Segurança"}
            icon={<CheckIcon />}
            action={() => navigation.navigate("Security")}
          />
          <LinkProfile
            text={"Política de Privacidade"}
            icon={<PadlockIcon />}
          />
          <LinkProfile
            text={"Cadastrar Profissional"}
            icon={<Image source={AddProfessional} style={{ width: 24, height: 24 }} />}
            action={handleNewProfessional}
          />
          <LinkProfile
            text={"Cadastrar Cliente"}
            icon={<Image source={AddProfessional} style={{ width: 24, height: 24 }} />}
            action={handleNewClient}
          />

          <TouchableOpacity style={styles.logOutLink} onPress={() => logOut(navigation, setSomethingWrong)}>
            <View style={{ flexDirection: 'row' }}>
              <LogOutIcon />
              <Text style={styles.logOutText}>Sair</Text>
            </View>
          </TouchableOpacity>

        </View>

      </ScrollView>

      <Menu />
    </>
  )
}

const styles = StyleSheet.create({
  userName: {
    fontSize: globalStyles.fontSizeMedium,
    fontFamily: globalStyles.fontFamilyBold,
    color: '#000000',
    marginTop: 20,
    marginBottom: 5,
  },

  userEmail: {
    fontSize: globalStyles.fontSizeSmall,
    fontFamily: globalStyles.fontFamilyBold,
    color: '#000000'
  },

  content: {
    flex: 1,
    width: "100%",
    paddingVertical: 30,
  },

  logOutLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginVertical: 3,
    paddingHorizontal: 15,
  },

  logOutText: {
    marginLeft: 10,
    fontSize: globalStyles.fontSizeSmall,
    color: '#FF0000'
  }
})