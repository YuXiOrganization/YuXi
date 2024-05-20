//排序方法
const sortFun = (array, type) => {
    return array.sort((a, b) => {
        return a[type] - b[type];
    });
}


const handleTree = (array) => {
    let getAction = handleTreeChildren(array)
        // console.log('getAction', getAction)
        // array.
        // let option={
        //     children:"",
        //     iconcls:"",
        //     id:"",
        //     text:"",
        //     url:""
        // }
        // let option = {
        //     name: "admin",
        //     path: "/admin",
        //     hidden: false,
        //     meta: {
        //         title: "管理员列表",
        //         icon: "el-icon-s-tools",
        //         noCache: false,
        //         link: null,
        //     },
        //     children: []
        // }
    return getAction
}

const handleTreeChildren = (arrays) => {
    if (!isArrayNullOrEmpty(arrays)) {
        arrays = arrays.map((item) => {
                // TODO  该项目的特殊处理
                let geturl = item.url ? item.url.substring(0, item.url.lastIndexOf('.')) : ''

                // console.log("getitemitemurl", item)
                // console.log("geturl", loadView(geturl))
                let option = {
                    name: item.text,
                    path: '/' + geturl,
                    hidden: false,
                    component: geturl ? loadView(geturl) : () =>
                        import ('@/views/home/home.vue'),
                    meta: {
                        id: item.id,
                        title: item.text,
                        icon: "el-icon-s-tools",
                        noCache: false,
                        link: null,
                        authCode: item.authCode ? item.authCode : ""
                    },
                    children: handleTreeChildren(item.children || null)
                }

                if (!option.children) {
                    delete option['children']
                }


                return option
            })
            // console.log("arrays", arrays)
        return arrays
    }
    return null


}


const isArrayNullOrEmpty = (array) => {
    return array === null || array.length === 0;
}

const loadView = (view) => {
    if (process.env.NODE_ENV === 'development') {
        return (resolve) => require([`@/views/${view}`], resolve)
    } else {

        // 使用 import 实现生产环境的路由懒加载
        return () =>
            import (`@/views/${view}`)
    }
}

export {
    sortFun,
    handleTree
}