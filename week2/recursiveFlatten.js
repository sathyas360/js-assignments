const nestedData = [2, [7, [3, [6, 9, 9], 9],8] ];

/**
 * @param {Array} arr
 * @param {number} depth
 */
function customFlat(arr, depth = 1) {
    if (depth < 1) {
        return arr;
    }
    return arr.reduce((acc, item) => {
        return acc.concat(Array.isArray(item) ? customFlat(item, depth - 1) : item)
    }, []);
}

console.log(customFlat(nestedData, 1)); 
console.log(customFlat(nestedData, 5)); 
console.log(customFlat(nestedData, Infinity)); 