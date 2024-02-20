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
const TCSID = '105617';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

//data model index
const firstIndex = 0;

When(/^105617 User navigate to Pending supplier invoice$/, async () => {
  await pageFOHomePage.navigateTo(PENDING_SUPPLIER_INVOICES);
});

Then(
  /^105617 User Create a new Pending supplier invoice with any VAT code$/,
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

Then(
  /^105617 User Open VAT transaction dialog and change Total calculated VAT amount$/,
  async () => {
    await pagePendingSupplierInvoice.VerifyVATTransactionBeforePosted(
      dataVATScenario.GL_VAT[firstIndex].TCS105617[firstIndex].VATCode
    );
  }
);

Then(/^105617 User Post the invoice$/, async () => {
  await pagePendingSupplierInvoice.SubmitPendingSupplierInvoice(
    dataVATScenario.GL_VAT[firstIndex].TCS105617[firstIndex].InvoiceNumber
  );
});

Then(/^105617 User navigate to Supplier$/, async () => {
  await pageFOHomePage.navigateTo(ALL_SUPPLIERS);
});
Then(/^105617 Open desire Supplier$/, async () => {
  await pageFilterInvoiceNumber.FilterInvoiceNumber();
});
Then(
  /^105617 Verify the voucher should be stored correct supplier invoice transaction$/,
  async () => {
    await pageSupplier.FilterSupplier();

    //     await pageSupplier.VerifySupplierTransactionforInvoice();

    await pageSupplier.VerifyVoucherOfSupplierInvoice();

    await pageFOHomePage.navigateTo(FIXED_ASSETS);
    await pageFA.OpenFARecordViaFilter(dataPre[firstIndex].Fixedassetnumber);
    await pageFA.Verify_FA_Transaction_Should_Be_Stored_Correctly(
      dataPre[firstIndex].VoucherID,
      dataPre[firstIndex].Amount,
      dataPre[firstIndex].TransactionType,
      dataPre[firstIndex].Description
    );
  }
);
