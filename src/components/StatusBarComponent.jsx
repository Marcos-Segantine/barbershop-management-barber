import { StatusBar, View } from 'react-native';

export const StatusBarComponent = () => {
    return (
        <View style={{ height: StatusBar.currentHeight, backgroundColor: '#181a20' }}>
            <StatusBar barStyle="light-content" />
        </View>
    )
}