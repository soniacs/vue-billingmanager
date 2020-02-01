<template>
  <div class="deposits-form">
    <button v-on:click="show_form = !show_form">Add Deposit</button>
    <form v-if="show_form" v-on:submit.prevent="submitForm">
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
    name: 'DepositsForm',
    props: {
      users: Array,
      depositItems: Array,
    },
    data() {
      return {
        show_form: true,
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
        this.show_form = false;
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