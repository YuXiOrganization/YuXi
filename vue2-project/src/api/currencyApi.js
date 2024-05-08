import {
    axios
} from '@/utils/request'


//postForm
const postFormAction = (url, parameter, headers) => {
    // let sign = signMd5Utils.getSign(url, parameter);
    // //将签名和时间戳，添加在请求接口 Header

    return axios({
        url: url,
        method: 'post',
        data: parameter,
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
}

//post
const postAction = (url, parameter, headers) => {
    // let sign = signMd5Utils.getSign(url, parameter);
    // //将签名和时间戳，添加在请求接口 Header
    let signHeader
    if (headers) {
        signHeader = headers.reduce((accumulator, currentValue) => {
            accumulator[currentValue.key] = currentValue.value;
            return accumulator;
        }, {});
    }

    return axios({
        url: url,
        method: 'post',
        data: parameter,
        headers: signHeader
    })
}


//get
const getAction = (url, parameter) => {
    // let sign = signMd5Utils.getSign(url, parameter);
    // //将签名和时间戳，添加在请求接口 Header
    // let signHeader = {"X-Sign": sign,"X-TIMESTAMP": signMd5Utils.getDateTimeToString()};

    return axios({
        url: url,
        method: 'get',
        params: parameter,
        //   headers: signHeader
    })
}


//post method= {post | put}
const httpAction = (url, parameter, method) => {
    // let sign = signMd5Utils.getSign(url, parameter);
    // //将签名和时间戳，添加在请求接口 Header
    // let signHeader = {"X-Sign": sign,"X-TIMESTAMP": signMd5Utils.getDateTimeToString()};

    return axios({
        url: url,
        method: method,
        data: parameter,
        //   headers: signHeader
    })
}

//put
const putAction = (url, parameter) => {
    return axios({
        url: url,
        method: 'put',
        data: parameter
    })
}

//deleteAction
const deleteAction = (url, parameter) => {
    return axios({
        url: url,
        method: 'delete',
        params: parameter
    })
}


export {
    postAction,
    getAction,
    httpAction,
    putAction,
    deleteAction,
    postFormAction
}