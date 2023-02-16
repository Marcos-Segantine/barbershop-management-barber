export const getProfessional = (shedulesUser) => {
    const professional = shedulesUser?.professional;
    
    return professional !== undefined ? professional : null
}
