import { handleError } from "../../handlers/handleError"

export const verifyScreenName = (stateNavigation, setSomethingWrong) => {
  try {
    return stateNavigation?.routes[stateNavigation.index].name

  } catch ({ message }) {
    setSomethingWrong(true)
    handleError("verifyScreenName", message)
  }
}