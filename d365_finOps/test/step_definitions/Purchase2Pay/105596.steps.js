const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataVATScenario = require('../../data/VATScen.json');
const dataFDs = require('../../data/FinancialDimensions.json');
// const dataP2P = require('../data/P2P.json');
const dataPre = require('../../data/P2P/105613_Precondition.json');

//Page Object
const pageFOHomePage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageLoginPage = require('../../page_objects/Finance_Operations/page/home/D365Login.page');
const pageSupplier = require('../../page_objects/Finance_Operations/page/supplier/Supplier.page.js');
const pagePurchaseOrder = require('../../page_objects/Finance_Operations/page/purchase_order/PurchaseOrder.page.js');

// Global constants
const {
  PENDING_SUPPLIER_INVOICES,
  ALL_SUPPLIERS,
  PURCHASE_ORDER,
} = require('../../constants/global.constant.js');

//Initiate test case ID for csv file
const TCSID = '105596';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

//data model index
const firstIndex = 0;

When(/^105596 User navigate to All Purchase Order$/, async () => {
  await pageFOHomePage.navigateTo(PURCHASE_ORDER);
});

Then(/^105596 User open the existed PO with status as Confirmed$/, async () => {
  await pagePurchaseOrder.OpenPORecordViaFilter(
    dataPre.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
      .PurchaseOrderNumber
  );
});

Then(
  /^105596 User can generate Product receipt for the Purchase Order$/,
  async () => {
    await pagePurchaseOrder.Verify_User_Can_Invoice_PO(
      dataPre[firstIndex].PurchaseOrderNumber,
      dataPre[firstIndex].SupplierInvoiceNumber,
      dataPre[firstIndex].SupplierInvoiceDescription
    );
  }
);
Then(/^105596 Verify the PR status is moved to Received$/, async () => {
  await pageFOHomePage.navigateTo(PURCHASE_ORDER);
  await pagePurchaseOrder.OpenPORecordViaFilter(
    dataPre[firstIndex].PurchaseOrderNumber
  );
  await pagePurchaseOrder.Verify_PO_On_Status_As_Invoiced_Less_than_250();
});
