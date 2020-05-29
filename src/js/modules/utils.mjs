export function exists([...variables]) {
    const exists = variables.every(variable => variable != null)
    return exists
}


export function setLocalStorage(name, item) {
    localStorage.setItem(name, JSON.stringify(item))
}


export function getLocalStorage(item) {
    return JSON.parse(localStorage.getItem(item))
}




export function storageAvailable(type) { //source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    let storage
    try {
        storage = window[type]
        let x = '__storage_test__'
        storage.setItem(x, x)
        storage.removeItem(x)
        return true
    } catch (e) {
        return e instanceof DOMException && (
                e.code === 22 ||
                e.code === 1014 ||
                e.name === 'QuotaExceededError' ||
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            (storage && storage.length !== 0)
    }
}