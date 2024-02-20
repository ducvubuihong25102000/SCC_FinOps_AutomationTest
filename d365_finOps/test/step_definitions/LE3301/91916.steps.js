const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataFA = require('../../data/FixedAsset.json');

//Global constants
const {
  FIXED_ASSETS,
  PURCHASE_ORDER,
} = require('../../constants/global.constant.js');

//Page Objects
const pageFOHomePage =
  require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js').default;
const pagePurchaseOrder = require('../../page_objects/Finance_Operations/page/purchase_order/PurchaseOrder.page.js');
const pageLogin = require('../../page_objects/Finance_Operations/page/home/D365Login.page');

//FA data index
const firstIndex = 0;
const TCSID = '91916';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

Given(/^91916 User is on Purchase Order page$/, async () => {
  await browser.refresh();
  await pageFOHomePage.navigateTo(PURCHASE_ORDER);
});

When(
  /^91916 User open prepared PO with status Confirmed and it's should below 250$/,
  async () => {
    await pagePurchaseOrder.OpenPORecordViaFilter(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91847[firstIndex]
        .PurchaseOrderNumber
    );
  }
);

Then(
  /^91916 Verify that user can create a product receipt for that PO and generate a new Fixed asset successfully$/,
  async () => {
    await pagePurchaseOrder.Verify_User_Can_Posting_PO_Product_Receipt(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91847[firstIndex]
        .PurchaseOrderNumber,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91847[firstIndex]
        .Quantity
    );
  }
);
When(/^91916 Navigate to Purchase Order page$/, async () => {
  await pageLogin.openLink(global.baseUrl);
  await pageFOHomePage.navigateTo(PURCHASE_ORDER);
  await pagePurchaseOrder.OpenPORecordViaFilter(
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91847[firstIndex]
      .PurchaseOrderNumber
  );
});
Then(
  /^91916 Verify that user can create a supplier invoice for that PO successfully$/,
  async () => {
    await pagePurchaseOrder.Verify_User_Can_Invoice_PO(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91847[firstIndex]
        .PurchaseOrderNumber,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91847[firstIndex]
        .SupplierInvoiceNumber,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91847[firstIndex]
        .SupplierInvoiceDescription
    );
  }
);

When(/^91916 Navigate back to Purchase Order page$/, async () => {
  await pageLogin.openLink(global.baseUrl);
  await pageFOHomePage.navigateTo(PURCHASE_ORDER);
});

Then(
  /^91916 Verify invoice journal should be contained correct values$/,
  async () => {
    await pagePurchaseOrder.Verify_PO_Is_Not_Created_New_FA();

    // Cast Status = Passed into FixedAssets json
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91847[
      firstIndex
    ].Status = isPassed;
    // Call csv library to read and export FixedAssets json
    const csv = json2csv(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91847,
      opts
    );
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
