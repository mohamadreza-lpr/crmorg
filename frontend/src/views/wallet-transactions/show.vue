<template>
    <section>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <b-card-header class="border-bottom">
                        <h4 class="font-weight-bold mb-0">
                            تراکنش شماره {{ transaction[0].id }}
                        </h4>
                    </b-card-header>
                    <div class="table-responsive mb-0" id="transaction">
                        <span
                            class="h6 p-1 font-weight-bolder bg-primary bg-darken-2 text-white mb-0 d-block"
                            >اطلاعات تراکنش</span
                        >
                        <b-table
                            class="mb-0"
                            responsive
                            :striped="striped"
                            :bordered="bordered"
                            :outlined="outlined"
                            :fields="transactionFields"
                            :items="transaction"
                        >
                            <template #cell(amount)="data">
                                {{ addCurrencyMask(data.value) }}
                            </template>
                            <template #cell(type)="data">
                                {{
                                    data.value == "deposit"
                                        ? "سپرده"
                                        : "بستانکار"
                                }}
                            </template>
                        </b-table>
                    </div>
                    <div class="table-responsive mb-0" id="bill">
                        <span
                            class="h6 p-1 font-weight-bolder bg-info bg-darken-2 text-white mb-0 d-block"
                            >اطلاعات فاکتور</span
                        >
                        <b-table
                            class="mb-0"
                            responsive
                            :striped="striped"
                            :bordered="bordered"
                            :outlined="outlined"
                            :fields="billFields"
                            :items="bill"
                        >
                            <template #cell(discount_amount)="data">
                                {{ addCurrencyMask(data.value) }}
                            </template>
                            <template #cell(type)="data">
                                {{ data.value == "sale" ? "فروش" : "بازگشتی" }}
                            </template>
                            <template #cell(taxes_amount)="data">
                                {{ addCurrencyMask(data.value) }}
                            </template>
                            <template #cell(total)="data">
                                {{ addCurrencyMask(data.value) }}
                            </template>
                        </b-table>
                    </div>
                    <div class="table-responsive mb-0">
                        <span
                            class="h6 p-1 font-weight-bolder bg-success bg-darken-2 text-white mb-0 d-block"
                            >اطلاعات کاربر</span
                        >
                        <b-table
                            class=""
                            responsive
                            :striped="striped"
                            :bordered="bordered"
                            :outlined="outlined"
                            :fields="userFields"
                            :items="user"
                        >
                        </b-table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import {
    BCard,
    BCardHeader,
    BCardFooter,
    BCardBody,
    BTable,
    BButton
} from "bootstrap-vue";
export default {
    components: {
        BCard,
        BCardHeader,
        BCardFooter,
        BCardBody,
        BTable,
        BButton
    },
    data() {
        return {
            // table
            striped: true,
            bordered: true,
            outlined: true,
            transactionFields: [
                { key: "description", label: "توضیحات" },
                { key: "created_at", label: "تاریخ" },
                { key: "amount", label: "مقدار" },
                { key: "type", label: "نوع" }
            ],
            billFields: [
                { key: "number", label: "شماره" },
                { key: "type", label: "نوع" },
                { key: "discount_amount", label: "تخفیف" },
                { key: "taxes_amount", label: "مالیات" },
                { key: "total", label: "مبلغ کل" }
            ],
            userFields: [
                { key: "first_name", label: "نام" },
                { key: "last_name", label: "نام خانوادگی" },
                { key: "email", label: "آدرس ایمیل" }
            ],
            transaction: [{}],
            bill: [{}],
            user: [{}]
        };
    },
    mounted() {
        // get the transaction from api
        this.getTransaction();
    },
    methods: {
        // divide the number with coma
        addCurrencyMask(value) {
            return (
                value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                " تومان"
            );
        },
        getTransaction() {
            const transactionId = this.$route.params.id;
            axios
                .get(
                    `${process.env.VUE_APP_URL}/wallets/transactions/${transactionId}/show?with=user,bill`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`
                        }
                    }
                )
                .then(({ data }) => {
                    this.transaction = [data.data];
                    this.bill = [data.data.bill];
                    this.user = [data.data.user];
                });
        }
    }
};
</script>

<style lang="scss">
#transaction {
    & table.table td:first-child {
        width: 500px !important;
    }
}
#bill {
    & table.table td:last-child {
        width: 300px !important;
    }
}
</style>
