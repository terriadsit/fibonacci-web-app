export default function arraySum(array) {
    const initialValue = 0;
    const sumWithInitial = array.reduce(
            (previousValue, currentValue) => previousValue + currentValue, initialValue)
    return sumWithInitial
}