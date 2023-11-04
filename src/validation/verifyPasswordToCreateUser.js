import { MessageErrorAuthImage } from "../assets/imgs/MessageErrorAuthImage";
import { handleError } from "../handlers/handleError";

export const verifyPasswordToCreateUser = (password, confirmPassword, setModalContent, setSomethingWrong) => {
    try {
        password = password.trim()
        confirmPassword = confirmPassword.trim()

        if (password === "" || confirmPassword === "") {
            setModalContent({
                image: <MessageErrorAuthImage />,
                mainMessage: "Campos vazios",
                message: "Por favor preencha todos os campos para que possamos continuar com o cadastro.",
                firstButtonText: "Tentar novamente",
                firstButtonAction: () => setModalContent(null)
            })

            return
        }
        else if (password !== confirmPassword) {
            setModalContent({
                image: <MessageErrorAuthImage />,
                mainMessage: "Senhas diferentes",
                message: "As senhas devem ser iguais",
                firstButtonText: "Tentar Novamente",
                firstButtonAction: () => setModalContent(null)
            })

            return
        }
        else if (password.length < 6) {
            setModalContent({
                image: <MessageErrorAuthImage />,
                mainMessage: "Senha inválida",
                message: "A senha deve ter pelo menos 6 caracteres",
                firstButtonText: "Tentar Novamente",
                firstButtonAction: () => setModalContent(null)
            })

            return
        }

        return true

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("verifyPasswordToCreateUser", message);
    }
}