import {
    httpAction
} from '@/api/currencyApi'

const formMixins = {
    data() {
        return {
            formModel: {},
            refKeys: ["form"],
            confirmLoading: false,
            labelPosition: "right",
            labelWidth: "80px",
        }
    },
    props: {
        //表单禁用
        disabled: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    computed: {
        formDisabled() {
            return this.disabled;
        },
    },
    methods: {
        add() {
            this.$refs.form.resetFields();
        },
        edit(record) {
            this.$refs.form.resetFields();
            // console.log(",record", record)
            this.formModel = Object.assign({}, record);
        },
        /** 关闭弹窗，并将所有JEditableTable实例回归到初始状态 */
        close() {
            this.visible = false;
            this.$emit("close");
        },

        /** 关闭按钮点击事件 */
        handleCancel() {
            this.close();
        },
        /** 确定按钮点击事件 */
        handleOk() {
            //   let formName = "form";
            //   this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //       this.request(formData);
            //     } else {
            //       console.log("error submit!!");
            //       return false;
            //     }
            //   });
            this.getAllValidateForm();
        },
        async getAllValidateForm() {
            try {

                let getRefKeys = this.refKeys.map((item) => {
                    return this.validateForm(item);
                });
                await Promise.all(getRefKeys);
                // console.log("res", res);

                this.request()
            } catch (error) {
                console.log("err", error);
            }
        },
        validateForm(formName) {
            return new Promise((resolve, reject) => {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //   this.request(formData);
                        resolve(true);
                    } else {
                        // reject({ error: "报错" });
                        // console.log("error submit!!");
                        return false;
                    }
                });
            });
        },
        /** 发起请求，自动判断是执行新增还是修改操作 */
        async request() {
            try {
                let url = this.url.add,
                    method = "post";
                if (this.formModel.id) {
                    url = this.url.edit;
                    method = "post";
                }
                this.confirmLoading = true;
                const {
                    success,
                    msg
                } = await httpAction(url, this.formModel, method)

                if (success) {
                    this.$message.success(msg);
                    this.$emit("ok");
                    this.close();
                } else {
                    this.$message.warning(msg);
                }
                this.confirmLoading = false;

            } catch (error) {
                this.$message.warning(error);
                this.confirmLoading = false;
            }

        },

    }
}

export {
    formMixins
}