export const formatDate = (dateString, setSomethingWrong) => {
    try {

        if (!dateString) return

        const [year, month, day] = dateString.split('-');

        const months = [
            'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
            'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
        ];

        const monthName = months[parseInt(month) - 1];
        const formattedDate = `${day} de ${monthName}, ${year}`;

        return formattedDate;

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}