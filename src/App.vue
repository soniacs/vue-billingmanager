<template>
  <div id="app">
    <Navigation 
      :activeMonth="activeMonth" 
      v-on:toggle-billing-form="showBillingForm = !showBillingForm" 
      v-on:toggle-deposits-form="showDepositForm = !showDepositForm" 
      v-on:prev-month="goToPrevMonth" 
      v-on:next-month="goToNextMonth" 
    />
    <UsersTransactions 
      :activeMonth="activeMonth" 
      :users="users" 
      :billingItems="billingItems" 
      :depositItems="depositItems" 
      @delete:deposit="deleteDepositItem" 
    />
    <BillingTable 
      :activeMonth="activeMonth" 
      :billingItems="billingItems" 
      :users="users" 
      @delete:billing="deleteBillingItem"
    />
    <BillingForm 
      :showBillingForm="showBillingForm" 
      :activeMonth="activeMonth" 
      :users="users" 
      @add:billing="addBillingItem"
    />
    <DepositForm 
      :activeMonth="activeMonth"
      :showDepositForm="showDepositForm" 
      :users="users" 
      :depositItems="depositItems" 
      @add:deposit="addDepositItem"
    />
  </div>
</template>

<script>
  import BillingTable from './components/BillingTable.vue'
  import BillingForm from './components/BillingForm.vue'
  import DepositForm from './components/DepositForm.vue'
  import UsersTransactions from './components/UsersTransactions.vue'
  import Navigation from './components/Navigation.vue'

  export default {
    name: 'app',
    components: {
      BillingTable,
      BillingForm,
      DepositForm,
      UsersTransactions,
      Navigation,
    },
    data() {
      return {
        showBillingForm: false,
        showDepositForm: false,
        activeMonth: "",
        users: [
          {
            id: 1,
            name: 'Sónia',
          },
          {
            id: 2,
            name: 'Marcos',
          },
          {
            id: 3,
            name: 'Susana',
          },
        ],
        billingItems: [
          {
            id: 1,
            description: 'Casa',
            value: 303.26,
            users: [1,2,3],
            month: "January 2020"
          },
          {
            id: 2,
            description: 'Seguro',
            value: 24.69,
            users: [1,2],
            month: "January 2020"
          },
          {
            id: 3,
            description: 'Condomínio',
            value: 66.43,
            users: [1,2,3],
            month: "January 2020"
          },
          {
            id: 4,
            description: 'Condomínio',
            value: 66.43,
            users: [1,2,3],
            month: "February 2020"
          },
          {
            id: 5,
            description: 'Condomínio',
            value: 66.43,
            users: [1,2,3],
            month: "December 2019"
          },
          {
            id: 6,
            description: 'Condomínio',
            value: 66.43,
            users: [1,2,3],
            month: "March 2020"
          },
        ],
        depositItems: [
          {
            id: 1,
            value: 100,
            user: 1,
            date: "January 2020"
          },
        ],
      };
    },
    created: function () {
      // set current month as active month
      var today = new Date()
      return this.activeMonth = this.formatMonth(today.getMonth(), today.getFullYear())      
    },
    computed: {
        billingItemsbyMonth: function() {
            return this.billingItems.filter(obj => {
                return obj.month === this.activeMonth
            })
        },
    },
    methods: {
      monthExists(month) {
        const monthBillings = this.billingItems.filter(obj => {
          return obj.month === month
        })
        return monthBillings.length ? true : false
      },
      goToMonth(month) {
        return this.monthExists(month) ? this.activeMonth = month : false
      },
      goToPrevMonth() {
        const monthObj = this.monthStringToObject(this.activeMonth)
        let prevMonthIndex = monthObj.month - 1
        let monthYear = monthObj.year  
        if(prevMonthIndex < 0) {
          prevMonthIndex = this.monthNames.length - 1
          monthYear -= 1
        }
        this.goToMonth(this.formatMonth(prevMonthIndex, monthYear))
      },
      goToNextMonth() {
        const monthObj = this.monthStringToObject(this.activeMonth)
        let nextMonthIndex = monthObj.month + 1
        let monthYear = monthObj.year  
        if(nextMonthIndex > this.monthNames.length - 1) {
          nextMonthIndex = 0
          monthYear += 1
        }
        this.goToMonth(this.formatMonth(nextMonthIndex, monthYear))
      },
      addBillingItem(billing, hideForm = true) {
        const id = this.setNewId(this.billingItems);
        const newBilling = { ...billing, id };
        this.billingItems = [...this.billingItems, newBilling];
        if(hideForm) {
          this.showBillingForm = false
        }
      },
      deleteBillingItem(id) {
        this.billingItems = this.billingItems.filter(billing => billing.id !== id);
      },
      addDepositItem(deposit, hideForm = true) {
        const id = this.setNewId(this.depositItems);
        const newDeposit = { ...deposit, id };
        this.depositItems = [...this.depositItems, newDeposit];
        if(hideForm) {
          this.showDepositForm = false
        }
      },
      deleteDepositItem(id) {
        this.depositItems = this.depositItems.filter(deposit => deposit.id !== id);
      },
    }
  };
</script>

<style>
  body { padding: 20px 40px; }

  .modal-form {
    position: fixed;
    top: 100px;
    left: 40px;
    right: 40px;
    z-index: 100;
    border: 1px solid #ccc;
    background: white;
    padding: 20px;
  }
</style>
