<template>
  <a-table :columns="columns" :data-source="data">
    <a-tag
      :color="status == 0 ? '' : status == 1 ? 'red' : 'green'"
      slot="status"
      slot-scope="status"
    >
      {{ status | fmtStatusTypeText }}
    </a-tag>
    <span slot="time" slot-scope="time">
      {{ time | fmtDate }}
    </span>
    <span slot="action" slot-scope="text, record">
      <!-- text 第一个参数：记录的当前字段 -->
      <!-- record 第二个参数：整条记录 -->
      <a-icon type="delete" @click="del(record.id)" icon="delete"></a-icon>删除
    </span>
  </a-table>
</template>
<script>
// 数组里面多少条，表格就有多少列
const columns = [
  {
    // 简单的表头-标题
    title: "分类名称",
    // 复杂的表头标题
    // slots: { title: 'customTitle' },
    // 同时配置 简单表头标题和复杂表头标题时，只显示简单的表头标题
    dataIndex: "NAME", // 对应data数据中 对象的属性名
    key: "NAME", // 索引
    align: "center", // 表格内容居中
  },
  {
    title: "状态",
    dataIndex: "STATUS",
    key: "STATUS",
    scopedSlots: { customRender: "status" }, //
    align: "center",
  },
  {
    title: "创建时间",
    dataIndex: "CREATED_TIME",
    key: "CREATED_TIME",
    scopedSlots: { customRender: "time" },
    align: "center",
  },
  {
    // 标题需要多个元素时
    // slots: { title: 'customTitle' },
    title: "操作",
    key: "action",
    dataIndex: "action",
    // 里面需要放多个元素
    scopedSlots: { customRender: "action" },
    align: "center",
  },
];

export default {
  name: "GoodTypeList",
  filters: {
    fmtStatusTypeText(val) {
      return ["已删除", "未发布", "已发布"][val];
    },
  },
  async created() {
    let data = await this.$post("/goods-category/select", {
      pageIndex: 1,
      pageSize: 10,
    });
    this.data = data;
  },
  data() {
    return {
      data: [],
      columns,
    };
  },
  methods: {
    del(id) {
      let index = this.data.findIndex((r) => r.id === id);
      this.data.splice(index, 1);
    },
  },
};
</script>
