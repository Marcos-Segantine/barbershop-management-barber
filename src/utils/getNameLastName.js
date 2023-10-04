export const getNameLastName = (name) => {

    if (!name) return null

    name = name.split("")

    return name.length > 12 ? name.splice(0, 12).join("") + "..." : name.join("")
}