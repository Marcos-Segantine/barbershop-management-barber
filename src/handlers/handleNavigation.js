import auth from '@react-native-firebase/auth';

export const handleNavigation = (
    previousScreen,
    lastScreen,
    navigation,
    userData,
    setSchedule
) => {

    if (
        previousScreen === 'AddSchedule' && lastScreen === "OurServices"
    ) {
        setSchedule({})
        navigation.goBack();

        return true
    }
    else {
        navigation.goBack();

        return true;
    }
}