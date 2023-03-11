export const verifyScreenName = (stateNavigation) => {
    if (stateNavigation?.routes[stateNavigation.index].name === undefined) {
        return false;
      }else if(stateNavigation?.routes[stateNavigation.index].name === 'InitialScreen') {
        return false
      }else if(stateNavigation?.routes[stateNavigation.index].name === 'FinalScreen') {
        return false
      }
      else {
        return true
      }
}