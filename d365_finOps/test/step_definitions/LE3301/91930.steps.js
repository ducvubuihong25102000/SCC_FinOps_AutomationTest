const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataFixedAssets = require('../../data/FixedAsset.json');
const dataFDs = require('../../data/FinancialDimensions.json');

//Global constants
const { FIXED_ASSETS } = require('../../constants/global.constant.js');

//Page Objects
const pageFOHompage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageFA = require('../../page_objects/Finance_Operations/page/fixed_asset/FixedAsset.page.js');
const pagePO = require('../../page_objects/Finance_Operations/page/purchase_order/PurchaseOrder.page.js');

//FA data index
const firstIndex = 0;
const TCSID = '91930';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^91930 Navigate to FA page$/, async () => {
  await browser.refresh();
  await pageFOHompage.navigateTo(FIXED_ASSETS);
});

When(
  /^91930 User is openned desired fixed asset and add new financial dimension inforamtion for it$/,
  async () => {
    let myFANum = await pageFA.Verify_New_Fixed_Asset_Should_Be_Created(
      dataFixedAssets.FixedAssets[firstIndex].NewFAForm[firstIndex]
        .FixedAssetGroup,
      dataFixedAssets.FixedAssets[firstIndex].NewFAForm[firstIndex].Number,
      dataFixedAssets.FixedAssets[firstIndex].NewFAForm[firstIndex].Name,
      dataFixedAssets.FixedAssets[firstIndex].NewFAForm[firstIndex].Majortype,
      dataFixedAssets.FixedAssets[firstIndex].NewFAForm[firstIndex]
        .UnitOfMeasurement,
      dataFixedAssets.FixedAssets[firstIndex].NewFAForm[firstIndex].UnitCost,
      dataFixedAssets.FixedAssets[firstIndex].FABookForm[firstIndex].TC91924[
        firstIndex
      ].Description,
      dataFixedAssets.FixedAssets[firstIndex].FABookForm[firstIndex].TC91924[
        firstIndex
      ].ServiceLife,
      dataFDs.Branch,
      dataFDs.BusinessComponent,
      dataFDs.Customer,
      dataFDs.Manufacturer
    );
    await browser.refresh();
    await pageFOHompage.navigateTo(FIXED_ASSETS);
    await pageFA.OpenFARecordViaFilter(myFANum);
  }
);

Then(
  /^91930 Verify that fixed asset should have status Not yet acquired$/,
  async () => {
    await pagePO.Verify_FA_Should_Be_Changed_To_NotYetAcquired_Status();
    // Cast Status = Passed into FixedAssets json
    dataFixedAssets.FixedAssets[firstIndex].FABookForm[firstIndex].TC91924[
      firstIndex
    ].Status = isPassed;
    // Call csv library to read and export FixedAssets json
    const csv = json2csv(
      dataFixedAssets.FixedAssets[firstIndex].FABookForm[firstIndex].TC91924,
      opts
    );
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
