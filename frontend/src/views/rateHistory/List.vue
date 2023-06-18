<template>
    <div>
        <b-card>
            <h4 class="mb-2">تاریخچه امتیازات</h4>
            <b-table
                :bordered="bordered"
                :outlined="outlined"
                :striped="striped"
                :items="items"
                :fields="fields"
                :perPage="perPage"
                :pageOptions="pageOptions"
            />
        </b-card>
    </div>
</template>

<script>
import BsTable from "@/global/table/BsTable.vue";
import { BTable, BCard } from "bootstrap-vue";
export default {
    components: {
        BsTable,
        BTable,
        BCard
    },
    data() {
        return {
            active: false,
            perPage: 5,
            pageOptions: [5, 10, 15, { value: 100, text: "نمایش بیشتر" }],
            striped: true,
            bordered: true,
            outlined: true,
            fields: [
                { key: "for", label: "بابت", sortable: true },
                { key: "date", label: "تاریخ", sortable: true },
                { key: "branch", label: "شعبه/فروشگاه", sortable: true },
                { key: "point", label: "امتیاز", sortable: true },
                { key: "amount", label: "اعتبار", sortable: true },
                { key: "desc", label: "توضیحات", sortable: true }
            ],
            items: [
                {
                    for: "خرید",
                    date: "16/04/1326",
                    branch: "تعریف نشده",
                    point: "45",
                    amount: "1050000",
                    desc: "این یک متن تستی است"
                },
                {
                    for: "عضویت در باشگاه",
                    date: "16/04/1326",
                    branch: "تعریف نشده",
                    point: "20",
                    amount: "1150000",
                    desc: "این یک متن تستی است"
                },
                {
                    for: "خرید",
                    date: "16/04/1326",
                    branch: "تعریف نشده",
                    point: "45",
                    amount: "1050000",
                    desc: "این یک متن تستی است"
                },
                {
                    for: "عضویت در باشگاه",
                    date: "16/04/1326",
                    branch: "تعریف نشده",
                    point: "20",
                    amount: "1150000",
                    desc: "این یک متن تستی است"
                },
                {
                    for: "خرید",
                    date: "16/04/1326",
                    branch: "تعریف نشده",
                    point: "45",
                    amount: "1050000",
                    desc: "این یک متن تستی است"
                },
                {
                    for: "عضویت در باشگاه",
                    date: "16/04/1326",
                    branch: "تعریف نشده",
                    point: "20",
                    amount: "1150000",
                    desc: "این یک متن تستی است"
                },
                {
                    for: "خرید",
                    date: "16/04/1326",
                    branch: "تعریف نشده",
                    point: "45",
                    amount: "1050000",
                    desc: "این یک متن تستی است"
                },
                {
                    for: "عضویت در باشگاه",
                    date: "16/04/1326",
                    branch: "تعریف نشده",
                    point: "20",
                    amount: "1150000",
                    desc: "این یک متن تستی است"
                }
            ]
        };
    }
};
</script>
