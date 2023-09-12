export const getNameLastName = (name) => {
    name = name.split(" ")

    const firstName = name[0]
    const lastName = name[1].length < 5 ? name[1] + " " + name[2] : name[1]

    return firstName + " " + lastName
}