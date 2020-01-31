<template>
  <div id="app">
    <BillingTable 
      :billingItems="billingItems" 
      :users="users" 
      @delete:billing="deleteBillingItem"
    />
    <BillingForm 
      :users="users" 
      @add:billing="addBillingItem"
    />
  </div>
</template>

<script>
  import BillingTable from './components/BillingTable.vue'
  import BillingForm from './components/BillingForm.vue'

  export default {
    name: 'app',
    components: {
      BillingTable,
      BillingForm,
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
        ]
      };
    },
    methods: {
      addBillingItem(billing) {
        const lastId = this.billingItems.length > 0
          ? this.billingItems[this.billingItems.length - 1].id
          : 0;
        const id = lastId + 1;
        const newBilling = { ...billing, id };
        this.billingItems = [...this.billingItems, newBilling];
      },
      deleteBillingItem(id) {
        this.billingItems = this.billingItems.filter(billing => billing.id !== id);
      },
    }
  };
</script>

<style>
  body { padding: 20px 40px; }
</style>
