<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>Accounts</h1>
          <hr />
          <br />
          <!-- Allert Message -->
          <b-alert v-if="showMessage" variant="primary" show>{{
            message
          }}</b-alert>
          <!-- b-alert v-if="error" variant="danger" show>{{ error }}</b-alert-->

          <button
            type="button"
            class="btn btn-success btn-sm"
            v-b-modal.account-modal
          >
            Create Account
          </button>
          <br /><br />
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Account Name</th>
                <th scope="col">Account Number</th>
                <th scope="col">Account Balance</th>
                <th scope="col">Account Currency</th>
                <th scope="col">Account Status</th>
                <th scope="col">Country</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="account in accounts" :key="account.account_number">
                <td>{{ account.name }}</td>
                <td>{{ account.account_number }}</td>
                <td>{{ account.balance }}</td>
                <td>{{ account.currency }}</td>
                <td>
                  <span
                    v-if="account.status == 'Active'"
                    class="badge badge-success"
                    >{{ account.status }}</span
                  >
                  <span v-else class="badge badge-danger">{{
                    account.status
                  }}</span>
                </td>
                <td>{{ account.country }}</td>
                <td>
                  <div class="btn-group" role="group">
                    <button
                      type="button"
                      class="btn btn-info btn-sm"
                      v-b-modal.edit-account-modal
                      @click="editAccount(account)"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      v-b-modal.delete-account-modal
                      @click="deleteAccount(account)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <footer class="text-center">
            Copyright &copy; All Rights Reserved.
          </footer>
        </div>
      </div>
      <b-modal
        ref="addAccountModal"
        id="account-modal"
        title="Create a new account"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmit" class="w-100">
          <b-form-group
            id="form-id-group"
            label="Account ID:"
            label-for="form-name-input"
          >
            <b-form-input
              id="form-id-input"
              type="text"
              v-model="createAccountForm.id"
              placeholder="Account ID"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="form-name-group"
            label="Account Name:"
            label-for="form-name-input"
          >
            <b-form-input
              id="form-name-input"
              type="text"
              v-model="createAccountForm.name"
              placeholder="Account Name"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="form-password-group"
            label="Password:"
            label-for="form-password-input"
          >
            <b-form-input
              id="form-password-input"
              type="password"
              v-model="createAccountForm.password"
              placeholder="Password"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="form-currency-group"
            label="Currency:"
            label-for="form-currency-input"
          >
            <b-form-input
              id="form-currency-input"
              type="text"
              v-model="createAccountForm.currency"
              placeholder="$ or €"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="form-country-group"
            label="Country:"
            label-for="form-country-input"
          >
            <b-form-input
              id="form-country-input"
              type="text"
              v-model="createAccountForm.country"
              placeholder="Spain"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="outline-info">Submit</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Create Account-->
      <!-- Start of Modal for Edit Account-->
      <b-modal
        ref="editAccountModal"
        id="edit-account-modal"
        title="Edit the account"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmitUpdate" class="w-100">
          <b-form-group
            id="form-edit-name-group"
            label="Account Name:"
            label-for="form-edit-name-input"
          >
            <b-form-input
              id="form-edit-name-input"
              type="text"
              v-model="editAccountForm.name"
              placeholder="Account Name"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="outline-info">Update</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Edit Account-->
      <!-- Start of Modal for Delete Account-->
        <b-modal
          ref="deleteAccountModal"
          id="delete-account-modal"
          title="Delete the account"
          hide-backdrop
          hide-footer
        >
          <b-form @submit="onSubmitDelete" class="w-100">
            <p>Please, confirm that you want to delete this account.</p>
            <b-button type="submit" variant="outline-info">Delete</b-button>
          </b-form>
        </b-modal>
        <!-- End of Modal for Delete Account-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AppAccounts",
  data() {
    return {
      accounts: [],
      createAccountForm: {
        id: "",
        name: "",
        password: "",
        currency: "",
        country: "",
      },
      editAccountForm: {
        account_number: "",
        name: "",
      },
      deleteAccountForm: {
        account_number: "",
      },
      showMessage: false,
      message: "",
    };
  },
  methods: {
    /***************************************************
     * RESTful requests
     ***************************************************/

    //GET function
    RESTgetAccounts() {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts`;
      axios
        .get(path)
        .then((response) => {
          this.accounts = response.data.accounts;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // POST function
    RESTcreateAccount(payload) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts`;
      axios
        .post(path, payload)
        .then((response) => {
          this.RESTgetAccounts();
          // For message alert
          this.message = "Account Created succesfully!";
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          this.RESTgetAccounts();
        });
    },

    // Update function
    RESTchangeAccountName(payload) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${payload.account_number}`;
      axios
        .put(path, payload)
        .then((response) => {
          this.RESTgetAccounts();
          // For message alert
          this.message = "Account Updated successfully!";
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          this.RESTgetAccounts();
        });
    },

    // Delete account
    RESTdeleteAccount(payload) {
      console.log("Deleting", payload.account_number)
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${payload.account_number}`;
      axios
        .delete(path)
        .then((response) => {
          this.RESTgetAccounts();
          // For message alert
          this.message = "Account Deleted successfully!";
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          this.RESTgetAccounts();
        });
    },

    /***************************************************
     * FORM MANAGEMENT
     * *************************************************/

    // Initialize forms empty
    initForm() {
      this.createAccountForm.id = "";
      this.createAccountForm.name = "";
      this.createAccountForm.password = "";
      this.createAccountForm.currency = "";
      this.createAccountForm.country = "";
      this.editAccountForm.account_number = "";
      this.editAccountForm.name = "";
    },

    // Handle submit event for create account
    onSubmit(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.addAccountModal.hide(); //hide the modal when submitted
      const payload = {
        id: this.createAccountForm.id,
        name: this.createAccountForm.name,
        password: this.createAccountForm.password,
        currency: this.createAccountForm.currency,
        country: this.createAccountForm.country,
      };
      this.RESTcreateAccount(payload);
      this.initForm();
    },

    // Handle submit event for edit account
    onSubmitUpdate(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.editAccountModal.hide(); //hide the modal when submitted
      const payload = {
        name: this.editAccountForm.name,
        account_number: this.editAccountForm.account_number,
      };
      this.RESTchangeAccountName(payload);
      this.initForm();
    },

    // Handle submit event for delete account
    onSubmitDelete(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.deleteAccountModal.hide(); //hide the modal when submitted
      const payload = {
        account_number: this.deleteAccountForm.account_number,
      };
      this.RESTdeleteAccount(payload);
      this.initForm();
    },

    // Handle edit button
    editAccount(account) {
      this.editAccountForm = account;
    },

    // Handle Delete button
    deleteAccount(account) {
      this.deleteAccountForm = account;
    },
  },

  /***************************************************
   * LIFECYClE HOOKS
   ***************************************************/
  created() {
    this.RESTgetAccounts();
  },
};
</script>
