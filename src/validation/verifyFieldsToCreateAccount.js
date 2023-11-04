import { isValidPhoneNumber } from "./isValidPhoneNumber"
import { isValidEmail } from "./isValidEmail"

import { MessageErrorAuthImage } from "../assets/imgs/MessageErrorAuthImage"

export const verifyFieldsToCreateAccount = (
    userInformation,
    fields,
    setModalContent,
    setSomethingWrong
) => {
    for (const field of fields) {
        if (userInformation[field] === undefined || userInformation[field] === "") {
            setModalContent({
                image: <MessageErrorAuthImage />,
                mainMessage: "Campo(s) vazio(s)",
                message: "Por favor, preencha todos os campos corretamente",
                firstButtonText: "Tentar Novamente",
                firstButtonAction: () => setModalContent(null)
            })

            return false
        }
    }

    const isPhoneValid = isValidPhoneNumber(userInformation.phone, setSomethingWrong)
    if (!isPhoneValid) {
        setModalContent({
            image: <MessageErrorAuthImage />,
            mainMessage: "Número de telefone inválido",
            message: "Por favor, verifique o número de telefone que você inseriu. Lembre de colocar o DDD. Exemplo: (99) 99999-9999",
            firstButtonText: "Entendi",
            firstButtonAction: () => setModalContent(null)
        })

        return false
    }

    const isEmailValid = isValidEmail(userInformation.email, setSomethingWrong)
    if (!isEmailValid) {
        setModalContent({
            image: <MessageErrorAuthImage />,
            mainMessage: "Email inválido",
            message: "Por favor, insira um email válido. Exemplo: exemplo@exemplo.com",
            firstButtonText: "Tentar Novamente",
            firstButtonAction: () => setModalContent(null)
        })

        return false
    }

    return true
}
