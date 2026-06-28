function isPrimitive(value) {
    return value === null || typeof value !== 'object';
}

function deepClone(value, map = new WeakMap()) {
    if (isPrimitive(value)) return value;

    if (map.has(value)) return map.get(value);

    const clone = Array.isArray(value) ? [] : {};
    map.set(value, clone);

    for (const [key, child] of Object.entries(value)) {
        clone[key] = deepClone(child, map);
    }
    return clone;
}

const original = {
    a: 1,
    b: { c: 2 },
    d: [11, 7],
};
original.self = original; // Circular reference!

const copy = deepClone(original);
// console.log(copy!== original); // true
// console.log(copy.b!== original.b); // true
// console.log(copy.self === copy); // true (circularity preserved)
console.log(copy);