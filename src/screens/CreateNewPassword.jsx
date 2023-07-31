import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { useContext, useState } from "react"

import { ComeBack } from "../components/ComeBack"
import { Button } from "../components/Button"
import { Loading } from "../components/Loading"
import { DefaultModal } from "../components/modals/DefaultModal"

import { CreateNewPasswordImage } from "../assets/imgs/CreateNewPasswordImage"
import { PadlockIcon } from "../assets/icons/PadlockIcon"
import passwordVisionIcon from "../assets/icons/passwordVisionIcon.png"
import passwordVisionBlockIcon from "../assets/icons/passwordVisionBlockIcon.png"
import { globalStyles } from "../assets/globalStyles"

import { CreateNewPersonContext } from "../context/CreateNewPerson"
import { SomethingWrongContext } from "../context/SomethingWrongContext"

import { createPerson } from "../services/user/createPerson"
import { ScheduleContext } from "../context/ScheduleContext"
import { updateUserPassword } from "../services/user/updateUserPassword"
import { UserContext } from "../context/UserContext"

import { verifyPasswordToUpdate } from "../validation/verifyPasswordToUpdate"

export const CreateNewPassword = ({ navigation, route }) => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [inputSelected, setInputSelected] = useState("")

  const [hiddenPassword, setHiddenPassword] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  const { userData, setUserData } = useContext(UserContext)
  const { createNewPerson, setCreateNewPearson } = useContext(CreateNewPersonContext)
  const { schedule, setSchedule } = useContext(ScheduleContext)
  const { setSomethingWrong } = useContext(SomethingWrongContext)

  const { isToUpdateUserPassword } = route.params ? route.params : {}

  const handleFocusInput = (field) => setInputSelected(field)

  const stylePassword = inputSelected === 'password' ? [styles.input, { backgroundColor: '#fff8ec', borderColor: '#fc9501', borderWidth: 1 }] : styles.input
  const styleConfirmPassword = inputSelected === 'confirmPassword' ? [styles.input, { backgroundColor: '#fff8ec', borderColor: '#fc9501', borderWidth: 1 }] : styles.input

  const handleContinue = async () => {
    if (isToUpdateUserPassword) {
      setIsLoading(true)

      if (verifyPasswordToUpdate(
        userData.password,
        password,
        confirmPassword,
        setModalContent,
        setSomethingWrong,
        setIsLoading
      ) === false) return

      await updateUserPassword(
        userData,
        setUserData,
        password,
        setSomethingWrong
      )

      setIsLoading(false)
      navigation.navigate("Security")

      return
    }

    createNewPerson.newPerson === "client" ?
      (
        await createPerson({ ...createNewPerson, password, }, setSchedule, schedule),
        navigation.navigate("AddSchedule", { headerText: "Agendar Horário", scheduleToUpdate: null, isToUpdateSchedule: false })
      ) :
      (
        setCreateNewPearson({ ...createNewPerson, password: password, }),
        navigation.navigate("EditSchedulesOfWork")
      )
  }

  if (isLoading) return <Loading flexSize={1} />

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <ComeBack text={"Crie uma nova senha"} />

      <DefaultModal
        modalContent={modalContent}
      />

      <CreateNewPasswordImage width={350} height={350} />

      <Text style={styles.text}>
        Crie uma nova senha
      </Text>

      <View style={styles.contentInput}>
        <View style={stylePassword}>
          <PadlockIcon />

          <TextInput
            style={{ color: "#000000", width: "100%" }}
            placeholder={"Senha"}
            value={password}
            placeholderTextColor={"#00000050"}
            secureTextEntry={hiddenPassword}
            onFocus={() => handleFocusInput("password")}
            onChangeText={text => setPassword(text.trim(""))}

          />
          <Pressable style={styles.iconPasswordVisibility} onPress={() => setHiddenPassword(!hiddenPassword)}>
            <Image source={hiddenPassword ? passwordVisionBlockIcon : passwordVisionIcon} style={{ width: 25, height: 25 }} />
          </Pressable>
        </View>

        <View style={styleConfirmPassword}>
          <PadlockIcon />

          <TextInput
            style={{ color: "#000000", width: "100%" }}
            placeholder={"Senha"}
            value={confirmPassword}
            placeholderTextColor={"#00000050"}
            secureTextEntry={hiddenPassword}
            onFocus={() => handleFocusInput("confirmPassword")}
            onChangeText={text => setConfirmPassword(text.trim(""))}

          />
          <Pressable style={styles.iconPasswordVisibility} onPress={() => setHiddenPassword(!hiddenPassword)}>
            <Image source={hiddenPassword ? passwordVisionBlockIcon : passwordVisionIcon} style={{ width: 25, height: 25 }} />
          </Pressable>
        </View>
      </View>

      <Button text={"Continue"} action={handleContinue} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },

  contentInput: {
    marginTop: "10%",
    marginBottom: "10%",
    width: "100%",
    alignItems: 'center',
  },

  input: {
    width: "100%",
    backgroundColor: "#fafafa",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    marginTop: 20,
    paddingHorizontal: 20,
    color: "#000000",
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconPasswordVisibility: {
    position: 'absolute',
    right: 5,
    height: "100%",
    paddingHorizontal: 5,
    justifyContent: "center",
  },

  text: {
    color: "#000000",
    fontSize: globalStyles.fontSizeSmall,
    width: "85%",
    marginTop: 20,
  },
})
