const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataCB = require('../../../data/Cash&Bank.json');
const dataCBBS = require('../../../data/CashAndBank/cnb_BankSatement.json');

//Global constants
const {
  BANK_STATEMENT,
  BANK_RECONCILIATION,
} = require('../../../constants/global.constant.js');

//Page Objects
const pageFOHomePage = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageCB = require('../../../page_objects/Finance_Operations/page/cash_and_bank/CashAndBank.page.js');

//FA data index
const firstIndex = 0;
const TCSID = '91001';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^91001 User enter navigation to Bank reconcilation$/, async () => {
  await pageFOHomePage.navigateTo(BANK_RECONCILIATION);
});
Then(
  /^91001 Verify user able to can manual matching bank statement$/,
  async () => {
    await pageCB.Verify_User_Able_To_Manual_Matched_Item(
      dataCB[firstIndex].TCS91001[firstIndex].BankAccount,
      dataCB[firstIndex].TCS91001[firstIndex].Debit,
      dataCB[firstIndex].TCS91001[firstIndex].Description
    );
  }
);
Then(/^91001 User navigate to Bank statement page$/, async () => {
  await pageFOHomePage.navigateTo(BANK_STATEMENT);
});
Then(
  /^91001 Verify the matched Bank Statement status should changed to Matched$/,
  async () => {
    await pageCB.Verify_User_Can_See_Bank_Statement_Status_Change_To_Matched(
      dataCBBS[firstIndex].StatementID,
      dataCB[firstIndex].TCS91001[firstIndex].Description
    );
  }
);
