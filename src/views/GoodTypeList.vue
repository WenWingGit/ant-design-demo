<template>
  <div>
    <div class="flex j-s a-c header-top">
      <a-button type="primary" @click="handleAddTable">添加商品分类</a-button>
      <a-button
        type="primary"
        :disabled="!isSelectMultTable"
        @click="handleDelteTable"
        >批量删除</a-button
      >
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      :row-selection="rowSelection"
      :rowKey="(record) => record.id"
      :loading="isLoading"
    >
      <span slot="create_time" slot-scope="time">
        {{ time | fmtDate }}
      </span>
      <span slot="action" slot-scope="text, record">
        <!-- 第一个参数：text 记录的当前字段 -->
        <!-- 第二个参数：record 整条记录 -->
        <a @click="handleEditTable(record.id)">
          <a-icon type="edit"></a-icon>编辑
        </a>
        <a-divider type="vertical" />
        <a @click="handleDelteTable(record.id)">
          <a-icon type="delete"></a-icon>删除
        </a>
      </span>
    </a-table>

    <!-- 添加/编辑 -->
    <a-modal v-model="visible_modal" :title="modal_title" @ok="handleModalOk">
      <a-form-model layout="inline" :model="form">
        <a-form-model-item label="分类名称(中文)">
          <a-input v-model="form.cn_name" />
        </a-form-model-item>
        <a-form-model-item label="分类名称(英文)">
          <a-input v-model="form.en_name" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
// 数组里面多少条，表格就有多少列
// const columns = [
//   {
//     // 简单的表头-标题
//     title: "分类名称",
//     // 复杂的表头标题
//     // slots: { title: 'customTitle' },
//     // 同时配置 简单表头标题和复杂表头标题时，只显示简单的表头标题
//     dataIndex: "NAME", // 对应data数据中 对象的属性名
//     key: "NAME", // 索引
//     align: "center", // 表格内容居中
//   },
//   {
//     title: "状态",
//     dataIndex: "STATUS",
//     key: "STATUS",
//     scopedSlots: { customRender: "status" }, //
//     align: "center",
//   },
//   {
//     title: "创建时间",
//     dataIndex: "CREATED_TIME",
//     key: "CREATED_TIME",
//     scopedSlots: { customRender: "time" },
//     align: "center",
//   },
//   {
//     // 标题需要多个元素时
//     // slots: { title: 'customTitle' },
//     title: "操作",
//     key: "action",
//     dataIndex: "action",
//     // 里面需要放多个元素
//     scopedSlots: { customRender: "action" },
//     align: "center",
//   },
// ];

const columns = [
  {
    title: "编号",
    dataIndex: "id", // 对应data数据中 对象的属性名
    key: "id",
    align: "center",
  },
  {
    title: "商品名称（中文）",
    dataIndex: "cn_name", // 对应data数据中 对象的属性名
    key: "cn_name",
    align: "center",
  },
  {
    title: "商品名称（英文）",
    dataIndex: "en_name", // 对应data数据中 对象的属性名
    key: "en_name",
    align: "center",
  },
  {
    title: "创建时间",
    dataIndex: "create_time", // 对应data数据中 对象的属性名
    key: "create_time",
    align: "center",
    scopedSlots: { customRender: "create_time" },
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    scopedSlots: { customRender: "action" },
    key: "action",
  },
];

export default {
  name: "GoodTypeList",
  filters: {
    fmtStatusTypeText(val) {
      return ["已删除", "未发布", "已发布"][val];
    },
  },
  created() {
    this.getList();
  },
  data() {
    return {
      // 数据
      data: [],
      // 列
      columns,
      // 表格是否加载状态
      isLoading: false,
      // 已选中数据的数组
      selectedRowKeys: [],
      // 分页数据
      pagination: {
        pageSize: 10,
        total: 0,
        current: 1,
      },
      // 是否显示弹窗
      visible_modal: false,
      // 弹窗是添加还是编辑
      edit_id: -1, // [-1: 添加, >0：编辑]
      // 弹窗的标题
      modal_title: "",
      // 弹窗里面表单数据
      form: {
        cn_name: "",
        en_name: "",
      },
    };
  },
  methods: {
    async getList() {
      this.isLoading = true;
      let {
        data: { list, current, total },
      } = await this.$get("/api/goods/list", this.pagination);

      this.pagination.current = current;
      this.pagination.total = total;
      this.data = list;
      this.isLoading = false;
    },
    async handleDelteTable(id) {
      await this.$mc();
      // 选多条删除 还是只删一条
      let ids = this.isSelectMultTable ? this.selectedRowKeys : [id];
      let { message, code } = await this.$post("/api/goods/delete", { ids });
      if (code === -1) {
        this.$me(message);
        return;
      }
      this.$ms();
      this.getList();
    },
    async handleEditTable(id) {
      const { cn_name, en_name } = this.data.find((r) => r.id === id);
      this.form.cn_name = cn_name;
      this.form.en_name = en_name;
      this.edit_id = id;
      this.modal_title = "编辑商品分类";
      this.visible_modal = true;
    },
    handleAddTable() {
      this.form.cn_name = "";
      this.form.en_name = "";
      this.edit_id = -1;
      this.modal_title = "添加商品分类";
      this.visible_modal = true;
    },
    async handleModalOk() {
      this.visible_modal = false;
      let is_Fill_all = true;
      Object.values(this.form).forEach((r) => {
        if (r.trim() === "") {
          is_Fill_all = false;
        }
      });

      // 判断是添加还是编辑
      let api = this.edit_id === -1 ? "/api/goods/new" : "/api/goods/edit";

      if (is_Fill_all) {
        let {
          code,
          data: { message },
        } = await this.$post(api, this.form);
        if (code === 0) {
          this.$ms(message);
          this.visible_modal = false;
          this.form.cn_name = "";
          this.form.en_name = "";
          this.getList();
        } else {
          this.$me(message);
        }
        return false;
      }
      this.$me("请填写完整信息", "");
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        onSelection: this.onSelection,
      };
    },
    // 是否有点 多选按钮
    isSelectMultTable() {
      return this.selectedRowKeys.length > 0;
    },
  },
};
</script>

<style scope>
.header-top {
  margin-bottom: 30px;
}
</style>