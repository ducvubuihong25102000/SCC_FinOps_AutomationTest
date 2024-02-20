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
  PENDING_SUPPLIER_INVOICES,
  ALL_SUPPLIERS,
} = require('../../constants/global.constant.js');

//Initiate test case ID for csv file
const TCSID = '105597';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

//data model index
const firstIndex = 0;

When(/^105597 User Navigate to All Purchase Order$/, async () => {
  await pageFOHomePage.navigateTo(PENDING_SUPPLIER_INVOICES);
});

When(
  /^105597 User Opens the approriate purchase order with the status is Confirmed$/,
  async () => {
    let Number = await pagePendingSupplierInvoice.createNewSupplierInvoice(
      dataVATScenario.GL_VAT[firstIndex].TCS105617[firstIndex].InvoiceAccount,
      dataVATScenario.GL_VAT[firstIndex].TCS105617[firstIndex]
        .InvoiceDescription,
      dataVATScenario.GL_VAT[firstIndex].TCS105617[firstIndex].ItemNumber,
      dataVATScenario.GL_VAT[firstIndex].TCS105617[firstIndex].UnitPrice,
      dataVATScenario.GL_VAT[firstIndex].TCS105617[firstIndex].ItemVATGroup
    );

    let dataArray = dataVATScenario.GL_VAT[firstIndex].TCS105617;
    let objIndex = dataArray.findIndex(obj => obj.InvoiceNumber == '');
    dataArray[objIndex].InvoiceNumber = Number;
    console.log(dataArray);
  }
);

Then(/^105597 User Makes receipt for the Purchase Order product$/, async () => {
  await pagePendingSupplierInvoice.VerifyVATTransactionBeforePosted(
    dataVATScenario.GL_VAT[firstIndex].TCS105617[firstIndex].VATCode
  );
});

Then(/^105597 Verify the PO status is Received$/, async () => {
  await pagePendingSupplierInvoice.SubmitPendingSupplierInvoice(
    dataVATScenario.GL_VAT[firstIndex].TCS105617[firstIndex].InvoiceNumber
  );
});

Then(/^105597 User Cancels the purchase order's product receipt$/, async () => {
  await pageFOHomePage.navigateTo(ALL_SUPPLIERS);
});
Then(
  /^105597 Verify the Receive value should be blank and the Amount of the product receipt should be deducted to 0.00$/,
  async () => {
    await pageFilterInvoiceNumber.FilterInvoiceNumber();
  }
);
Then(/^105597 User Amend receipt for the Purchase Order product$/, async () => {
  await pageSupplier.FilterSupplier();

  await pageSupplier.VerifySupplierTransactionforInvoice();

  await pageSupplier.VerifyVoucherOfSupplierInvoice();
});

Then(
  /^105597 User Corrects the purchase order's product receipt$/,
  async () => {}
);

Then(
  /^105597 Verify the Received and Order value should be amended successfully and the Amount of the product receipt should be displayed correctly$/,
  async () => {}
);
