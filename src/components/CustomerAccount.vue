<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>Accounts</h1>
          <hr />
          <br />
          <!-- Alert Message -->
          <b-alert v-if="showMessage" variant="success" show
            >{{ message }}
          </b-alert>

          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Account Name</th>
                <th scope="col">Account Number</th>
                <th scope="col">Account Balance</th>
                <th scope="col">Account Currency</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="account in accounts" :key="account.account_number">
                <td>{{ account.name }}</td>
                <td>{{ account.account_number }}</td>
                <td>{{ account.balance }}</td>
                <td>{{ account.currency }}</td>
                <td>{{ account.country }}</td>
                <td>
                  <div class="btn-group" role="group">
                    <button
                      type="button"
                      class="btn btn-info btn-sm"
                      v-b-modal.change-password-modal
                      @click="changePassword(account)"
                    >
                      Change Password
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      v-b-modal.transfer-modal
                      @click="
                        transfer(account_number1, account_number2, amount)
                      "
                    >
                      Transfer
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <footer class="text-center">
            Copyright &copy; All Right Reserved.
          </footer>
        </div>
      </div>
      <!-- Start of Modal for changing password-->
      <b-modal
        ref="change-password-modal"
        id="change-password-modal"
        title="Change Password"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmitUpdate" class="w-100">
          <b-form-group
            id="form-change-password-group"
            label="New Password"
            label-for="form-change-password-input"
          >
            <b-form-input
              id="form-change-password-input"
              type="password"
              v-model="changePasswordForm.password"
              placeholder="Enter new password"
              required
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-modal>
      <!-- End of Modal for changing password-->
      <!-- Start of Modal for transferring money -->
      <b-modal
        ref="transfer-modal"
        id="transfer-modal"
        title="Transfer Money"
        hide-backdrop
        hide-footer
      >
      <b-form @submit="onSubmitTransfer" class="w-100">
        <b-form-group
          id="form-account-number1-group"
          label="Account Number 1"
          label-for="form-account-number1-input"
        >
          <b-form-input
            id="form-account-number1-input"
            type="text"
            v-model="transferForm.account_number1"
            placeholder="Enter account number 1"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="form-account-number2-group"
          label="Account Number 2"
          label-for="form-account-number2-input"
        >
          <b-form-input
            id="form-account-number2-input"
            type="text"
            v-model="transferForm.account_number2"
            placeholder="Enter account number 2"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="form-amount-group"
          label="Amount"
          label-for="form-amount-input"
        >
          <b-form-input
            id="form-amount-input"
            type="text"
            v-model="transferForm.amount"
            placeholder="Enter amount"
            required
          ></b-form-input>
        </b-form-group>
      </b-modal>
      <!-- End of Modal for transferring money -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name: "CustomerAccount",
    
}
</script>
