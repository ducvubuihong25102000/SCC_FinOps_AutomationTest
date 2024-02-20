const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataCB = require('../../../data/Cash&Bank.json');

//Global constants
const { BANK_ACCOUNT } = require('../../../constants/global.constant.js');

//Page Objects
const pageFOHomePage = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageCB = require('../../../page_objects/Finance_Operations/page/cash_and_bank/CashAndBank.page.js');

//FA data index
const firstIndex = 0;
const TCSID = '90998';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^90998 User navigate to Bank Account$/, async () => {
  await pageFOHomePage.navigateTo(BANK_ACCOUNT);
});
Then(
  /^90998 Verify user able to create manual bank reconcilation$/,
  async () => {
    await pageCB.Verify_User_Able_Create_Manual_Bank_Statement(
      dataCB[firstIndex].TCS90998[firstIndex].BankAccount,
      dataCB[firstIndex].TCS90998[firstIndex].BankStatementDate,
      dataCB[firstIndex].TCS90998[firstIndex].BankStatement,
      dataCB[firstIndex].TCS90998[firstIndex].EndingBalance
    );
  }
);

Then(/^90998 Verify the transaction is marked as Unreconciled$/, async () => {
  await pageCB.Verify_The_Transaction_Marked_As_Unreconcilied();
});

Then(
  /^90998 Verify that the Bank statement column has been reconciled$/,
  async () => {
    await pageCB.Verify_Bank_Statement_Reconciled();
  }
);
