export const formatPrice = (text) => {
    text = String(text)

    const number = parseFloat(text.replace(".", ","));
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

