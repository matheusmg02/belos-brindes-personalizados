export const setItem = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key) => {
    return JSON.parse(sessionStorage.getItem(key)); 
}