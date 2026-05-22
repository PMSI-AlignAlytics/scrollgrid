export function defaultComparer(a, b) {
    let order;
    if (Number.isNaN(Number(a)) || Number.isNaN(Number(b))) {
        order = (new Date(a)) - (new Date(b));
    } else {
        order = parseFloat(a) - parseFloat(b);
    }
    if (Number.isNaN(order)) {
        order = a < b ? -1 : a > b ? 1 : 0;
    }
    return order;
}
