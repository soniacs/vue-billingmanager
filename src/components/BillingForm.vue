<template>
  <div class="billing-form">
    <button v-on:click="show_form = !show_form">Add Billing</button>
    <form v-if="show_form" v-on:submit.prevent="submitForm">
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
      users: Array
    },
    data() {
      return {
        show_form: false,
        billing: {
          description: "",
          value: 0,
          users: []
        }
      };
    },
    methods: {
      submitForm() {
        this.$emit("add:billing", this.billing);
        this.show_form = false;
        this.billing = {
          description: "",
          value: 0,
          users: []
        }
      },
    }
  };
</script>

<style scoped></style>