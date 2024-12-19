export const validateColor = (baseAmount: number, currentAmount: number) => {
    let textColorAvailable
    if (baseAmount === currentAmount || currentAmount > (baseAmount / 2)) {
        textColorAvailable = '#35bf35'
    } else if (currentAmount === (baseAmount / 2) || currentAmount < (baseAmount / 2)) {
        textColorAvailable = '#e89e27'
    } else {
        textColorAvailable = '#e64e20'
    }

    return textColorAvailable


}