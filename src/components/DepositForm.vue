<template>
  <div v-if="showDepositForm" class="deposits-form modal-panel">
    <form v-on:submit.prevent="submitForm">
      <input type="hidden" v-model="depositItem.month">
      <div class="input">
          <label>User</label>
            <ul>
              <li v-for="user in users" :key="user.id">
                <input 
                  type="radio"
                  v-bind:value="user.id"
                  v-model="depositItem.user"
                > {{ user.name }}
              </li>
            </ul>
        </div>
        <div class="input">
            <label>Value</label>
            <input 
              type="text" 
              v-model="depositItem.value" 
            >
        </div>
        <div class="form-submit">
          <a class="button muted-button" v-on:click="$emit('toggle-deposits-form')">Cancel</a>
          &nbsp; 
          <button>
            <span v-if="itemToEdit">Edit Deposit</span>
            <span v-if="!itemToEdit">Add Deposit</span>
          </button>
        </div>
    </form>
  </div>
</template>

<script>
	export default {
    name: 'DepositForm',
    props: {
      activeMonth: String,
      showDepositForm: Boolean,
      users: Array,
      itemToEdit: Object,
    },
    data() {
      return {
        depositForm: {
          user: "",
          value: 0,
          month: this.activeMonth,
        },
        depositItem: {
          user: "",
          value: 0,
          month: this.activeMonth,
        }
      };
    },
    methods: {
      submitForm() {
        if(this.itemToEdit) {
          this.$emit("edit:depositItem", this.depositItem);
        } else {
          this.$emit("add:depositItem", this.depositItem);
          this.depositItem = this.depositForm;
        }
      },
    },
    watch: {
      itemToEdit: function(val) {
        // check if there's an item to edit
        // to define edit or add mode
        if(val) {
          this.depositItem = this.itemToEdit
        } else {
          this.depositItem = this.depositForm
        }
      },
      activeMonth: function(val) {
        this.depositItem.month = val
      },
    },
  };
</script>

<style scoped></style>