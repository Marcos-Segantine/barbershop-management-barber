export const getNameLastName = (name, ellipsis = true) => {

    if (!name) return null

    if (ellipsis) {
        name = name.split("")
        return name.length > 12 ? name.splice(0, 12).join("") + "..." : name.join("")
    }

    name = name.split(" ")
    return name[0] + " " + name[1]
}