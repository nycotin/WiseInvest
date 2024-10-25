// User login
export function getSessionId(){
    try {
        const sessionId = document.cookie.split('; ').find(c => c.startsWith('sessionid=')).split('=')[1];
        return sessionId;
    } catch(error) {
        return '';
    }
}

export function getCsrfToken(){
    try {
        const csrftoken = document.cookie.split('; ').find(c => c.startsWith('csrftoken=')).split('=')[1];
        console.log(csrftoken)
        return csrftoken;
    } catch(error) {
        return '';
    }
}


// Invest
export function calculateGrowth(inv, val){
    const data = {
        "movement": 0,
        "percent": 0,
        "dir": ""
    }

    if (val > inv) {
        data["movement"] = `+${(val - inv).toFixed(2)}`;
        data["dir"] = "up";
        data["percent"] = `+${((val - inv) / inv).toFixed(2)}%`;
    } else if (inv > val) {
        data["movement"] = (val - inv).toFixed(2);
        data["dir"] = "down";
        data["percent"] = `${((val - inv) / inv).toFixed(2)}%`;
    } else {
        data["movement"] = 0;
        data["dir"] = "stable";
        data["percent"] = "0%";
    }

    return data;
}

export function groupStocks(str, arr) {
    const list = arr.filter(i => calculateGrowth(i.total_investment, i.total_value).dir === str)

    return list;
}

export function formatDate(date){
    const formattedDay = date.split("T")[0];
    const formattedTime = date.split("T")[1].split(".")[0];
    return `${formattedDay} ${formattedTime}`
}