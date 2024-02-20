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
const pagePurchaseOrder = require('../../page_objects/Finance_Operations/page/purchase_order/PurchaseOrder.page.js');

// Global constants
const {
  ALL_SUPPLIERS,
  PURCHASE_ORDER,
} = require('../../constants/global.constant.js');

//Initiate test case ID for csv file
const TCSID = '105595';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
``;
const opts = { fields };

//data model index
const firstIndex = 0;

When(/^105595 User Navigate to All Purchase Order$/, async () => {
  await pageFOHomePage.navigateTo(PURCHASE_ORDER);
});

Then(
  /^Then 105595 User Opens the approriate purchase order with the Approval status is Approved$/,
  async () => {
    await pagePurchaseOrder.OpenPORecordViaFilter(
      dataPre.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
        .PurchaseOrderNumber
    );
  }
);

Then(
  /^Then 105595 User Click on Request Change to the purchase order$/,
  async () => {
    await pagePendingSupplierInvoice.VerifyVATTransactionBeforePosted(
      dataVATScenario.GL_VAT[firstIndex].TCS105616[firstIndex].VATCode
    );
  }
);

Then(
  /^Then 105595 Verify that the purchase order will now be changed to Draft state$/,
  async () => {
    await pagePendingSupplierInvoice.SubmitPendingSupplierInvoice(
      dataVATScenario.GL_VAT[firstIndex].TCS105616[firstIndex].InvoiceNumber
    );
  }
);

Then(/^Then 105595 User Click on Submit the PO again$/, async () => {
  await pageFOHomePage.navigateTo(ALL_SUPPLIERS);
});
Then(
  /^Then 105595 Verify that the purchase order is In Review state$/,
  async () => {
    await pageFilterInvoiceNumber.FilterInvoiceNumber();
  }
);
Then(/^Then 105595 Verify that the the PO status is Approved$/, async () => {
  await pageSupplier.FilterSupplier();

  await pageSupplier.VerifySupplierTransactionforInvoice();

  await pageSupplier.VerifyVoucherOfSupplierInvoice();
});
