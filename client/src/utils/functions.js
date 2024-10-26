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