<template>
  <div class="billing-table">
    <table>
        <thead>
            <tr>
                <th>Actions</th>
                <th>Description</th>
                <th>Value</th>
                <th v-for="user in users" :key="user.id">
                    {{ user.name }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="billing in billingItems" :key="billing.id">
                <td>
                    <button @click="$emit('delete:billing', billing.id)">Remove</button>
                </td>
                <td>{{ billing.description }}</td>
                <td>{{ billing.value }}</td>
                <td v-for="user in users" :key="user.id">
                    {{ getUserValue(billing, user.id) }}
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="2"><strong>Total</strong></td>
                <td></td>
                <td v-for="user in users" :key="user.id">
                    {{ getUserTotal(user.id) }}
                </td>
            </tr>
        </tfoot>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'BillingTable',
    props: {
      billingItems: Array,
      users: Array
    },
    methods: {
        getUserValue: function(billing, userId) {
            const userValue = this.roundNumber(billing.value / billing.users.length);
            return billing.users.includes(userId) ? userValue : 0
        },
        getUserTotal: function(userId) {
            let userTotal = 0
            for (let billing of this.billingItems) {
                if(billing.users.includes(userId)) {
                    userTotal += (billing.value/billing.users.length)
                }
            }
            return this.roundNumber(userTotal)
        },
    },
  };
</script>

<style scoped></style>
