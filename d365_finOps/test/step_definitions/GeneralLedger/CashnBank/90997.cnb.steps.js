const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const credential = require('../../data/Logins.json');
const dataFAPrecondition = require('../../data/91846_Precondition.json');
const dataFDs = require('../../data/FinancialDimensions.json');
const dataCB = require('../../data/Cash&Bank.json');

//Global constants
const { BANK_ACCOUNT } = require('../../../constants/global.constant.js');

//Page Objects
const pageFOHomePage = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageCB = require('../../../page_objects/Finance_Operations/page/cash_and_bank/CashAndBank.page.js');

//FA data index
const firstIndex = 0;
const TCSID = '90997';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^90997 User navigate to Bank Account$/, async () => {
  await pageFOHomePage.navigateTo(BANK_ACCOUNT);
});
Then(/^90997 Navigate to Bank Statement page$/, async () => {
  await pageCB.Verify_User_Is_On_Bank_Statement_Page_Via_Account_Reconciliation(
    dataCB[firstIndex].TCS90997[firstIndex].BankAccount
  );
});
Then(/^90997 Navigate to Account Reconciliation page$/, async () => {
  await pageCB.Verify_User_Is_On_Bank_Account_Reconciliation_Page(
    dataCB[firstIndex].TCS90997[firstIndex].BankStatement
  );
});
Then(/^90997 Verify user able to create manual bank transaction$/, async () => {
  await pageCB.Verify_User_Able_Create_New_Account_Reconciliation_Transaction(
    dataCB[firstIndex].TCS90997[firstIndex].BankTransactionType,
    dataCB[firstIndex].TCS90997[firstIndex].Amount,
    dataFDs.Branch,
    dataFDs.BusinessComponent,
    dataFDs.Customer,
    dataFDs.Manufacturer
  );
});
When(/^90997 Navigate back to Bank Statement page$/, async () => {
  await pageCB.Verify_User_Is_On_Bank_Statement_Page_Via_Account_Reconciliation(
    dataCB[firstIndex].TCS90997[firstIndex].BankAccount
  );
});
Then(/^90997 Navigate back to Account Reconciliation page$/, async () => {
  await pageCB.Verify_User_Is_On_Bank_Account_Reconciliation_Page(
    dataCB[firstIndex].TCS90997[firstIndex].BankStatement
  );
});
Then(/^90997 Verify bank transaction should be stored correctly$/, async () => {
  await pageCB.Verify_User_Can_See_Correct_Info_Of_Newly_Created_Account_Reconciliation_Transaction(
    dataCB[firstIndex].TCS90997[firstIndex].BankTransactionType,
    dataCB[firstIndex].TCS90997[firstIndex].Description,
    dataCB[firstIndex].TCS90997[firstIndex].Amount,
    dataFDs.Branch,
    dataFDs.BusinessComponent,
    dataFDs.Customer,
    dataFDs.Manufacturer
  );
});
