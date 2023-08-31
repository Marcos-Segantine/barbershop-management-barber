import firestore from '@react-native-firebase/firestore';

import UserNotFoundImage from "../../assets/imgs/UserNotFoundImage.jpg"
import { MessageErrorAuthImage } from '../../assets/imgs/MessageErrorAuthImage';

import { isValidEmail } from '../../validation/isValidEmail';
import { isValidPhoneNumber } from '../../validation/isValidPhoneNumber';

export const getUserDataByEmailOrPhone = async (
  email,
  phone,
  setModalShowUser,
  setSomethingWrong
) => {
  try {

    if (email) {
      const isValid = isValidEmail(email)

      if (!isValid) {
        setModalShowUser({
          image: <MessageErrorAuthImage height={300} width={300} />,
          mainMessage: "Email inválido",
          message: "O email que você inseriu é inválido. Por favor corrija-o e tente novamente.",
          firstButtonText: "Ok",
          firstButtonAction: () => setModalShowUser(null)
        })

        return
      }
    }

    else if (phone) {
      const isValid = isValidPhoneNumber(phone)

      if (!isValid) {
        setModalShowUser({
          image: <MessageErrorAuthImage height={300} width={300} />,
          mainMessage: "Telefone inválido",
          message: "O telefone que você inseriu é inválido. Por favor corrija-o e tente novamente.",
          firstButtonText: "Ok",
          firstButtonAction: () => setModalShowUser(null)
        })

        return
      }
    }


    const usersRef = email ?
      await firestore().collection("users").where("email", "==", email).get() :
      await firestore().collection("users").where("phone", "==", phone).get()

    if (usersRef.docs.length === 0) {
      setModalShowUser({
        image: UserNotFoundImage,
        mainMessage: "Usuário não encontrado",
        message: "Não encontramos nenhum cliente que tenha este email e/ou telefone. Por favor confira os campos e tente novamente.",
        firstButtonText: "Ok",
        firstButtonAction: () => setModalShowUser(null)
      })

      return
    }

    if (email) {
      const user = usersRef.docs[0].data()

      if (!user) {
        setModalShowUser({
          image: UserNotFoundImage,
          mainMessage: "Usuário não encontrado",
          message: "Não encontramos nenhum cliente que tenha este email e/ou telefone. Por favor confira os campos e tente novamente.",
          firstButtonText: "Ok",
          firstButtonAction: () => setModalShowUser(null)
        })

        return
      }

      return user;
    }

    else if (phone) {
      const user = usersRef.docs[0].data()

      setModalShowUser({
        image: UserNotFoundImage,
        mainMessage: "Usuário não encontrado",
        message: "Não encontramos nenhum cliente que tenha este email e/ou telefone. Por favor confira os campos e tente novamente.",
        firstButtonText: "Ok",
        firstButtonAction: () => setModalShowUser(null)
      })

      return user
    }

  } catch (error) {
    console.log(error);
    setSomethingWrong(true)
  }
};
