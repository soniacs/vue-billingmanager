<template>
  <div id="app">
    <Navigation 
      :activeMonth="activeMonth"
      :showBillingForm="showBillingForm" 
      :showDepositForm="showDepositForm" 
      v-on:toggle-billing-form="showBillingForm = !showBillingForm" 
      v-on:toggle-deposits-form="showDepositForm = !showDepositForm" 
      v-on:prev-month="goToPrevMonth" 
      v-on:next-month="goToNextMonth" 
      v-on:current-month="goToCurrentMonth" 
    />
    <UsersDeposits 
      :activeMonth="activeMonth" 
      :users="users" 
      :billingItems="billingItems" 
      :depositItems="depositItems" 
      @delete:deposit="deleteDepositItem" 
      @edit:deposit="editDepositMode" 
    />
    <BillingTable 
      :activeMonth="activeMonth" 
      :billingItems="billingItems" 
      :users="users" 
      @delete:billing="deleteBillingItem"
      @edit:billing="editBillingMode" 
    />
    <BillingForm 
      :showBillingForm="showBillingForm" 
      :activeMonth="activeMonth" 
      :users="users" 
      :itemToEdit="billingItemToEdit"
      @add:billingItem="addBillingItem" 
      @edit:billingItem="editBillingItem" 
      v-on:toggle-billing-form="showBillingForm = !showBillingForm" 
    />
    <DepositForm 
      :activeMonth="activeMonth"
      :showDepositForm="showDepositForm" 
      :users="users" 
      :itemToEdit="depositItemToEdit"
      @add:depositItem="addDepositItem" 
      @edit:depositItem="editDepositItem" 
      v-on:toggle-deposits-form="showDepositForm = !showDepositForm" 
    />
  </div>
</template>

<script>
  import BillingTable from './components/BillingTable.vue'
  import BillingForm from './components/BillingForm.vue'
  import DepositForm from './components/DepositForm.vue'
  import UsersDeposits from './components/UsersDeposits.vue'
  import Navigation from './components/Navigation.vue'

  export default {
    name: 'app',
    components: {
      BillingTable,
      BillingForm,
      DepositForm,
      UsersDeposits,
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
            month: "April 2022"
          },
          {
            id: 2,
            description: 'Seguro',
            value: 24.69,
            users: [1,2],
            month: "January 2022"
          },
          {
            id: 3,
            description: 'Condomínio',
            value: 66.43,
            users: [1,2,3],
            month: "January 2022"
          },
          {
            id: 4,
            description: 'Condomínio',
            value: 66.43,
            users: [1,2,3],
            month: "February 2022"
          },
          {
            id: 5,
            description: 'Condomínio',
            value: 66.43,
            users: [1,2,3],
            month: "December 2021"
          },
          {
            id: 6,
            description: 'Condomínio',
            value: 66.43,
            users: [1,2,3],
            month: "April 2022"
          },
        ],
        billingItemToEdit: null,
        depositItems: [
          {
            id: 1,
            value: 100,
            user: 1,
            month: "January 2022"
          },
          {
            id: 2,
            value: 100,
            user: 1,
            month: "April 2022"
          },
        ],
        depositItemToEdit: null,
      };
    },
    created: function () {
      // set current month as active month
      this.goToCurrentMonth()
    },
    computed: {
        billingItemsbyMonth: function() {
            return this.billingItems.filter(obj => {
                return obj.month === this.activeMonth
            })
        },
    },
    methods: {
      // DATES
      monthExists(month) {
        const monthBillings = this.billingItems.filter(obj => {
          return obj.month === month
        })
        return monthBillings.length ? true : false
      },
      goToMonth(month) {
        //return this.monthExists(month) ? this.activeMonth = month : false
        return this.activeMonth = month
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
      goToCurrentMonth() {
        var today = new Date()
        this.activeMonth = this.formatMonth(today.getMonth(), today.getFullYear())
      },

      // BILLINGS
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
      editBillingMode(id) {
        this.showBillingForm = true;
        this.billingItemToEdit = this.billingItems.find(obj => obj.id == id)
      },
      editBillingItem(billing, hideForm = true) {
        var itemIndex = this.billingItems.findIndex(x => x.id == billing.id)
        this.billingItems[itemIndex] = billing;
        if(hideForm) {
          this.showBillingForm = false
        }
      },

      // DEPOSITS
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
      editDepositMode(id) {
        this.showDepositForm = true;
        this.depositItemToEdit = this.depositItems.find(obj => obj.id == id)
      },
      editDepositItem(deposit, hideForm = true) {
        var itemIndex = this.depositItems.findIndex(x => x.id == deposit.id)
        this.depositItems[itemIndex] =deposit;
        if(hideForm) {
          this.showDepositForm = false
        }
      },
    },
    watch: {
      showBillingForm: function(val) {
        if(!val) {
          // clear item to edit on billing form close
          this.billingItemToEdit = null
        } else {
          // close other forms
          this.showDepositForm = false
          this.showUserDeposits = false
        }
      },
      showDepositForm: function(val) {
        if(!val) {
          // clear item to edit on deposit form close
          this.depositItemToEdit = null
        } else {
          // close other forms
          this.showBillingForm = false
        }
      },
    },
  };
</script>

<style>
  body { padding: 120px 40px 20px; }

  a { cursor: pointer; }

  .modal-panel {
    position: fixed;
    top: 100px;
    left: 40px;
    right: 40px;
    bottom: 40px;
    overflow: scroll;
    z-index: 100;
    border: 1px solid #ccc;
    background: white;
    padding: 20px;
  }
</style>
