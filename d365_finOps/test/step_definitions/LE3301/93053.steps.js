const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataFAJ = require('../../data/FixedAssetJournal.json');
const dataFA = require('../../data/FixedAsset.json');

//Global constants
const {
  FIXED_ASSETS,
  PURCHASE_ORDER,
} = require('../../constants/global.constant.js');

//Page Objects
const pageFOHomePage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pagePO = require('../../page_objects/Finance_Operations/page/purchase_order/PurchaseOrder.page.js');
const pageLogin = require('../../page_objects/Finance_Operations/page/home/D365Login.page');
const pageFA = require('../../page_objects/Finance_Operations/page/fixed_asset/FixedAsset.page.js');

//FA data index
const firstIndex = 0;
const TCSID = '93053';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

Given(/^93053 User is on Purchase Order page$/, async () => {
  await browser.refresh();
  await pageFOHomePage.navigateTo(PURCHASE_ORDER);
});

When(/^93053 User is open a PO with multiple quantity$/, async () => {
  await pagePO.OpenPORecordViaFilter(
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92901[firstIndex]
      .PurchaseOrderNumber
  );
});

Then(/^93053 User print a product receipt for that PO$/, async () => {
  await pagePO.Verify_User_Can_Posting_PO_Product_Receipt(
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92901[firstIndex]
      .PurchaseOrderNumber
  );
});

Then(/^93053 User invoiced the PO$/, async () => {
  await pagePO.Verify_User_Can_Invoice_PO(
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92901[firstIndex]
      .PurchaseOrderNumber,
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92901[firstIndex]
      .SupplierInvoiceNumber,
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92901[firstIndex]
      .SupplierInvoiceDescription
  );
});

Then(
  /^93053 Navigate to Fixed Asset page and Open newly created FA$/,
  async () => {
    await browser.refresh();
    await pageFOHomePage.navigateTo(PURCHASE_ORDER);
    await pagePO.OpenPORecordViaFilter(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92901[firstIndex]
        .PurchaseOrderNumber
    );
    let MyFA = await pagePO.Verify_FA_Should_Be_Created_After_PO_Is_Received();

    await pageLogin.openLink(global.baseUrl);
    await pageFOHomePage.navigateTo(FIXED_ASSETS);
    await pageFA.OpenFARecordViaFilter(MyFA);
  }
);

Then(/^93053 Verify that FA Acquisition price is increased$/, async () => {
  await pageFA.Verify_FA_Acquisition_Price_Should_Be_Increased(
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92901[firstIndex]
      .FixedAssetGroup,
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92901[firstIndex]
      .TransactionType,
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92901[firstIndex]
      .POUnitPrice,
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92901[firstIndex]
      .Quantity
  );

  // Cast Status = Passed into FixedAssets Json
  dataFA.FixedAssets[firstIndex].NewFAForm[firstIndex].Status = isPassed;
  // Call csv library to read and export FixedAssets Json
  const csv = json2csv(dataFAJ.FixedAssetsJournalDetailsForm, opts);
  fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
  console.log('File CSV export success!');
});
