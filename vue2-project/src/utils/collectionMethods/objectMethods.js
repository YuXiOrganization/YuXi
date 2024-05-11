/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
const filterObj = (obj) => {
    if (!(typeof obj == 'object')) {
        return;
    }

    for (let key in obj) {
        if (obj.hasOwnProperty(key) &&
            (obj[key] == null || obj[key] == undefined || obj[key] === '')) {
            delete obj[key];
        }
    }
    return obj;
}


export {
    filterObj
}