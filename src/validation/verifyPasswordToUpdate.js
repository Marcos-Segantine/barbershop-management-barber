import { MessageErrorAuthImage } from "../assets/imgs/MessageErrorAuthImage";

export const verifyPasswordToUpdate = (
    currentPassword,
    newPassword,
    confirmNewPassword,
    setModalContent,
    setSomethingWrong,
    setIsLoading
) => {

    try {
        if (confirmNewPassword.length === 0 || newPassword.length === 0) {
            setModalContent({
                image: <MessageErrorAuthImage />,
                mainMessage: "Campo(s) vazio(s)",
                message: "Por favor preencha todos os campos, para que possamos prosseguir",
                firstButtonText: "Entendi",
                firstButtonAction: () => setModalContent(null)
            })

            setIsLoading(false)
            return false
        }
        else if (confirmNewPassword !== newPassword) {
            setModalContent({
                image: <MessageErrorAuthImage />,
                mainMessage: "Senhas diferentes",
                message: "As senhas devem ser iguais",
                firstButtonText: "Entendi",
                firstButtonAction: () => setModalContent(null)
            })

            setIsLoading(false)
            return false
        }
        else if (currentPassword === newPassword) {
            setModalContent({
                image: <MessageErrorAuthImage />,
                mainMessage: "Mesma senha",
                message: "A senha que você inseriu é igual a que você está usando, caso queira atualiza-lá, digite uma diferente",
                firstButtonText: "Entendi",
                firstButtonAction: () => setModalContent(null)
            })

            setIsLoading(false)
            return false
        }
        else if (newPassword < 6) {
            setModalContent({
                image: <MessageErrorAuthImage />,
                mainMessage: "Senha muito curta",
                message: "A senha deve ter no mínimo 6 caracteres",
                firstButtonText: "Entendi",
                firstButtonAction: () => setModalContent(null)
            })

            setIsLoading(false)
            return false
        }

        return true

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}