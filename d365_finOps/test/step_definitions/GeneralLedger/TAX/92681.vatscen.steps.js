const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

// Data model
const dataWithoutVATCode = require('../../../data/WithoutVATCode.json');
const dataFDs = require('../../../data/FinancialDimensions.json');

// Global constants
const {
  PENDING_SUPPLIER_INVOICES,
  ALL_SUPPLIERS,
} = require('../../../constants/global.constant.js');

// Page Objects
const pageFOHomepage = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageLogins = require('../../../page_objects/Finance_Operations/page/home/D365Login.page.js');
const pagePendingSPInvoice = require('../../../page_objects/Finance_Operations/page/pending_supplier_invoice/PendingSupplierInvoice.page.js');
const pageSupplier = require('../../../page_objects/Finance_Operations/page/supplier/Supplier.page.js');

// Initiate test case ID for csv file
const TCSID = '92681';

// CSV Library
const dataVAT = require('../../../data/VATScen.json');
const PendingSupplierInvoicePage = require('../../../page_objects/Finance_Operations/page/pending_supplier_invoice/PendingSupplierInvoice.page.js');
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

// data model index
const firstIndex = 0;
var InvoiceID;

When(/^92681 User navigate to Pending supplier invoice$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(PENDING_SUPPLIER_INVOICES);
});
Then(
  /^92681 User Create a new Pending supplier invoice with EXEMPT-S$/,
  async () => {
    InvoiceID = await pagePendingSPInvoice.createNewSupplierInvoice(
      dataVAT.GL_VAT[firstIndex].TCS92681[firstIndex].InvoiceAccount,
      dataVAT.GL_VAT[firstIndex].TCS92681[firstIndex].InvoiceDescription,
      dataVAT.GL_VAT[firstIndex].TCS92681[firstIndex].ItemNumber,
      dataVAT.GL_VAT[firstIndex].TCS92681[firstIndex].UnitPrice,
      dataVAT.GL_VAT[firstIndex].TCS92681[firstIndex].ItemVATGroup,
      dataVAT.GL_VAT[firstIndex].TCS92681[firstIndex].VATGroup
    );
  }
);
Then(
  /^92681 User Open VAT transaction dialog and change Total calculated VAT amount$/,
  async () => {
    await pagePendingSPInvoice.VerifyVATTransactionBeforePosted(
      dataVAT.GL_VAT[firstIndex].TCS92681[firstIndex].VATCode,
      TCSID
    );
  }
);

Then(/^92681 User Post the invoice$/, async () => {
  browser.refresh();
  await pagePendingSPInvoice.FilterInvoiceNumber(InvoiceID);

  await pagePendingSPInvoice.SubmitPendingSupplierInvoice();
});
Then(/^92681 User navigate to Supplier$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(ALL_SUPPLIERS);
});
Then(/^92681 Open desire Supplier$/, async () => {
  await pageSupplier.FilterSupplier(
    dataVAT.GL_VAT[firstIndex].TCS92681[firstIndex].InvoiceAccount
  );
});

Then(
  /^92681 Verify the voucher should be stored correct supplier invoice transaction$/,
  async () => {
    await pageSupplier.VerifySupplierTransactionforInvoice(InvoiceID);

    await pageSupplier.VerifyVoucherOfSupplierInvoice(
      dataVAT.GL_VAT[firstIndex].TCS92681[firstIndex].VATCode,
      TCSID
    );
  }
);
