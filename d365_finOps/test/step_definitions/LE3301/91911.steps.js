const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataFAPrecondition = require('../../data/91842_Precondition.json');
const dataFA = require('../../data/FixedAsset.json');

//Global constants
const {
  FIXED_ASSETS,
  PURCHASE_ORDER,
} = require('../../constants/global.constant.js');

//Page Objects
const pageFOHomePage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pagePurchaseOrder = require('../../page_objects/Finance_Operations/page/purchase_order/PurchaseOrder.page.js');
const pageLogin = require('../../page_objects/Finance_Operations/page/home/D365Login.page');
const pageFixedAsset = require('../../page_objects/Finance_Operations/page/fixed_asset/FixedAsset.page.js');

//FA data index
const firstIndex = 0;
const TCSID = '91911';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

Given(/^91911 User is on Purchase Order page$/, async () => {
  await browser.refresh();
  await pageFOHomePage.navigateTo(PURCHASE_ORDER);
});
When(
  /^91911 User open prepared PO with status Confirmed and it should have Yes, direct AICC other$/,
  async () => {
    await pagePurchaseOrder.OpenPORecordViaFilter(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91842[firstIndex]
        .PurchaseOrderNumber
    );
  }
);
Then(
  /^91911 Verify that user can create a product receipt for that PO and generate a new Fixed asset successfully$/,
  async () => {
    await pagePurchaseOrder.Verify_User_Can_Posting_PO_Product_Receipt(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91842[firstIndex]
        .PurchaseOrderNumber
    );
    let myFANum =
      await pagePurchaseOrder.Verify_FA_Should_Be_Created_After_PO_Is_Received(
        dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91842[
          firstIndex
        ].PurchaseOrderNumber
      );

    // Write data into json file
    let dataArray = dataFA.FixedAssets[firstIndex].NewFAForm;
    let objIndex = dataArray.findIndex(obj => obj.FixedAssetNumbers == '');
    dataArray[objIndex].FixedAssetNumbers = myFANum;
    console.log(dataArray);

    // Save back to file
    let jsonData = JSON.stringify(dataArray);
    let fs = require('fs');
    fs.writeFile(
      '../d365_finOps/test/../data/91842_Precondition.json',
      jsonData,
      err => {
        if (err) throw err;
        console.log('Data has been updated!');
      }
    );

    await pagePurchaseOrder.Verify_FA_Should_Be_Changed_To_NotYetAcquired_Status(
      myFANum
    );
  }
);
When(/^91911 Navigate back to Purchase Order page$/, async () => {
  await pageLogin.openLink(global.baseUrl);
  await pageFOHomePage.navigateTo(PURCHASE_ORDER);
  await pagePurchaseOrder.OpenPORecordViaFilter(
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91842[firstIndex]
      .PurchaseOrderNumber
  );
});
Then(
  /^91911 Verify that user can create a supplier invoice for that PO successfully$/,
  async () => {
    await pagePurchaseOrder.Verify_User_Can_Invoice_PO(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91842[firstIndex]
        .PurchaseOrderNumber,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91842[firstIndex]
        .SupplierInvoiceNumber,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91842[firstIndex]
        .SupplierInvoiceDescription
    );
  }
);
Then(
  /^91911 Navigate back to Fixed Asset page and open newly created FA$/,
  async () => {
    await pageLogin.openLink(global.baseUrl);
    await pageFOHomePage.navigateTo(FIXED_ASSETS);
    await pageFixedAsset.OpenFARecordViaFilter(
      dataFAPrecondition[firstIndex].FixedAssetNumbers
    );
  }
);

Then(
  /^91911 Verify that FA should have status Open and have Acquisition price$/,
  async () => {
    await pagePurchaseOrder.Verify_FA_Should_Be_Changed_To_Open_Status();
  }
);

Then(
  /^91911 Verify that FA should not be linked to a fixed asset$/,
  async () => {
    await pagePurchaseOrder.Verify_FARecord_Should_Not_Linked_To_FA(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91842[firstIndex]
        .PurchaseOrderNumber,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91842[firstIndex]
        .Description
    );

    // Cast Status = Passed into FixedAssets json
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91842[
      firstIndex
    ].Status = isPassed;
    // Call csv library to read and export FixedAssets json
    const csv = json2csv(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91842,
      opts
    );
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
