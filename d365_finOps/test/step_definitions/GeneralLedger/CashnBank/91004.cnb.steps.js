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
const TCSID = '91004';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };
