<template>
  <div class="users-list margin-bottom flex-row">
    <div class="flex-small" v-for="user in activeUsers()" :key="user.id">
      <h5>{{ user.name }}</h5>
      <div><strong>Debt:</strong> {{ userDebt(user.id) }}€</div>
      <div><strong>Deposits:</strong> {{ userDepositsByMonthTotal(user.id) }}€</div>

      <div class="user-deposits" v-if="userDepositsByMonth(user.id).length > 0">
        <a @click="showDeposits(user.id)">
          <span v-if="activeUserDeposits === user.id">Close Deposits</span>
          <span v-if="activeUserDeposits !== user.id">View Deposits</span>
        </a>
        <ul class="user-deposits-dropdown" v-if="activeUserDeposits === user.id">
          <li v-for="deposit in userDepositsByMonth(user.id)" :key="deposit.id">
            {{ deposit.value }}€ <span v-if="deposit.description">– {{ deposit.description }}</span>
            <br><a @click="$emit('edit:deposit', deposit.id)">edit</a> | <a @click="$emit('delete:deposit', deposit.id)">remove</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UsersDeposits',
    props: {
      users: Array,
      billingItems: Array,
      depositItems: Array,
      activeMonth: String,
    },
    data() {
      return {
        activeUserDeposits: null,
      };
    },
    methods: {
      activeUsers: function() {
        return this.users.filter(user => user.active);
      },
      monthIsActiveOrPrevious: function(month) {
        const activeMonthObj = this.monthStringToObject(this.activeMonth)
        const monthObj = this.monthStringToObject(month)

        if(monthObj.year === activeMonthObj.year && monthObj.month <= activeMonthObj.month) {
          return true
        } else if(monthObj.year < activeMonthObj.year) {
          return true
        }
      },
      userDepositsByMonth: function(userId) {
        let userDeposits = []
        for (let deposit of this.depositItems) {
          if(deposit.user === userId && deposit.month === this.activeMonth) {
            userDeposits.push(deposit)
          }
        }
        return userDeposits
      },
      userDepositsByMonthTotal: function(userId) {
        let userDepositsTotal = 0
        for (let deposit of this.userDepositsByMonth(userId)) {
          userDepositsTotal += parseFloat(deposit.value)
        }
        return userDepositsTotal
      },
      userDepositsTotal: function(userId) {
        let userDepositsTotal = 0
        for (let deposit of this.depositItems) {
          if(deposit.user === userId && this.monthIsActiveOrPrevious(deposit.month)) {
            userDepositsTotal += parseFloat(deposit.value)
          }
        }
        return userDepositsTotal
      },
      userDebt: function(userId) {
        const userDeposits = this.userDepositsTotal(userId)
        let userDebt = 0
        for (let billing of this.billingItems) {
          // show debt from this month and previous months
          if(billing.users.includes(userId) && this.monthIsActiveOrPrevious(billing.month)) {
            userDebt += (billing.value/billing.users.length)
          }
        }
        return this.roundNumber(userDebt - userDeposits)
      },
      showDeposits: function(userId) {
        if(this.activeUserDeposits && this.activeUserDeposits === userId) {
          this.activeUserDeposits = null
        } else {
          this.activeUserDeposits = userId
        }
      },
    },
  };
</script>

<style scoped>

.user-deposits{
  position: relative;
}
.user-deposits-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  background: white;
  list-style-type: none;
  z-index: 20;
  padding: 0;
}
.user-deposits-dropdown li {
  border-bottom: 1px solid #ccc;
  padding: 10px;
}
.user-deposits-dropdown li:last-child {
  border-bottom: none;
}


</style>