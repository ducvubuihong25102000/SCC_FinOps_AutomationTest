const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataCB = require('../../../data/Cash&Bank.json');

//Global constants
const {
  BANK_RECONCILIATION,
  BANK_STATEMENT,
  BANK_ACCOUNT,
} = require('../../../constants/global.constant.js');

//Page Objects
const pageCB = require('../../../page_objects/Finance_Operations/page/cash_and_bank/CashAndBank.page.js');
const pageFOHomePage = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

//FA data index
const firstIndex = 0;
const TCSID = '90996';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^90996 User enter navigation to Bank accounts$/, async () => {
  await pageFOHomePage.navigateTo(BANK_ACCOUNT);
});
Then(/^90996 Navigate to Bank Statement page$/, async () => {
  await pageCB.Verify_User_Is_On_Bank_Statement_Page_Via_Account_Reconciliation(
    dataCB[firstIndex].TCS90996[firstIndex].BankAccount
  );
});
Then(/^90996 Navigate to Account Reconciliation page$/, async () => {
  await pageCB.Verify_User_Is_On_Bank_Account_Reconciliation_Page(
    dataCB[firstIndex].TCS90996[firstIndex].BankStatement
  );
});
Then(
  /^90996 Verify user able to marked cleared and the unreconciled amount is counted$/,
  async () => {
    await pageCB.Verify_Data_Populate_Correct_After_User_Is_Marked_Transaction_As_Cleared(
      dataCB[firstIndex].TCS90996[firstIndex].BankStatementDate
    );
  }
);
