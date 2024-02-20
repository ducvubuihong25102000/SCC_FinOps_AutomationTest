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
const pagePurchaseOrder = require('../../page_objects/Finance_Operations/page/purchase_order/PurchaseOrder.page.js');
const pageLogin = require('../../page_objects/Finance_Operations/page/home/D365Login.page');
const pageFixedAsset = require('../../page_objects/Finance_Operations/page/fixed_asset/FixedAsset.page.js');

//FA data index
const firstIndex = 0;
const TCSID = '91917';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

Given(/^91917 User is on Purchase Order page$/, async () => {
  await browser.refresh();
  await pageFOHomePage.navigateTo(PURCHASE_ORDER);
});
When(/^91917 User is open a PO with multiple quantity$/, async () => {
  await pagePurchaseOrder.OpenPORecordViaFilter(
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
      .PurchaseOrderNumber
  );
});
Then(
  /^91917 User print a product receipt for 1 quantity in that PO$/,
  async () => {
    await pagePurchaseOrder.Verify_User_Can_Posting_PO_Product_Receipt_With_1_Quantity(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
        .PurchaseOrderNumber,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
        .PRQuantity
    );
  }
);
Then(
  /^91917 Navigate to Fixed Asset page and Open newly created FA$/,
  async () => {
    let MyFA =
      await pagePurchaseOrder.Verify_FA_Should_Be_Created_After_PO_Is_Received();
    await pageLogin.openLink(global.baseUrl);
    await pageFOHomePage.navigateTo(FIXED_ASSETS);
    await pageFixedAsset.OpenFARecordViaFilter(MyFA);
  }
);
Then(
  /^91917 Verify that FA Acquisition price is not increased and status is Not yet acquired$/,
  async () => {
    await pagePurchaseOrder.Verify_FA_Should_Be_Changed_To_NotYetAcquired_Status();
  }
);
Then(/^91917 User invoiced the PO and matching with 1 quantity$/, async () => {
  await pageLogin.openLink(global.baseUrl);
  await pageFOHomePage.navigateTo(PURCHASE_ORDER);
  await pagePurchaseOrder.OpenPORecordViaFilter(
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
      .PurchaseOrderNumber
  );

  await pagePurchaseOrder.Verify_User_Can_Invoice_PO_With_1_Quantity(
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
      .PurchaseOrderNumber,
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
      .SupplierInvoiceNumber,
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
      .SupplierInvoiceDescription
  );
});
Then(/^91917 Navigate to Purchase Order details form$/, async () => {
  await browser.refresh();
  await pageFOHomePage.navigateTo(PURCHASE_ORDER);
  await pagePurchaseOrder.OpenPORecordViaFilter(
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
      .PurchaseOrderNumber
  );
});
Then(
  /^91917 User print a product receipt for last quantity in that PO$/,
  async () => {
    await pagePurchaseOrder.Verify_User_Can_Posting_PO_Product_Receipt(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
        .PurchaseOrderNumber,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
        .PRQuantity
    );
  }
);
Then(
  /^91917 User invoiced the PO and matching with the rest quantity$/,
  async () => {
    await pagePurchaseOrder.Verify_User_Can_Invoice_PO(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
        .PurchaseOrderNumber,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
        .SupplierInvoiceNumber,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
        .SupplierInvoiceDescription
    );
  }
);
Then(
  /^91917 Navigate back to Fixed Asset page and Open newly created FA$/,
  async () => {
    await pageLogin.openLink(global.baseUrl);
    await pageFOHomePage.navigateTo(PURCHASE_ORDER);
    await pagePurchaseOrder.OpenPORecordViaFilter(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
        .PurchaseOrderNumber
    );
    let MyFA =
      await pagePurchaseOrder.Verify_FA_Should_Be_Created_After_PO_Is_Received();
    await pageLogin.openLink(global.baseUrl);
    await pageFOHomePage.navigateTo(FIXED_ASSETS);
    await pageFixedAsset.OpenFARecordViaFilter(MyFA);
  }
);
Then(
  /^91917 Verify that FA Acquisition price is increased and status is Open$/,
  async () => {
    await pageFixedAsset.Verify_FA_Acquisition_Price_Should_Be_Increased(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
        .FixedAssetGroup,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
        .TransactionType,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
        .POUnitPrice,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91848[firstIndex]
        .POQuantity
    );

    // Cast Status = Passed into FixedAssets Json
    dataFA.FixedAssets[firstIndex].NewFAForm[firstIndex].Status = isPassed;
    // Call csv library to read and export FixedAssets Json
    const csv = json2csv(dataFAJ.FixedAssetsJournalDetailsForm, opts);
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
