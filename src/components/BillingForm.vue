<template>
  <div v-if="showBillingForm" class="billing-form modal-panel">
    <form v-on:submit.prevent="submitForm">
      <input type="hidden" v-model="billingItem.month">
      <div class="input">
        <label>Description</label>
        <input 
          type="text" 
          v-model="billingItem.description" 
        >
      </div>
      <div class="input">
        <label>Value</label>
        <input 
          type="number" 
          step="0.01" 
          v-model="billingItem.value" 
        >
      </div>
      <div class="input">
        <label>Users</label>
        <ul>
          <li v-for="user in users" :key="user.id">
            <input 
              type="checkbox"
              v-bind:value="user.id"
              v-model="billingItem.users"
            > {{ user.name }}
          </li>
        </ul>
      </div>
      <div class="form-submit">
        <a class="button muted-button" v-on:click="$emit('toggle-billing-form')">Cancel</a>
         &nbsp; 
        <button>
          <span v-if="itemToEdit">Edit Billing</span>
          <span v-if="!itemToEdit">Add Billing</span>
        </button>
      </div>
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
      itemToEdit: Object,
    },
    data() {
      return {
        billingForm: {
          month: this.activeMonth,
          description: "",
          value: "0",
          users: []
        },
        billingItem: {
          month: this.activeMonth,
          description: "",
          value: "0",
          users: []
        },
      };
    },
    methods: {
      submitForm() {
        if(!this.itemToEdit) {
          this.$emit("add:billingItem", this.billingItem);
          this.billingItem = this.billingForm;
        }
        this.$emit('toggle-billing-form');
      },
    },
    watch: {
      itemToEdit: function(val) {
        // check if there's an item to edit
        // to define edit or add mode
        if(val) {
          this.billingItem = this.itemToEdit
        } else {
          this.billingItem = this.billingForm
        }
      },
      activeMonth: function(val) {
        this.billingItem.month = val
      },
    },
  };
</script>

<style scoped></style>