<template>
  <div v-if="showUsersPanel" class="users-panel modal-panel">
    <h2>Users 
      <button @click="addMode = true">Add User</button>
      <button v-on:click="$emit('toggle-users-panel')">Close</button>
    </h2>
    <table>
      <thead>
        <tr>
          <th class="name">User</th>
          <th class="active">Active</th>
          <th class="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            <span v-if="editMode != user.id">{{ user.name }}</span>
            <span v-if="editMode == user.id"><input type="text" v-model="user.name"></span>
          </td>
          <td>
            <input type="checkbox" :checked="user.active" @change="$emit('activate:user', user.id, $event.target.checked)">
          </td>
          <td>
            <button v-bind:class="{ 'muted-button': editMode != user.id }" @click="editUser(user)">Edit</button> 
            &nbsp; 
            <button v-if="!userHasTransactions(user)" class="muted-button" @click="$emit('delete:user', user.id)">Remove</button>
          </td>
        </tr>

        <tr v-if="addMode">
          <td>
            <input type="text" v-model="userItem.name">
          </td>
          <td>
            <input type="checkbox" v-model="userItem.active">
          </td>
          <td>
            <button @click="addUser()">Add</button> 
            &nbsp; 
            <button @click="addMode = false" class="muted-button">Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
    <small><p>Users with deposits or billings can't be deleted. They can only be deactivated.</p></small>
  </div>
</template>

<script>
  export default {
    name: 'UsersPanel',
    props: {
      showUsersPanel: Boolean,
      users: Array,
      billingItems: Array,
      depositItems: Array,
    },
    data() {
      return {
        addMode: false,
        editMode: false,
        userForm: {
          name: "",
          active: true,
        },
        userItem: {
          name: "",
          active: true,
        },
      };
    },
    methods: {
      addUser() {
        // add user
        this.$emit("add:user", this.userItem);
        this.userItem = this.userForm;

        // close form
        this.addMode = false
      },
      editUser(user) {
        if(this.editMode === user.id) {
          //this.$emit("edit:user", user);
          this.editMode = false;
        } else {
          this.editMode = user.id;
        }
      },
      userHasTransactions(user) {
        let userTransactions = false;
        for (let deposit of this.depositItems) {
          if(deposit.user === user.id) {
            userTransactions = true;
          }
        }
        for (let billing of this.billingItems) {
          if(billing.users.includes(user.id)) {
            userTransactions = true;
          }
        }
        return userTransactions;
      },
    }
  };
</script>

<style scoped>
  h2 {
    display: flex;
  }
  h2 button {
    margin-left: 10px;
  }
  h2 button:first-of-type {
    margin-left: auto;
  }

  .active {
    width: 80px;
  }
  .actions {
    width: 210px;
  }
</style>