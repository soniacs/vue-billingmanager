<template>
  <div id="app">
    <Navigation 
      :activeMonth="activeMonth"
      :showBillingForm="showBillingForm" 
      :showDepositForm="showDepositForm" 
      :showUsersPanel="showUsersPanel" 
      v-on:toggle-billing-form="showBillingForm = !showBillingForm" 
      v-on:toggle-deposits-form="showDepositForm = !showDepositForm" 
      v-on:toggle-users-panel="showUsersPanel = !showUsersPanel" 
      v-on:prev-month="goToPrevMonth" 
      v-on:next-month="goToNextMonth" 
      v-on:current-month="goToCurrentMonth" 
    />
    <UsersDeposits 
      :activeMonth="activeMonth" 
      :users="users" 
      :billingItems="billingItems" 
      :depositItems="depositItems" 
      @delete:deposit="deleteDepositItem" 
      @edit:deposit="editDepositMode" 
    />
    <BillingTable 
      :activeMonth="activeMonth" 
      :billingItems="billingItems" 
      :users="users" 
      @delete:billing="deleteBillingItem"
      @edit:billing="editBillingMode" 
    />
    <BillingForm 
      :showBillingForm="showBillingForm" 
      :activeMonth="activeMonth" 
      :users="users" 
      :itemToEdit="billingItemToEdit"
      @add:billingItem="addBillingItem" 
      v-on:toggle-billing-form="showBillingForm = !showBillingForm" 
    />
    <DepositForm 
      :activeMonth="activeMonth"
      :showDepositForm="showDepositForm" 
      :users="users" 
      :itemToEdit="depositItemToEdit"
      @add:depositItem="addDepositItem" 
      v-on:toggle-deposits-form="showDepositForm = !showDepositForm" 
    />
    <UsersPanel 
      :showUsersPanel="showUsersPanel" 
      :users="users" 
      :billingItems="billingItems" 
      :depositItems="depositItems" 
      @add:user="addUserItem" 
      @delete:user="deleteUserItem"
      @activate:user="activateUserItem" 
      v-on:toggle-users-panel="showUsersPanel = !showUsersPanel" 
    />
  </div>
</template>

