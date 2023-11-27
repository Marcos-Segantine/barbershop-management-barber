import firestore from '@react-native-firebase/firestore';

import UserNotFoundImage from "../../assets/imgs/UserNotFoundImage.jpg"
import { MessageErrorAuthImage } from '../../assets/imgs/MessageErrorAuthImage';

import { isValidEmail } from '../../validation/isValidEmail';
import { isValidPhoneNumber } from '../../validation/isValidPhoneNumber';

import { handleError } from '../../handlers/handleError';

export const getUserDataByEmailOrPhone = async (
  email,
  phone,
  setModalContent,
  setSomethingWrong,
  userType = "users",
) => {
  try {

    email = email.trim()
    phone = phone.trim()

    if (email !== "") {
      const isValid = isValidEmail(email, setSomethingWrong)

      if (!isValid) {
        setModalContent({
          image: <MessageErrorAuthImage height={300} width={300} />,
          mainMessage: "Email inválido",
          message: "O email que você inseriu é inválido. Por favor corrija-o e tente novamente.",
          firstButtonText: "Ok",
          firstButtonAction: () => setModalContent(null)
        })

        return
      }
    }

    else if (phone !== "") {
      const isValid = isValidPhoneNumber(phone, setSomethingWrong)

      if (!isValid) {
        setModalContent({
          image: <MessageErrorAuthImage height={300} width={300} />,
          mainMessage: "Número inválido",
          message: "Onúmerod e telefone que você inseriu é inválido, Por favor corrija-o e tente novamente.",
          firstButtonText: "Ok",
          firstButtonAction: () => setModalContent(null)
        })

        return
      }
    }

    const usersRef = email ?
      await firestore().collection(userType).where("email", "==", email).get() :
      await firestore().collection(userType).where("phone", "==", phone).get()

    if (usersRef.docs.length === 0 && userType === "users") {
      setModalContent({
        image: UserNotFoundImage,
        mainMessage: "Usuário não encontrado",
        message: "Não encontramos nenhum cliente que tenha este email e/ou telefone. Por favor confira os campos e tente novamente.",
        firstButtonText: "Ok",
        firstButtonAction: () => setModalContent(null)
      })

      return
    }

    else if (usersRef.docs.length === 0 && userType === "barbers") {
      setModalContent({
        image: UserNotFoundImage,
        mainMessage: "Profissional não encontrado",
        message: "Não há nenhum profissional que tenha este email e/ou telefone. Por favor confira os campos e tente novamente.",
        firstButtonText: "Ok",
        firstButtonAction: () => setModalContent(null)
      })

      return

    }

    if (email) {
      const user = usersRef.docs[0].data()

      if (!user) {
        setModalContent({
          image: UserNotFoundImage,
          mainMessage: "Usuário não encontrado",
          message: "Não encontramos nenhum cliente que tenha este email e/ou telefone. Por favor confira os campos e tente novamente.",
          firstButtonText: "Ok",
          firstButtonAction: () => setModalContent(null)
        })

        return
      }

      return user;
    }

    else if (phone) {
      const user = usersRef.docs[0].data()

      if (!user) {
        setModalContent({
          image: UserNotFoundImage,
          mainMessage: "Usuário não encontrado",
          message: "Não encontramos nenhum cliente que tenha este email e/ou telefone. Por favor confira os campos e tente novamente.",
          firstButtonText: "Ok",
          firstButtonAction: () => setModalContent(null)
        })

        return
      }
      return user
    }

  } catch ({ message }) {
    setSomethingWrong(true)
    handleError("getUserDataByEmailOrPhone", message)
  }
};
