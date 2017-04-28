const regexp = /\.?0+$/

export default function (number: number) {
    return number.toFixed(10).toString().replace(regexp, '');
}