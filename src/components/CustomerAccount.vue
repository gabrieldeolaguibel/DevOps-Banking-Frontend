<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>Accounts</h1>
          <hr />
          <br />
          <!-- Alert Message -->
          <b-alert v-if="showMessage" variant="primary" show
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
                      @click="transfer(account)"
                    >
                      Transfer
                    </button>
                    <button
                      type="button"
                      class="btn btn-info btn-sm"
                      v-b-modal.deposit-modal
                      @click="deposit(account)"
                    >
                      Deposit
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        v-b-modal.withdraw-modal
                        @click="withdraw(account)"
                      >
                        Withdraw
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
        ref="changePasswordModal"
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
        ref="transferModal"
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
              v-model="transferForm.amount"
              placeholder="Enter amount"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="outline-info">Submit</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for transferring money -->
      <!-- Start of Modal for deposit-->
      <b-modal
        ref="depositModal"
        id="deposit-modal"
        title="Deposit"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmitDeposit" class="w-100">
          <b-form-group
            id="form-deposit-group"
            label="Deposit"
            label-for="form-deposit-input"
          >
            <b-form-input
              id="form-deposit-input"
              v-model="depositForm.deposit"
              placeholder="Enter deposit"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="outline-info">Submit</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for deposit -->
      <!-- Start of Modal for withdraw-->
      <b-modal
        ref="withdrawModal"
        id="withdraw-modal"
        title="Withdraw"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmitWithdraw" class="w-100">
          <b-form-group
            id="form-withdraw-group"
            label="Withdraw"
            label-for="form-withdraw-input"
          >
            <b-form-input
              id="form-withdraw-input"
              v-model="withdrawForm.withdraw"
              placeholder="Enter withdraw"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="outline-info">Submit</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for withdraw -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CustomerAccount",
  data() {
    return {
      accounts: [],
      changePasswordForm: {
        password: "",
      },
      transferForm: {
        account_number1: "",
        account_number2: "",
        amount: "",
      },
      depositForm: {
        account_number: "",
        deposit: "",
      },
      withdrawForm: {
        account_number: "",
        withdraw: "",
      },
      showMessage: false,
      message: "",
    };
  },
  methods: {
    // Get all accounts based on id
    RESTGetAccounts(id) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/customer/${id}`;
      axios
        .get(path)
        .then((response) => {
          this.accounts = response.data.accounts;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    RESTupdatePassword(payload, id) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${id}/change_password`;
      axios
        .put(path, payload)
        .then((response) => {
          this.message = "Password changed successfully";
          this.showMessage = true;

          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    RESTtransferMoney(payload, id) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${id}/transfer`;
      axios
        .put(path, payload)
        .then((response) => {
          this.message = "Money transferred successfully";
          this.showMessage = true;

          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          this.message = "Unable to transfer money";
          this.showMessage = true;
          console.log(error);
        });
    },
    RESTdeposit(payload, id) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${id}/deposit`;
      axios
        .put(path, payload)
        .then((response) => {
          this.message = "Deposited successfully";
          this.showMessage = true;

          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    RESTwithdraw(payload, id) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${id}/withdraw`;
      axios
        .put(path, payload)
        .then((response) => {
          this.message = "Withdrew successfully";
          this.showMessage = true;

          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          this.message = "Unable to withdraw";
          this.showMessage = true;
          console.log(error);
        });
    },
    initForm() {
      this.transferForm.account_number1 = "";
      this.transferForm.account_number2 = "";
      this.transferForm.amount = "";
      this.changePasswordForm.password = "";
      this.depositForm.account_number = "";
      this.depositForm.deposit = "";
      this.withdrawForm.account_number = "";
      this.withdrawForm.withdraw = "";
    },

    onSubmitUpdate(e) {
      e.preventDefault();
      this.$refs.changePasswordModal.hide();
      const payload = {
        password: this.changePasswordForm.password,
      };
      this.RESTupdatePassword(payload, this.$route.params.id);
      this.initForm();
    },

    onSubmitTransfer(e) {
      e.preventDefault();
      this.$refs.transferModal.hide();
      const payload = {
        account_number1: this.transferForm.account_number1,
        account_number2: this.transferForm.account_number2,
        amount: this.transferForm.amount,
      };
      this.RESTtransferMoney(payload, this.$route.params.id);
      this.initForm();
    },

    onSubmitDeposit(e) {
      e.preventDefault();
      this.$refs.depositModal.hide();
      const payload = {
        account_number: this.depositForm.account_number,
        deposit: this.depositForm.deposit,
      };
      this.RESTdeposit(payload, this.$route.params.id);
      this.initForm();
    },
    onSubmitWithdraw(e) {
      e.preventDefault();
      this.$refs.withdrawModal.hide();
      const payload = {
        account_number: this.withdrawForm.account_number,
        withdraw: this.withdrawForm.withdraw,
      };
      this.RESTwithdraw(payload, this.$route.params.id);
      this.initForm();
    },

    changePassword(account) {
      this.changePasswordForm.password = account.password;
    },

    transfer(account) {
      this.transferForm.account_number1 = account.account_number;
      this.transferForm.account_number2 = "";
      this.transferForm.amount = "";
    },

    deposit(account) {
      this.depositForm.account_number = account.account_number;
      this.depositForm.deposit = "";
    },
    withdraw(account) {
      this.withdrawForm.account_number = account.account_number;
      this.withdrawForm.withdraw = "";
    },
  },

  // Get all accounts based on id
  created() {
    this.RESTGetAccounts(this.$route.params.id);
  },
};
</script>
