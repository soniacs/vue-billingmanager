<template>
  <nav class="navigation margin-bottom">
    <div class="month-menu">
      <button v-on:click="$emit('prev-month')">&lt;</button>
      <span class="active">{{ activeMonth }}</span>
      <button v-on:click="$emit('next-month')">&gt;</button>
      <button v-on:click="$emit('current-month')">current</button>
    </div>
    <div class="actions">
      <button 
        v-on:click="$emit('toggle-billing-form')" 
        v-bind:class="{ 'accent-button': showBillingForm }">Add Billing</button>
      <button 
        v-on:click="$emit('toggle-deposits-form')" 
        v-bind:class="{ 'accent-button': showDepositForm }">Add Deposit</button>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Navigation',
    props: {
      activeMonth: String,
      showBillingForm: Boolean,
      showDepositForm: Boolean,
    },
  };
</script>

<style scoped>
  .navigation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    display: flex;
    align-items: center;
    background: white;
    z-index: 50;
    padding: 0 40px;
  }
  button {
    margin: 0 5px;
  }
  button:first-child {
    margin-left: 0;
  }
  button:last-child {
    margin-right: 0;
  }
  .actions {
    margin-left: auto;
  }
</style>