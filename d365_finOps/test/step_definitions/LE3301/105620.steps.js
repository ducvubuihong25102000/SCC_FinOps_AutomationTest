const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataVATScenario = require('../../data/VATScen.json');
const dataFDs = require('../../data/FinancialDimensions.json');

//Page Object
const pageFOHomePage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageLoginPage = require('../../page_objects/Finance_Operations/page/home/D365Login.page');
const pagePendingSupplierInvoice = require('../../page_objects/Finance_Operations/page/pending_supplier_invoice/PendingSupplierInvoice.page.js');
const pageSupplier = require('../../page_objects/Finance_Operations/page/supplier/Supplier.page.js');

// Global constants
const {
  SUPPLIER_PAYMENT_JOURNAL,
  ALL_SUPPLIERS,
} = require('../../constants/global.constant.js');

//Initiate test case ID for csv file
const TCSID = '105620';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

//data model index
const firstIndex = 0;

When(/^When 105620 User navigate to Supplier payment journal$/, async () => {
  await pageFOHomePage.navigateTo(SUPPLIER_PAYMENT_JOURNAL);
});

Then(/^Then 105620 User create new Supplier Payment journal$/, async () => {
  let Number = await pagePendingSupplierInvoice.createNewSupplierInvoice(
    dataVATScenario.GL_VAT[firstIndex].TCS105617[firstIndex].InvoiceAccount,
    dataVATScenario.GL_VAT[firstIndex].TCS105617[firstIndex].InvoiceDescription,
    dataVATScenario.GL_VAT[firstIndex].TCS105617[firstIndex].ItemNumber,
    dataVATScenario.GL_VAT[firstIndex].TCS105617[firstIndex].UnitPrice,
    dataVATScenario.GL_VAT[firstIndex].TCS105617[firstIndex].ItemVATGroup
  );

  let dataArray = dataVATScenario.GL_VAT[firstIndex].TCS105617;
  let objIndex = dataArray.findIndex(obj => obj.InvoiceNumber == '');
  dataArray[objIndex].InvoiceNumber = Number;
  console.log(dataArray);
});

Then(/^Then 105620 Verify the payment voucher$/, async () => {
  await pagePendingSupplierInvoice.SubmitPendingSupplierInvoice(
    dataVATScenario.GL_VAT[firstIndex].TCS105617[firstIndex].InvoiceNumber
  );
});
