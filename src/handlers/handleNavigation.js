import { handleError } from "./handleError";

export const handleNavigation = (
    previousScreen,
    lastScreen,
    navigation,
    setSomethingWrong
) => {
    try {

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
        else if(previousScreen === "CreateNewPassword" && lastScreen === "AddSchedule") {
            navigation.navigate("Home")
            return true;

        }
        else {
            navigation.goBack();
            return true;

        }
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("handleNavigation", message)
    }
}