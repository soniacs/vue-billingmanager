<template>
  <nav class="navigation margin-bottom">
    <div class="month-menu">
      <button v-on:click="$emit('prev-month')">&lt;</button>
      <span class="active">{{ activeMonth }}</span>
      <button v-on:click="$emit('next-month')">&gt;</button>
    </div>
    <div class="actions">
      <button v-on:click="$emit('toggle-billing-form')">Add Billing</button>
      <button v-on:click="$emit('toggle-deposits-form')">Add Deposit</button>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Navigation',
    props: {
      activeMonth: String,
    },
  };
</script>

<style scoped>
  .navigation {
    display: flex;
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