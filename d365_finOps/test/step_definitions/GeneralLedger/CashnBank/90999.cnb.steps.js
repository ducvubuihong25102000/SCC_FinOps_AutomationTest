const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model

const dataCB = require('../../../data/Cash&Bank.json');

//Global constants
const {
  BANK_RECONCILIATION,
  BANK_ACCOUNT,
} = require('../../../constants/global.constant.js');

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

When(/^90999 User navigate to Bank reconciliation$/, async () => {
  await pageFOHomePage.navigateTo(BANK_RECONCILIATION);
});
