
export const handleNavigation = (
    previousScreen,
    lastScreen,
    navigation,
) => {

    if (
        previousScreen === 'Welcome' && lastScreen === "Home" ||
        previousScreen === 'Profile' && lastScreen === "Login" ||
        previousScreen === 'Welcome' ||
        previousScreen === 'Login' && lastScreen === "Home"
        
    ) {
        return true

    }
    else if (previousScreen === 'AddSchedule' && lastScreen === "OurServices") {
        navigation.goBack()
        return true

    }
    else {
        navigation.goBack();
        return true;

    }
}