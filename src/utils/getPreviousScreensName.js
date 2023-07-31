export const getPreviousScreensName = (navigation) => {
    const screensState = navigation.getState()

    const screensNames = []

    screensState.routes.forEach(route => {
        screensNames.push(route.name)
    })

    const previousScreen = screensNames[screensNames.length - 2]
    const lastScreen = screensNames[screensNames.length - 1]

    return [previousScreen, lastScreen]
}