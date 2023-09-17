
export const handleNavigation = (
    previousScreen,
    lastScreen,
    navigation,
) => {

    if (
        previousScreen === 'AddSchedule' && lastScreen === "OurServices"
    ) {
        navigation.goBack();
        return true
    }
    else {
        navigation.goBack();
        return true;
    }
}