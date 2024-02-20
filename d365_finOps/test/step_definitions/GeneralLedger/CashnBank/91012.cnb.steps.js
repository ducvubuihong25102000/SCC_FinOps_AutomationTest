const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataCB = require('../../../data/Cash&Bank.json');

//Global constants
const {
  CASH_AND_BANK,
  BANK_TRANSACTIONS,
  ENQUIRIES_AND_REPORT,
} = require('../../../constants/global.constant.js');

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

When(/^91012 User enter navigation to Bank transactions report$/, async () => {
  await pageFOHomePage.navigateToModules(
    CASH_AND_BANK,
    ENQUIRIES_AND_REPORT,
    BANK_TRANSACTIONS
  );
});
Then(/^91012 Verify user is able to run Bank tranasction report$/, async () => {
  await pageCB.Verify_User_Able_To_View_Particular_Bank_Transactions(
    dataCB[firstIndex].TCS91012[firstIndex].BankAccount,
    dataCB[firstIndex].TCS91012[firstIndex].VoucherID,
    dataCB[firstIndex].TCS91012[firstIndex].Amount,
    dataCB[firstIndex].TCS91012[firstIndex].AccountName,
    dataCB[firstIndex].TCS91012[firstIndex].PostingType,
    dataCB[firstIndex].TCS91012[firstIndex].LedgerAccount,
    dataCB[firstIndex].TCS91012[firstIndex].Description
  );
});
