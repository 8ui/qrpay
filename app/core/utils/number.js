export function numberWithSpaces(x) {
    return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
