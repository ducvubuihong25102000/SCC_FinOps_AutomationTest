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
const TCSID = '91005';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^91013 User enter navigation to Bank accounts$/, async () => {
  await pageFOHomePage.navigateTo(BANK_ACCOUNT);
});
Then(/^91013 Verify user is able to view unreconciled items$/, async () => {
  await pageCB.Verify_User_Able_To_View_UnReconciled_Bank_Transactions(
    dataCB[firstIndex].TCS91013[firstIndex].BankAccount,
    dataCB[firstIndex].TCS91013[firstIndex].VoucherID,
    dataCB[firstIndex].TCS91013[firstIndex].Amount,
    dataCB[firstIndex].TCS91013[firstIndex].AccountName,
    dataCB[firstIndex].TCS91013[firstIndex].PostingType,
    dataCB[firstIndex].TCS91013[firstIndex].LedgerAccount,
    dataCB[firstIndex].TCS91013[firstIndex].Description
  );
});
