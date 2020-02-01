<template>
  <div v-if="showDepositForm" class="deposits-form modal-form">
    <form v-on:submit.prevent="submitForm">
      <div class="input">
          <label>User</label>
            <ul>
              <li v-for="user in users" :key="user.id">
                <input 
                  type="radio"
                  v-bind:value="user.id"
                  v-model="deposit.user"
                > {{ user.name }}
              </li>
            </ul>
        </div>
        <div class="input">
            <label>Value</label>
            <input 
              type="text" 
              v-model="deposit.value" 
            >
        </div>
        <div class="input">
            <label>Date</label>
            <input 
              type="text" 
              v-model="deposit.date" 
            >
        </div>
        <button>Add Deposit</button>
    </form>
  </div>
</template>

<script>
	export default {
    name: 'DepositForm',
    props: {
      showDepositForm: Boolean,
      users: Array,
      depositItems: Array,
    },
    data() {
      return {
        show_form: false,
        deposit: {
          user: "",
          value: 0,
          date: "",
        }

      };
    },
    methods: {
      submitForm() {
        this.$emit("add:deposit", this.deposit);
        this.deposit = {
          user: "",
          value: 0,
          date: "",
        }
      },
    }
  };
</script>

<style scoped></style>