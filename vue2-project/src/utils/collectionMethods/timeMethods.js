const gettime = (t) => {
    const _time = new Date(t);
    const year = _time.getFullYear();
    let month = _time.getMonth() + 1;
    if (month < 10) {
        month = "0" + month
    }
    let date = _time.getDate();
    if (date < 10) {
        date = "0" + date
    }
    let hour = _time.getHours();
    if (hour < 10) {
        hour = "0" + hour
    }
    let minute = _time.getMinutes();
    if (minute < 10) {
        minute = "0" + minute
    }
    let Seconds = _time.getSeconds();
    if (Seconds < 10) {
        Seconds = "0" + Seconds
    }
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + Seconds
}


export {
    gettime
}