import { MessageErrorAuthImage } from "../../assets/imgs/MessageErrorAuthImage";
import { handleError } from "../../handlers/handleError";

export const verifyFieldsOfNewService = (
    serviceName,
    servicePrice,
    currentServices,
    setError,
    setSomethingWrong
) => {
    try {

        const pattern = /^\d+.*\d+$/;

        if (!pattern.test(servicePrice)) {

            setError({
                image: <MessageErrorAuthImage />,
                mainMessage: "Campo Inválido",
                message: "O campo 'preço' está incorreto, por favor siga o exemplo: 08:30, 13:45, 21:15...",
                firstButtonText: "Entendido",
                firstButtonAction: () => setError(null)
            })

            return false
        }

        for (const service of currentServices) {
            if (service.name === serviceName) {
                setError({
                    image: <MessageErrorAuthImage />,
                    mainMessage: "Serviço já registrado",
                    message: "O serviço que você inseriu já está registrado",
                    firstButtonText: "Entendido",
                    firstButtonAction: () => setError(null)
                })

                return false
            }
        }

        return true
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("verifyFieldsOfNewService", message)
    }
}