<template>
  <div v-if="showBillingForm" class="billing-form modal-form">
    <form v-on:submit.prevent="submitForm">
      <div class="input">
        <label>Month</label>
        <input 
          type="text" 
          v-model="billing.month" 
        >
      </div>
      <div class="input">
        <label>Description</label>
        <input 
          type="text" 
          v-model="billing.description" 
        >
      </div>
      <div class="input">
        <label>Value</label>
        <input 
          type="text" 
          v-model="billing.value" 
        >
      </div>
      <div class="input">
        <label>Users</label>
        <ul>
          <li v-for="user in users" :key="user.id">
            <input 
              type="checkbox"
              v-bind:value="user.id"
              v-model="billing.users"
            > {{ user.name }}
          </li>
        </ul>
      </div>
      <button>Add Billing</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'BillingForm',
    props: {
      users: Array,
      showBillingForm: Boolean,
      activeMonth: String,
    },
    data() {
      return {
        show_form: false,
        billing: {
          month: this.activeMonth,
          description: "",
          value: 0,
          users: []
        }
      };
    },
    methods: {
      submitForm() {
        this.$emit("add:billing", this.billing);
        this.billing = {
          month: this.activeMonth,
          description: "",
          value: 0,
          users: []
        }
      },
    }
  };
</script>

<style scoped></style>