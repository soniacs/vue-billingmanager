<template>
  <div class="users-transactions margin-bottom flex-row">
    <div class="flex-small" v-for="user in users" :key="user.id">
      <h5>{{ user.name }}</h5>
      <div><strong>Debt:</strong> </div>
      <div><strong>Deposits:</strong> {{ getUserDepositsTotal(user.id) }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserTransactions',
    props: {
      users: Array,
      billingItems: Array,
      depositItems: Array,
    },
    methods: {
      getUserDepositsTotal: function(userId) {
        let userDepositsTotal = 0
        for (let deposit of this.depositItems) {
          if(deposit.user === userId) {
            userDepositsTotal += parseFloat(deposit.value)
          }
        }
        return userDepositsTotal
      }
    },
  };
</script>

<style scoped></style>