export const add_edit_rules = {
  cn_name: [
    { whitespace: true, message: "不能只填空格", trigger: "blur" },
    { required: true, message: "请输入中文商品类型", trigger: "blur" },
    { min: 2, max: 10, message: "字符在2~10之间", trigger: "blur" },
  ],
}