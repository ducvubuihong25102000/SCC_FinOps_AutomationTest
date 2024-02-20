const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const CasNBankData = require('../../../data/CashAndBank/91003_Precondition.json');
const dataCBBS = require('../../../data/CashAndBank/cnb_BankSatement.json');
const dataCB = require('../../../data/Cash&Bank.json');

//Global constants
const {
  BANK_RECONCILIATION,
  BANK_STATEMENT,
} = require('../../../constants/global.constant.js');

//Page Objects
const pageCnB = require('../../../page_objects/Finance_Operations/page/cash_and_bank/CashAndBank.page.js');

//Library import
import chai from 'chai';
import { navigateTo } from '../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js';

//FA data index
const firstIndex = 0;
const TCSID = '91003';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };
