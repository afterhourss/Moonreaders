export const getCapitalize = (str) => {
    const newStr = str[0].toUpperCase() + str.slice(1);
    return newStr
}

export const toRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(num)
}