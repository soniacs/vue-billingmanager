<template>
  <div class="users-transactions margin-bottom flex-row">
    <div class="flex-small" v-for="user in users" :key="user.id">
      <h5>{{ user.name }}</h5>
      <div><strong>Debt:</strong> </div>
      <div><strong>Deposits:</strong> {{ userDepositsTotal(user.id) }}</div>

      <ul class="user-deposits">
        <li v-for="deposit in userDeposits(user.id)" :key="deposit.id">
          <strong>{{ deposit.date }}</strong> - {{ deposit.value }} 
          <a @click="$emit('delete:deposit', deposit.id)">remove</a>
        </li>
      </ul>
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
      userDeposits: function(userId) {
        var items = this.depositItems.filter(obj => {
          return obj.user === userId
        })
        return items
      },
      userDepositsTotal: function(userId) {
        let userDepositsTotal = 0
        for (let deposit of this.depositItems) {
          if(deposit.user === userId) {
            userDepositsTotal += parseFloat(deposit.value)
          }
        }
        return userDepositsTotal
      },
      userDebt: function(userId) {
        return userId
      }
    },
  };
</script>

<style scoped></style>