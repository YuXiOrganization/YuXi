import {
    filterObj
} from '@/utils/collectionMethods/objectMethods.js'

import {
    getAction,
    postFormAction
} from '@/api/currencyApi'

const CommonMixin = {
    data() {
        return {
            /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
            queryParam: {},
            /* 数据源 */
            dataSource: [],
            /* 分页参数 */
            ipagination: {
                current: 1,
                pageSize: 10,
                pageSizeOptions: ['10', '20', '30'],
                showTotal: (total, range) => {
                    return range[0] + "-" + range[1] + " 共" + total + "条"
                },
                showQuickJumper: true,
                showSizeChanger: true,
                total: 0
            },
            /* table加载状态 */
            loading: false,
            /* table选中keys*/
            selectedRowKeys: [],
            /* table选中records*/
            selectionRows: [],

        }
    },
    created() {

        this.loadData();

    },
    computed: {},
    methods: {
        handleSelectionChange(val) {
            console.log("选中数据", val);

        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.ipagination.pageSize = val
        },
        handleCurrentChange(val) {
            this.ipagination.current = val
                // console.log(`当前页: ${val}`);
        },
        async loadData(arg) {
            if (!this.url.list) {
                this.$message.error("请设置url.list属性!")
                return
            }
            try {
                //加载数据 若传入参数1则加载第一页的内容
                if (arg === 1) {
                    this.ipagination.current = 1;
                }
                var params = this.getQueryParams(); //查询条件
                this.loading = true;
                const res = await getAction(this.url.list, params)
                if (res.success) {
                    //update-begin---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
                    this.dataSource = res.list
                    this.ipagination.total = res.total ? res.total : 0
                        //update-end---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
                } else {
                    this.$message.warning(res.msg)
                }
                this.loading = false
            } catch (error) {
                this.loading = false
            }

        },
        getQueryParams() {
            //获取查询条件

            // let param = Object.assign(this.queryParam);
            let param = this.queryParam
            param.page = this.ipagination.current;
            param.limit = this.ipagination.pageSize;
            return filterObj(param);
        },

        handleAdd() {
            this.$refs.modalForm.add();
            this.$refs.modalForm.title = "新增";
            this.$refs.modalForm.disableSubmit = false;
        },
        handleEdit(record) {
            // console.log("handleEdit", record)
            this.$refs.modalForm.edit(record);
            this.$refs.modalForm.title = "编辑";
            this.$refs.modalForm.disableSubmit = false;
        },
        isDeleteFun() {
            return new Promise((resolve) => {
                this.$confirm('确认删除吗？', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    resolve(true)
                }).catch(() => {
                    resolve(false)
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            })

        },
        async handleDelete(id) {
            if (!this.url.delete) {
                this.$message.error("请设置url.delete属性!")
                return
            }
            try {

                const isDel = await this.isDeleteFun()
                if (!isDel) {
                    return
                }
                //加载数据 若传入参数1则加载第一页的内容
                const res = await postFormAction(this.url.delete, {
                    id: id
                })
                if (res.success) {
                    //update-begin---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
                    this.$message.success(res.msg);
                    this.loadData();
                } else {
                    this.$message.warning(res.msg)
                }
            } catch (error) {
                console.log("err", error)
            }
        },

        modalFormOk() {
            // 新增/修改 成功时，重载列表
            this.loadData();
            //清空列表选中
            this.onClearSelected()
        },
        onClearSelected() {
            this.selectedRowKeys = [];
            this.selectionRows = [];
        },

    },

}

export {
    CommonMixin
}