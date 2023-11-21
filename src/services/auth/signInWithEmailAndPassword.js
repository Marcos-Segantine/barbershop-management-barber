import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { findErrorAuth } from './findErrorAuth';

import { MessageErrorAuthImage } from '../../assets/imgs/MessageErrorAuthImage';
import { handleError } from '../../handlers/handleError';

export const signInWithEmailAndPassword = async (
  email,
  password,
  setUserData,
  setEmail,
  setPassword,
  setIsLoading,
  setSomethingWrong,
  setModalInfo,
  navigation,
  createNewPearson,
  setCreateNewPearson
) => {
  try {

    const userData = await findErrorAuth(
      email,
      password,
      setSomethingWrong,
      setIsLoading,
      setModalInfo,
      navigation,
      createNewPearson,
      setCreateNewPearson
    )

    if (!userData) return

    await auth().signInWithEmailAndPassword(email, password)
      .then(async () => {
        if (!auth().currentUser.emailVerified) {
          setModalInfo({
            image: <MessageErrorAuthImage />,
            mainMessage: "Email não verificado",
            message: "Verifique seu email e clique em 'Reenviar'. Verifique sua caixa de spam se não o encontrar.",
            firstButtonText: "Tentar Novamente",
            secondButtonText: "Reenviar",
            firstButtonAction: () => setModalInfo(null),
            secondButtonAction: () => {
              auth().currentUser.sendEmailVerification()
              setModalInfo(null)
            }
          })

          setIsLoading(false)

          return
        }

        await AsyncStorage.setItem('@barber_app__barber_email', email);

        setUserData(userData);
        navigation.navigate('Home');

        setEmail("")
        setPassword("")
        setIsLoading(false)

      })
      .catch(async (error) => {
        if (
          error.message ===
          "[auth/wrong-password] The password is invalid or the user does not have a password." ||
          error.message ===
          "[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted."
        ) {
          await auth().createUserWithEmailAndPassword(email, password)
          await auth().signInWithEmailAndPassword(email, password)

          await AsyncStorage.setItem('@barber_app__barber_email', email);

          setUserData(userData);
          navigation.navigate('Home');

          setEmail("")
          setPassword("")
          setIsLoading(false)
        }
        else if (error.message === "[auth/too-many-requests] We have blocked all requests from this device due to unusual activity. Try again later. [ Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. ]") {
          setModalInfo({
            image: <MessageErrorAuthImage />,
            mainMessage: "Muitas tentativas",
            message: "Parece que houve fez muitas tentativas de acesso a sua conta, por questoẽs de segunrança seu acesso sera suspenso temporariamente.",
            firstButtonText: "Ok",
            firstButtonAction: () => setModalInfo(null),
          })

          setIsLoading(false)

          return
        }
        else throw Error("User not found")
      })

  } catch (err) {
    setSomethingWrong(true)
    handleError("signInWithEmailAndPassword", err.message);
  }
}