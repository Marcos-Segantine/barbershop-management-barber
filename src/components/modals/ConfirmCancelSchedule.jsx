import { Modal, View, Text, StyleSheet } from "react-native"

import { Title } from "../Title"
import { Button } from "../Button"

export const ConfirmCancelSchedule = ({ visible, action, dataSchedule }) => {

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
        >
            <View style={style.container}>
                <Title title={'Atençao, essa açao e ireverssivel'} />

                <Text>
                    Realmente deseja cancelar o horario do {dataSchedule.name} dia dia {dataSchedule.day} as {dataSchedule.shedule}?
                </Text>

                <Button text={"Confirmar"} action={action} />
            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1E1E1E'
    }
})  