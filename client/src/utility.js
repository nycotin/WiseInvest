export function getSessionId(){
    try {
        const sessionId = document.cookie.split('; ').find(c => c.startsWith('sessionid=')).split("=")[1]
        return sessionId;
    } catch(error) {
        return ''
    }
}

export function getCsrfToken(){
    try {
        const csrftoken = document.cookie.split('; ').find(c => c.startsWith('csrftoken=')).split("=")[1];
        console.log(csrftoken)
        return csrftoken;
    } catch(error) {
        return ''
    }
}