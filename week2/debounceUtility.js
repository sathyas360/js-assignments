function debounce(func, wait, immediate = false) {
    let timer;

    return function(...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            func(...args);
        }, wait);
    }
}

// usage
const onLog = debounce((x) => console.log(x), 300);

onLog("he");
onLog("helllll");
onLog("hello");
onLog("hello finally");