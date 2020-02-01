<template>
  <div id="app">
    <UsersTransactions 
      :users="users" 
      :billingItems="billingItems" 
      :depositItems="depositItems" 
    />
    <BillingTable 
      :billingItems="billingItems" 
      :users="users" 
      @delete:billing="deleteBillingItem"
    />
    <BillingForm 
      :users="users" 
      @add:billing="addBillingItem"
    />
    <DepositsForm 
      :users="users" 
      :depositItems="depositItems" 
      @add:deposit="addDepositItem"
    />
  </div>
</template>

<script>
  import BillingTable from './components/BillingTable.vue'
  import BillingForm from './components/BillingForm.vue'
  import DepositsForm from './components/DepositsForm.vue'
  import UsersTransactions from './components/UsersTransactions.vue'

  export default {
    name: 'app',
    components: {
      BillingTable,
      BillingForm,
      DepositsForm,
      UsersTransactions,
    },
    data() {
      return {
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
          },
          {
            id: 2,
            description: 'Seguro',
            value: 24.69,
            users: [1,2],
          },
          {
            id: 3,
            description: 'Condomínio',
            value: 66.43,
            users: [1,2,3],
          },
        ],
        depositItems: [],
      };
    },
    methods: {
      addBillingItem(billing) {
        const id = this.setNewId(this.billingItems);
        const newBilling = { ...billing, id };
        this.billingItems = [...this.billingItems, newBilling];
      },
      deleteBillingItem(id) {
        this.billingItems = this.billingItems.filter(billing => billing.id !== id);
      },
      addDepositItem(deposit) {
        const id = this.setNewId(this.depositItems);
        const newDeposit = { ...deposit, id };
        this.depositItems = [...this.depositItems, newDeposit];
      },
    }
  };
</script>

<style>
  body { padding: 20px 40px; }
</style>
