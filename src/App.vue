<template>
  <div id="app">
    <Navigation 
      :activeMonth="activeMonth" 
      v-on:toggle-billing-form="showBillingForm = !showBillingForm" 
      v-on:toggle-deposits-form="showDepositForm = !showDepositForm"
    />
    <UsersTransactions 
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
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
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
        ],
        depositItems: [],
      };
    },
    created: function () {
      // set current month as active month
      var today = new Date()
      return this.activeMonth = this.monthNames[today.getMonth()] + ' ' + today.getFullYear()
    },
    methods: {
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
