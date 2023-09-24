import firestore from '@react-native-firebase/firestore';

import { isValidEmail } from '../../validation/isValidEmail';
import { MessageErrorAuthImage } from '../../assets/imgs/MessageErrorAuthImage';

export const findErrorAuth = async (
    email,
    password,
    setSomethingWrong,
    setIsLoading,
    setError,
    navigation,
    createNewPearson,
    setCreateNewPearson
) => {
    try {

        setIsLoading(true)

        if (!email.trim() || !password.trim()) {
            setError({
                image: <MessageErrorAuthImage />,
                mainMessage: "Campos vazios",
                message: "Por favor preencha todos os campos. Caso nao possua uma conta, clique em 'Cadastrar'.",
                firstButtonText: "Tentar Novamente",
                secondButtonText: "Cadastrar",
                firstButtonAction: () => setError(null),
                secondButtonAction: () => {
                    setCreateNewPearson({ ...createNewPearson, person: "newPerson" })
                    navigation.navigate("FillProfile", { isToUpdateProfessionalData: false })
                    setError(false)
                }
            })

            setIsLoading(false)
            return
        }

        else if (!isValidEmail(email)) {
            setError({
                image: <MessageErrorAuthImage />,
                mainMessage: "Email inválido",
                message: "O email que você inseriu não é válido, por favor tente novamente. Caso não possua uma conta clique em 'Cadastrar'",
                firstButtonText: "Tentar Novamente",
                secondButtonText: "Cadastrar",
                firstButtonAction: () => setError(null),
                secondButtonAction: () => {
                    setCreateNewPearson({ ...createNewPearson, person: "newPerson" })
                    navigation.navigate("FillProfile", { isToUpdateProfessionalData: false })
                    setError(false)
                }
            })

            setIsLoading(false)
            return
        }

        else if (password.length < 6) {
            setError({
                image: <MessageErrorAuthImage />,
                mainMessage: "Senha inválida",
                message: "Senha deve ter no mínimo 6 caracteres, por favor tente novamente. Caso não lembre sua de sua senha clique em 'Esqueci minha senha'.",
                firstButtonText: "Tentar Novamente",
                secondButtonText: "Esqueci minha senha",
                firstButtonAction: () => setError(null),
                secondButtonAction: () => {
                    navigation.navigate("ForgotPassword")
                    setError(false)
                }
            })

            setIsLoading(false)
            return
        }

        const barbersRef = firestore().collection('barbers').where('email', '==', email)
        const barberDataCollection = (await barbersRef.get()).docs

        let barberData = null

        if (barberDataCollection.length === 0) {
            setError({
                image: <MessageErrorAuthImage />,
                mainMessage: "Email nao cadastrado",
                message: "Nao encontramos seu email, por favor tente novamente. Caso nao possua uma conta, clique em 'Cadastrar'.",
                firstButtonText: "Tentar Novamente",
                secondButtonText: "Cadastrar",
                firstButtonAction: () => setError(null),
                secondButtonAction: () => {
                    setCreateNewPearson({ ...createNewPearson, person: "newPerson" })
                    navigation.navigate("FillProfile", { isToUpdateProfessionalData: false })
                    setError(false)
                }
            })

            setIsLoading(false)
            return
        }

        barberData = barberDataCollection[0].data()

        if (email !== barberData.email || password !== barberData.password) {
            setError({
                image: <MessageErrorAuthImage />,
                mainMessage: "Dados inválidos",
                message: "Email e/ou senha estão incorretos, por favor tente novamente. Caso não lembre sua de sua senha clique em 'Esqueci minha senha'.",
                firstButtonText: "Tentar Novamente",
                secondButtonText: "Esqueci minha senha",
                firstButtonAction: () => setError(null),
                secondButtonAction: () => {
                    navigation.navigate("ForgotPassword")
                    setError(false)
                }
            })

            setIsLoading(false)
            return
        }

        return barberData

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}