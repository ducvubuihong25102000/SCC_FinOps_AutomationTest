const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataVATScenario = require('../../data/VATScen.json');
const dataFDs = require('../../data/FinancialDimensions.json');
// const dataP2P = require('../data/P2P.json');
const dataPre = require('../../data/P2P/105614_Precondition.json');

//Page Object
const pageFOHomePage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageLoginPage = require('../../page_objects/Finance_Operations/page/home/D365Login.page');
const pageSupplier = require('../../page_objects/Finance_Operations/page/supplier/Supplier.page.js');
const pagePurchaseOrder = require('../../page_objects/Finance_Operations/page/purchase_order/PurchaseOrder.page.js');
const pageFA = require('../../page_objects/Finance_Operations/page/fixed_asset/FixedAsset.page.js');

// Global constants
const {
  PENDING_SUPPLIER_INVOICES,
  ALL_SUPPLIERS,
  PURCHASE_ORDER,
  FIXED_ASSETS,
} = require('../../constants/global.constant.js');

//Initiate test case ID for csv file
const TCSID = '105599';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

//data model index
const firstIndex = 0;

When(/^105599 User navigate to All Purchase Order$/, async () => {
  await pageFOHomePage.navigateTo(PURCHASE_ORDER);
});

Then(/^105599 User open the existed PO with status as Received$/, async () => {
  await pagePurchaseOrder.OpenPORecordViaFilter(
    dataPre[firstIndex].PurchaseOrderNumber
  );
});

Then(
  /^105599 User can generate PO Invoice for the Purchase Order$/,
  async () => {
    await pagePurchaseOrder.Verify_User_Can_Invoice_PO(
      dataPre[firstIndex].PurchaseOrderNumber,
      dataPre[firstIndex].SupplierInvoiceNumber,
      dataPre[firstIndex].SupplierInvoiceDescription
    );
    //** Test User should have itself as the Line Manager -> the workflow will assign back to him after submitted*/
    //the invoice with Unit price < 250 so the PO will invoiced after submitted
  }
);
Then(/^105599 Verify the PO status is moved to Invoiced$/, async () => {
  await pageFOHomePage.navigateTo(PURCHASE_ORDER);
  await pagePurchaseOrder.OpenPORecordViaFilter(
    dataPre[firstIndex].PurchaseOrderNumber
  );
  await pagePurchaseOrder.Verify_PO_On_Status_As_Invoiced_Less_than_250();
});

Then(/^105599 User navigate to All Fixed Assets$/, async () => {
  await pageFOHomePage.navigateTo(FIXED_ASSETS);
  await pageFA.OpenFARecordViaFilter(dataPre[firstIndex].Fixedassetnumber);
});

Then(
  /^105599 Verify fixed asset has been acquired and placed in service date is populated$/,
  async () => {
    await pageFA.Verify_FA_Transaction_Should_Be_Stored_Correctly(
      dataPre[firstIndex].VoucherID,
      dataPre[firstIndex].Amount,
      dataPre[firstIndex].TransactionType,
      dataPre[firstIndex].Description
    );
  }
);
