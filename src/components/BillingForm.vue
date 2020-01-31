<template>
  <div class="billing-form">
    <form v-on:submit.prevent="submitForm">
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
      users: Array
    },
    data() {
      return {
        billing: {
          description: "",
          value: 0,
          users: [1,2,3]
        }
      };
    },
    methods: {
      submitForm() {
        this.$emit("add:billing", this.billing);
      },
    }
  };
</script>

<style scoped></style>