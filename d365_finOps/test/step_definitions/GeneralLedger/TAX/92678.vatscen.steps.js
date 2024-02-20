const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

// Data model
const dataWithoutVATCode = require('../../../data/WithoutVATCode.json');
const dataFDs = require('../../../data/FinancialDimensions.json');
const dataVATScenario = require('../../../data/VATScen.json');

// Global constants
const {
  PENDING_SUPPLIER_INVOICES: PENDING_SUPPLIER_INVOICS,
  ALL_SUPPLIERS,
} = require('../../../constants/global.constant.js');

// Page Objects
const pageFOHomepage = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageLogins = require('../../../page_objects/Finance_Operations/page/home/D365Login.page.js');
const pageSupplier = require('../../../page_objects/Finance_Operations/page/supplier/Supplier.page.js');
const pagePendingSLInvoice = require('../../../page_objects/Finance_Operations/page/pending_supplier_invoice/PendingSupplierInvoice.page.js');

// Initiate test case ID for csv file
const TCSID = '92678';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

// data model index
const firstIndex = 0;

When(/^92678 User navigate to Pending supplier invoice$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(PENDING_SUPPLIER_INVOICS);
});
Then(
  /^92678 User Create a new Pending supplier invoice with GBP tax code$/,
  async () => {
    let invoiceNumber = await pagePendingSLInvoice.createNewSupplierInvoice(
      dataVATScenario.GL_VAT[firstIndex].TCS92678[firstIndex].InvoiceAccount,
      dataVATScenario.GL_VAT[firstIndex].TCS92678[firstIndex]
        .InvoiceDescription,
      dataVATScenario.GL_VAT[firstIndex].TCS92678[firstIndex].ItemNumber,
      dataVATScenario.GL_VAT[firstIndex].TCS92678[firstIndex].UnitPrice,
      dataVATScenario.GL_VAT[firstIndex].TCS92678[firstIndex].ItemVATGroup
    );

    //Get the Invoice number to verify in the Supplier Transaction
    let dataArray = dataVATScenario.GL_VAT[firstIndex].TCS92678;
    let objIndex = dataArray.findIndex(obj => obj.InvoiceNumber == '');
    dataArray[objIndex].InvoiceNumber = invoiceNumber;
  }
);

Then(
  /^92678 User Open VAT transaction dialog and change Total calculated VAT amount$/,
  async () => {
    await pagePendingSLInvoice.VerifyVATTransactionBeforePosted(
      dataVATScenario.GL_VAT[firstIndex].TCS92678[firstIndex].VATCode
    );
  }
);
Then(/^92678 User Post the invoice$/, async () => {
  await browser.refresh();
  await pagePendingSLInvoice.FilterInvoiceNumber(
    dataVATScenario.GL_VAT[firstIndex].TCS92678[firstIndex].InvoiceNumber
  );
  await pagePendingSLInvoice.SubmitPendingSupplierInvoice();
});
Then(/^92678 User navigate to Supplier$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(ALL_SUPPLIERS);
});

Then(/^92678 Open desire Supplier$/, async () => {
  await pageSupplier.FilterSupplier(
    dataVATScenario.GL_VAT[firstIndex].TCS92678[firstIndex].InvoiceAccount
  );
});
Then(
  /^92678 Verify the voucher should be stored correct supplier invoice transaction$/,
  async () => {
    await pageSupplier.VerifySupplierTransactionforInvoice(
      dataVATScenario.GL_VAT[firstIndex].TCS92678[firstIndex].InvoiceNumber
    );
    await pageSupplier.VerifyVoucherOfSupplierInvoice(
      dataVATScenario.GL_VAT[firstIndex].TCS92678[firstIndex].VATCode
    );
  }
);
