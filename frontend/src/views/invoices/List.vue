<template>
  <div>
    <BsTable
      :items="items"
      :fields="fields"
      :perPage="perPage"
      :pageOptions="pageOptions"
    />
  </div>
</template>

<script>
import BsTable from "@/global/table/BsTable.vue";
export default {
  components: {
    BsTable,
  },
  data() {
    return {
      active: false,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "نمایش بیشتر" }],

      fields: [
        { key: "title", label: "عنوان", sortable: true },
        { key: "number", label: "شماره", sortable: true },
        { key: "branch", label: "شعبه/فروشگاه", sortable: true },
        { key: "date", label: "تاریخ صدور", sortable: true },
        { key: "amount", label: "مبلغ کل", sortable: true },
        { key: "status", label: "وضعیت", sortable: true },
        { key: "download", label: "دانلود PDF", sortable: true },
      ],
      items: [
        {
          title:"عنوان تستی",
          number:"124856",
          branch:"تعریف نشده",
          date:"13/10/1374",
          amount:"12000000",
          status:1,
        },
        {
          title:"عنوان تستی",
          number:"124856",
          branch:"تعریف نشده",
          date:"13/10/1374",
          amount:"12000000",
          status:2,
        },
        {
          title:"عنوان تستی",
          number:"124856",
          branch:"تعریف نشده",
          date:"13/10/1374",
          amount:"12000000",
          status:2,
        },
        {
          title:"عنوان تستی",
          number:"124856",
          branch:"تعریف نشده",
          date:"13/10/1374",
          amount:"12000000",
          status:1,
        },
        {
          title:"عنوان تستی",
          number:"124856",
          branch:"تعریف نشده",
          date:"13/10/1374",
          amount:"12000000",
          status:1,
        },
        {
          title:"عنوان تستی",
          number:"124856",
          branch:"تعریف نشده",
          date:"13/10/1374",
          amount:"12000000",
          status:2,
        },
        {
          title:"عنوان تستی",
          number:"124856",
          branch:"تعریف نشده",
          date:"13/10/1374",
          amount:"12000000",
          status:1,
        },
        {
          title:"عنوان تستی",
          number:"124856",
          branch:"تعریف نشده",
          date:"13/10/1374",
          amount:"12000000",
          status:3,
        },
        {
          title:"عنوان تستی",
          number:"124856",
          branch:"تعریف نشده",
          date:"13/10/1374",
          amount:"12000000",
          status:1,
        },
        {
          title:"عنوان تستی",
          number:"124856",
          branch:"تعریف نشده",
          date:"13/10/1374",
          amount:"12000000",
          status:1,
        },
        {
          title:"عنوان تستی",
          number:"124856",
          branch:"تعریف نشده",
          date:"13/10/1374",
          amount:"12000000",
          status:1,
        },
        {
          title:"عنوان تستی",
          number:"124856",
          branch:"تعریف نشده",
          date:"13/10/1374",
          amount:"12000000",
          status:1,
        },
      ],
    };
  },
};
</script>
