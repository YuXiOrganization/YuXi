 /**
  * v-hasPermi 操作权限处理
  * Copyright (c) 2019 ruoyi
  */

 import store from '@/store'

 export default {
     async inserted(el, binding, vnode) {
         const {
             value
         } = binding
         if (value && value instanceof Array && value.length > 0) {
             let getAuthByCode = null
             if (value[0] == store.getters.authCode) {
                 getAuthByCode = store.getters.permissions
             } else {
                 getAuthByCode = await store.dispatch('user/GetQueryAuthByCode', value[0])
             }
             let hasPermissions = getAuthByCode.some(permission => {
                 return value.includes(permission)
             })

             if (!hasPermissions) {
                 el.parentNode && el.parentNode.removeChild(el)
             }
             //  console.log("getAuthByCode", getAuthByCode)
         } else {
             throw new Error(`请设置操作权限标签值`)
         }

     }
 }