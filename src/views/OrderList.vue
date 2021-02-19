<template>
  <a-table :columns="columns" :data-source="data">
    <a-tag :color="status == 0 ? '' : (status==1 ? 'red' : 'green')" slot="status" slot-scope="status">
      {{ status | fmtStatusTypeText }}
    </a-tag>
    <span slot="time" slot-scope="time">
      {{time | fmtDate}}
    </span>
    <span slot="action" slot-scope="text, record" >
      <!-- text 第一个参数：记录的当前字段 -->
      <!-- record 第二个参数：整条记录 -->
      <a-button type="primary" @click="del(record.id)" icon="delete">
        删除
      </a-button>
    </span>
  </a-table>
</template>
<script>
const columns = [
  {
    title: '商品类型',
    dataIndex: 'NAME',
    key: 'NAME',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'STATUS',
    key: 'STATUS',
    scopedSlots: { customRender: 'status' },
    align: 'center',
  },
  {
    title: 'PID',
    dataIndex: 'PID',
    key: 'PID',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'CREATED_TIME',
    key: 'CREATED_TIME',
    scopedSlots: { customRender: 'time' },
    align: 'center',
  },
  {
    // 标题需要多个元素时
    // slots: { title: 'customTitle' },
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    // 里面需要放多个元素
    scopedSlots: { customRender: 'action' },
    align: 'center',
  },
];

export default {
  name: "OrderList",
  filters: {
    fmtStatusTypeText(val) {
      return ["已删除", "未发布", "已发布"][val]
    }
  },
  async created () {
    let {data} = await this.$get('http://localhost:9999/data/data.json')
    this.data = data
  },
  data() {
    return {
      data: [],
      columns,
    };
  },
  methods: {
    del(id) {
      let index = this.data.findIndex(r => r.id === id)
      this.data.splice(index, 1)
    }
  },
};
</script>