<script>
  import BillingTable from './components/BillingTable.vue'
  import BillingForm from './components/BillingForm.vue'
  import DepositForm from './components/DepositForm.vue'
  import UsersDeposits from './components/UsersDeposits.vue'
  import UsersPanel from './components/UsersPanel.vue' 
  import Navigation from './components/Navigation.vue'

  export default {
    name: 'app',
    components: {
      BillingTable,
      BillingForm,
      DepositForm,
      UsersDeposits,
      UsersPanel,
      Navigation,
    },
    data() {
      return {
        showBillingForm: false,
        showDepositForm: false,
        showUsersPanel: false,
        activeMonth: "",
        billingItemToEdit: null,
        depositItemToEdit: null,
        // BD
        users: [
          {
            id: 1,
            name: 'Sónia',
            active: true,
          },
          {
            id: 2,
            name: 'Marcos',
            active: true,
          },
          {
            id: 3,
            name: 'Susana',
            active: true,
          },
        ],
        billingItems: [
          {
            id: 1,
            description: 'Casa',
            value: 600,
            users: [1,2,3],
            month: "April 2022"
          },
          {
            id: 2,
            description: 'Seguro',
            value: 40,
            users: [1,2],
            month: "January 2022"
          },
          {
            id: 3,
            description: 'Condomínio',
            value: 90,
            users: [1,2,3],
            month: "January 2022"
          },
          {
            id: 4,
            description: 'Condomínio',
            value: 30,
            users: [1,2,3],
            month: "February 2022"
          },
          {
            id: 5,
            description: 'Condomínio',
            value: 30,
            users: [1,2,3],
            month: "December 2021"
          },
          {
            id: 6,
            description: 'Condomínio',
            value: 30,
            users: [1,2,3],
            month: "April 2022"
          },
        ],
        depositItems: [
          {
            id: 1,
            value: 100,
            user: 1,
            month: "January 2022",
            description: 'dia 2',
          },
          {
            id: 2,
            value: 100,
            user: 1,
            month: "April 2022",
            description: 'netflix',
          },
        ],
      };
    },
    created: function () {
      // set current month as active month
      this.goToCurrentMonth();
    },
    computed: {
      billingItemsbyMonth: function() {
        return this.billingItems.filter(obj => {
          return obj.month === this.activeMonth
        })
      },
    },
    methods: {
      // DATES
      monthExists(month) {
        const monthBillings = this.billingItems.filter(obj => {
          return obj.month === month
        })
        return monthBillings.length ? true : false
      },
      goToMonth(month) {
        //return this.monthExists(month) ? this.activeMonth = month : false
        return this.activeMonth = month
      },
      goToPrevMonth() {
        const monthObj = this.monthStringToObject(this.activeMonth)
        let prevMonthIndex = monthObj.month - 1
        let monthYear = monthObj.year  
        if(prevMonthIndex < 0) {
          prevMonthIndex = this.monthNames.length - 1
          monthYear -= 1
        }
        this.goToMonth(this.formatMonth(prevMonthIndex, monthYear))
      },
      goToNextMonth() {
        const monthObj = this.monthStringToObject(this.activeMonth)
        let nextMonthIndex = monthObj.month + 1
        let monthYear = monthObj.year  
        if(nextMonthIndex > this.monthNames.length - 1) {
          nextMonthIndex = 0
          monthYear += 1
        }
        this.goToMonth(this.formatMonth(nextMonthIndex, monthYear))
      },
      goToCurrentMonth() {
        var today = new Date()
        this.activeMonth = this.formatMonth(today.getMonth(), today.getFullYear())
      },

      // BILLINGS
      addBillingItem(billing) {
        const id = this.setNewId(this.billingItems);
        const newBilling = { ...billing, id };
        this.billingItems = [...this.billingItems, newBilling];
      },
      deleteBillingItem(id) {
        this.billingItems = this.billingItems.filter(billing => billing.id !== id);
      },
      editBillingMode(id) {
        this.showBillingForm = true;
        this.billingItemToEdit = this.billingItems.find(obj => obj.id == id)
      },

      // DEPOSITS
      addDepositItem(deposit) {
        const id = this.setNewId(this.depositItems);
        const newDeposit = { ...deposit, id };
        this.depositItems = [...this.depositItems, newDeposit];
      },
      deleteDepositItem(id) {
        this.depositItems = this.depositItems.filter(deposit => deposit.id !== id);
      },
      editDepositMode(id) {
        this.showDepositForm = true;
        this.depositItemToEdit = this.depositItems.find(obj => obj.id == id)
      },

      // USERS
      addUserItem(user) {
        const id = this.setNewId(this.users);
        const newUser = { ...user, id };
        this.users = [...this.users, newUser];
      },
      deleteUserItem(id) {
        this.users = this.users.filter(user => user.id !== id);
      },
      activateUserItem(id, activate) {
        var userIndex = this.users.findIndex(x => x.id == id)
        this.users[userIndex].active = activate;
      }
    },
    watch: {
      showBillingForm: function(val) {
        if(!val) {
          // clear item to edit on billing form close
          this.billingItemToEdit = null
        } else {
          // close other forms
          this.showDepositForm = false
          this.showUserDeposits = false
          this.showUsersPanel = false
        }
      },
      showDepositForm: function(val) {
        if(!val) {
          // clear item to edit on deposit form close
          this.depositItemToEdit = null
        } else {
          // close other forms
          this.showBillingForm = false
          this.showUsersPanel = false
        }
      },
      showUsersPanel: function(val) {
        if(val) {
          // close other panels
          this.showDepositForm = false
          this.showUserDeposits = false
          this.showBillingForm = false
        }
      },
    },
  };
</script>

<style>
  body { padding: 120px 40px 20px; }

  a { cursor: pointer; }

  .modal-panel {
    position: fixed;
    top: 100px;
    left: 40px;
    right: 40px;
    bottom: 40px;
    overflow: scroll;
    z-index: 100;
    border: 1px solid #ccc;
    background: white;
    padding: 20px;
  }

</style>
