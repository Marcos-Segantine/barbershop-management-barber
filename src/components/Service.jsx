import { TouchableOpacity, Text, StyleSheet } from "react-native"

import { globalStyles } from "../assets/globalStyles"

import { formatPrice } from "../utils/formatPrice"

export const Service = ({
    service,
    servicesSelected,
    setServicesSelected,
    removeServiceSelected,
    setSomethingWrong
 }) => {

    const handleSelectServices = (service) => {
        let isServiceSelected = null;

        for (const currentService of servicesSelected) {
            if (currentService.name === service.name) isServiceSelected = true;
        }

        if (servicesSelected.length >= 4 && isServiceSelected === null) return;

        if (isServiceSelected) {
            removeServiceSelected(service.name);

            return;
        }

        setServicesSelected([...servicesSelected, service]);
    };

    const style = servicesSelected.includes(service) ? [styles.container, { borderColor: globalStyles.orangeColor, }] : styles.container

    return (
        <TouchableOpacity style={style} onPress={() => handleSelectServices(service)}>
            <Text style={styles.serviceName}>{service.name}</Text>

            <Text style={styles.price}>+ {formatPrice(service.price, setSomethingWrong)}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderWidth: 2,
        borderColor: "#00000010",
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 30,
        marginVertical: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    serviceName: {
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
        color: '#000000'
    },

    price: {
        color: globalStyles.orangeColor,
        fontFamily: globalStyles.fontFamilyBold,
        fontSize: globalStyles.fontSizeSmall,
    }
})