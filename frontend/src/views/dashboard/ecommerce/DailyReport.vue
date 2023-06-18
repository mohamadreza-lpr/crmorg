<template>
  <b-card v-if="transactionData" class="card-transaction" no-body>
    <b-card-header>
      <b-card-title class="font-weight-bold">گزارش روزانه</b-card-title>
    </b-card-header>

    <b-card-body>
      <div
        v-for="transaction in transactionData"
        :key="transaction.mode"
        class="transaction-item"
      >
        <b-media no-body>
          <b-media-aside>
            <b-avatar rounded size="42" :variant="transaction.avatarVariant">
              <feather-icon size="18" :icon="transaction.avatar" />
            </b-avatar>
          </b-media-aside>
          <b-media-body>
            <h6 class="transaction-title">
              {{ transaction.mode }}
            </h6>
            <small>{{ transaction.types }}</small>
          </b-media-body>
        </b-media>
        <div
          class="font-weight-bolder"
          :class="transaction.deduction ? 'text-danger' : 'text-success'"
        >
          {{ transaction.payment }}
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardBody,
  BMediaBody,
  BMedia,
  BMediaAside,
  BAvatar,
  BDropdown,
  BDropdownItem,
} from "bootstrap-vue";

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BMediaBody,
    BMedia,
    BMediaAside,
    BAvatar,
    BDropdown,
    BDropdownItem,
  },
  data() {
    return {
      transactionData: [
        {
          mode: "2300",
          types: "تعداد فروش",
          avatar: "TrendingUpIcon",
          avatarVariant: "light-primary",
          payment: "-%74",
          deduction: true,
        },
        {
          mode: "$745",
          types: "میزان فروش",
          avatar: "DollarSignIcon",
          avatarVariant: "light-success",
          payment: "+%480",
          deduction: false,
        },
        {
          mode: "549",
          types: "میزان اعتبار در دسترس",
          avatar: "BoxIcon",
          avatarVariant: "light-danger",
          payment: "+%480",
          deduction: false,
        },
        {
          mode: "98",
          types: "تعداد مشتریان",
          avatar: "UserIcon",
          avatarVariant: "light-info",
          payment: "-%23",
          deduction: true,
        },
      ],
    };
  },
};
</script>
