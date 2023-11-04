import { isValidPhoneNumber } from "../validation/isValidPhoneNumber"
import { isValidEmail } from "../validation/isValidEmail"
import { verifyFieldsToCreateAccount } from "../validation/verifyFieldsToCreateAccount"
import { verifyIfFieldsAreSameToUpdateUserInfo } from "../validation/verifyIfFieldsAreSameToUpdateUserInfo"
import { verifyIfDataAlreadyExist } from "../validation/verifyIfDataAlreadyExist"

import { updateProfessionalData } from "../services/user/updateProfessionalData"

import { MessageErrorAuthImage } from "../assets/imgs/MessageErrorAuthImage"
import { handleError } from "./handleError"

export const handleConfirmFillProfile = async (
    setIsLoading,
    userGender,
    picture,
    isToUpdateProfessionalData,
    createNewPerson,
    userData,
    setModalContent,
    setUserData,
    setCreateNewPearson,
    navigation,
    setContact,
    setSomethingWrong

) => {
    try {

        setIsLoading(true)

        const gender = userGender.male ? "Masculino" : userGender.fame ? "Feminino" : userGender.otherGender ? "Outro" : null;

        if (isToUpdateProfessionalData) {

            const fieldsAreSame = verifyIfFieldsAreSameToUpdateUserInfo(createNewPerson, userData, setSomethingWrong)

            if (fieldsAreSame) {
                setModalContent({
                    image: <MessageErrorAuthImage />,
                    mainMessage: "Nenhuma atualização",
                    message: "Há campos que continuam sendo os mesmos, altere-os para que sejam atualizados",
                    firstButtonText: "Tentar Novamente",
                    firstButtonAction: () => setModalContent(null)
                })

                setIsLoading(false)
                return
            }

            if (createNewPerson.phone?.trim()) {
                const isPhoneValid = isValidPhoneNumber(createNewPerson.phone, setSomethingWrong)

                if (isPhoneValid === false) {
                    setModalContent({
                        image: <MessageErrorAuthImage />,
                        mainMessage: "Número de telefone inválido",
                        message: "Por favor, preencha os campos corretamente",
                        firstButtonText: "Tentar Novamente",
                        firstButtonAction: () => setModalContent(null)
                    })

                    setCreateNewPearson({ ...createNewPerson, phone: "" })
                    setIsLoading(false)
                    return
                }

                const phoneAlreadyExist = await verifyIfDataAlreadyExist("phone", createNewPerson.phone, setSomethingWrong)

                if (phoneAlreadyExist) {
                    setModalContent({
                        image: <MessageErrorAuthImage />,
                        mainMessage: "Telefone já cadastrado",
                        message: "Por favor, escolha outro telefone",
                        firstButtonText: "Tentar Novamente",
                        firstButtonAction: () => setModalContent(null)
                    })

                    setCreateNewPearson({ ...createNewPerson, email: "" })
                    setIsLoading(false)
                    return
                }
            }
            else if (createNewPerson.email?.trim()) {
                const isEmailValid = isValidEmail(createNewPerson.email, setSomethingWrong)

                if (isEmailValid === false) {
                    setModalContent({
                        image: <MessageErrorAuthImage />,
                        mainMessage: "Email inválido",
                        message: "Por favor, preencha os campos corretamente",
                        firstButtonText: "Tentar Novamente",
                        firstButtonAction: () => setModalContent(null)
                    })

                    setIsLoading(false)
                    return
                }

                const emailAlreadyExist = await verifyIfDataAlreadyExist("email", createNewPerson.email, setSomethingWrong)

                if (emailAlreadyExist) {
                    setModalContent({
                        image: <MessageErrorAuthImage />,
                        mainMessage: "Email já cadastrado",
                        message: "Por favor, escolha outro email",
                        firstButtonText: "Tentar Novamente",
                        firstButtonAction: () => setModalContent(null)
                    })

                    setIsLoading(false)
                    return
                }
            }
            else if (createNewPerson.name?.split(" ").filter(name => name.split("").length > 15).length > 0 || createNewPerson.name?.split("").length > 50) {
                setModalContent({
                    image: <MessageErrorAuthImage />,
                    mainMessage: "Nome muito Longo",
                    message: "Caso seu nom erealmente seja muito longo, por favor, entre em contato com o suporte",
                    firstButtonText: "Tentar Novamente",
                    firstButtonAction: () => setModalContent(null),
                    secondButtonText: "Contato",
                    secondButtonAction: () => {
                        setModalContent(null)
                        setContact(true)
                    }
                })

                setIsLoading(false)
                return

            }

            updateProfessionalData(
                userData.uid,
                { ...createNewPerson, gender: gender, profilePicture: picture },
                userData,
                setUserData,
                setIsLoading,
                navigation,
                setSomethingWrong
            )
        }
        else {
            const isFieldsAvailable = verifyFieldsToCreateAccount(
                { ...createNewPerson, gender: gender },
                ["name", "email", "phone", "gender"],
                setModalContent,
                setSomethingWrong
            )

            if (isFieldsAvailable === false) {
                setIsLoading(false)
                return

            } else setModalContent(null)

            const emailAlreadyExist = await verifyIfDataAlreadyExist("email", createNewPerson.email, setSomethingWrong)

            if (emailAlreadyExist) {
                setModalContent({
                    image: <MessageErrorAuthImage />,
                    mainMessage: "Email indisponível",
                    message: "O email que você escolheu já está sendo utilizado por outro usuário",
                    firstButtonText: "Tentar Novamente",
                    firstButtonAction: () => setModalContent(null)
                })

                setIsLoading(false)
                return
            }

            const phoneAlreadyExist = await verifyIfDataAlreadyExist("phone", createNewPerson.phone, setSomethingWrong)

            if (phoneAlreadyExist) {
                setModalContent({
                    image: <MessageErrorAuthImage />,
                    mainMessage: "Telefone já cadastrado",
                    message: "Por favor, escolha outro número de telefone",
                    firstButtonText: "Tentar Novamente",
                    firstButtonAction: () => setModalContent(null)
                })

                setIsLoading(false)
                return
            }

            setCreateNewPearson({
                ...createNewPerson,
                profilePicture: picture,
                gender: gender
            })

            setIsLoading(false)

            navigation.navigate("CreateNewPassword")
        }

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("handleConfirmFillProfile", message)
    }
}