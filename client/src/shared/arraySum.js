// return the sume of the value of the numbers in the array received.
export default function arraySum(array) {
    const initialValue = 0;
    const sumWithInitial = array.reduce(
            (previousValue, currentValue) => previousValue + currentValue, initialValue)
    return sumWithInitial
}