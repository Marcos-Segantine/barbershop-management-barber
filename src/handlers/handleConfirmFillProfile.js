import { isValidPhoneNumber } from "../validation/isValidPhoneNumber"
import { isValidEmail } from "../validation/isValidEmail"
import { verifyFieldsToCreateAccount } from "../validation/verifyFieldsToCreateAccount"
import { verifyIfFieldsAreSameToUpdateUserInfo } from "../validation/verifyIfFieldsAreSameToUpdateUserInfo"
import { verifyIfDataAlreadyExist } from "../validation/verifyIfDataAlreadyExist"

import { updateProfessionalData } from "../services/user/updateProfessionalData"

import { MessageErrorAuthImage } from "../assets/imgs/MessageErrorAuthImage"

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

) => {
    setIsLoading(true)

    const gender = userGender.male ? "Masculino" : userGender.fame ? "Feminino" : userGender.otherGender ? "Outro" : null;

    if (isToUpdateProfessionalData) {

        const fieldsAreSame = verifyIfFieldsAreSameToUpdateUserInfo(createNewPerson, userData)

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
            const isPhoneValid = isValidPhoneNumber(createNewPerson.phone)

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

            const phoneAlreadyExist = await verifyIfDataAlreadyExist("phone", createNewPerson.phone)

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
            const isEmailValid = isValidEmail(createNewPerson.email)

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

            const emailAlreadyExist = await verifyIfDataAlreadyExist("email", createNewPerson.email)

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

        updateProfessionalData(
            userData.uid,
            { ...createNewPerson, gender: gender, profilePicture: picture },
            userData,
            setUserData,
            setIsLoading,
            navigation
        )
    }
    else {
        const isFieldsAvailable = verifyFieldsToCreateAccount(
            { ...createNewPerson, gender: gender },
            ["name", "email", "phone", "gender"],
            setModalContent
        )

        if (isFieldsAvailable === false) {
            setIsLoading(false)
            return

        } else setModalContent(null)

        const emailAlreadyExist = await verifyIfDataAlreadyExist("email", createNewPerson.email)

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

        const phoneAlreadyExist = await verifyIfDataAlreadyExist("phone", createNewPerson.phone)

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
}