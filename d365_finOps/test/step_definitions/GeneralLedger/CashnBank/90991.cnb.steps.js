const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataCB = require('../../../data/Cash&Bank.json');

//Global constants
const {
  CASH_FLOW_FORECAST_SETUP,
} = require('../../../constants/global.constant.js');

//Page Objects
const pageFOHomePage = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageCB = require('../../../page_objects/Finance_Operations/page/cash_and_bank/CashAndBank.page.js');

//FA data index
const firstIndex = 0;
const TCSID = '90991';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^90991 User enter navigation to Cash flow forecast setup$/, async () => {
  await pageFOHomePage.navigateTo(CASH_FLOW_FORECAST_SETUP);
});
Then(/^90991 Verify General Ledger$/, async () => {
  await pageCB.Verify_General_Ledger_Tab(
    dataCB[firstIndex].TCS90991[firstIndex].MainAccount,
    dataCB[firstIndex].TCS90991[firstIndex].AccountName,
    dataCB[firstIndex].TCS90991[firstIndex].BankAccount
  );
});

Then(/^90991 Verify Purchase Ledger$/, async () => {
  await pageCB.Verify_Purchase_Ledger_Tab(
    dataCB[firstIndex].TCS90991[firstIndex]
      .TimeBetweenDeliveryDateAndInvoiceDate,
    dataCB[firstIndex].TCS90991[firstIndex].TermsOfPayment,
    dataCB[firstIndex].TCS90991[firstIndex]
      .TimeBetweenInvoiceDueDateAndPaymentDate,
    dataCB[firstIndex].TCS90991[firstIndex].MainAccount,
    dataCB[firstIndex].TCS90991[firstIndex].PercentageOfAmountToAllocateToCFF
  );
});

Then(/^90991 Verify Sale Ledger tab$/, async () => {
  await pageCB.Verify_Sale_Ledger_Tab(
    dataCB[firstIndex].TCS90991[firstIndex]
      .TimeBetweenDeliveryDateAndInvoiceDate,
    dataCB[firstIndex].TCS90991[firstIndex].TermsOfPayment,
    dataCB[firstIndex].TCS90991[firstIndex]
      .TimeBetweenInvoiceDueDateAndPaymentDate,
    dataCB[firstIndex].TCS90991[firstIndex].MainAccount,
    dataCB[firstIndex].TCS90991[firstIndex].PercentageOfAmountToAllocateToCFF
  );
});
